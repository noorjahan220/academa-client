import { createContext, useEffect, useState } from "react";
import {getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const createUser = (email, password) =>{
   setLoading(true);
    return createUserWithEmailAndPassword(auth,email, password);
    
}
 const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };
useEffect(()=>{
  const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser);
        setLoading(false);
    });
    return () => {
        unsubscribe();
    };
}, []);

const signIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword( auth,email, password);
}

const logOut = () =>{
    setLoading(true);
    return signOut(auth);
}
  const updateUserProfile = (name, photo) => {
        // This returns a promise
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        }).then(() => {
            // After the Firebase server is successfully updated,
            // manually update our React state to match.
            setUser(prevUser => ({
                ...prevUser,
                displayName: name,
                photoURL: photo,
            }));
            console.log("Local React state updated with new profile name.");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
     const saveUserToDB = (name, email, university, address, phone) => {
        const userData = {
            name,
            email,
            university: university || '',
            address: address || '',
            phone: phone || '' 
        };
        return fetch('https://academa-server.vercel.app/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    }

    // This will be called from your new ProfilePage.jsx
    const updateUserInDB = (email, updatedData) => {
        return fetch(`https://academa-server.vercel.app/users/${email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
    }
     const signInWithGoogle = () => {
        setLoading(true);
        // This function from Firebase handles the pop-up logic
        return signInWithPopup(auth, googleProvider);
    };
    
    
const authInfo = {
user,
loading,
createUser,
signIn,
logOut,
updateUserProfile,
signInWithGoogle,
resetPassword,
 saveUserToDB,
        updateUserInDB
};
    return (
        <AuthContext.Provider value={authInfo} >
    {children}
   </AuthContext.Provider>
    );
};

export default AuthProvider;








