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
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }
     const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    // This should be called from your RegisterPage.jsx
    const saveUserToDB = (name, email, university, address) => {
        const userData = { name, email, university, address };
        return fetch('http://localhost:5000/users', { // Make sure URL and port are correct
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    }

    // This will be called from your new ProfilePage.jsx
    const updateUserInDB = (email, updatedData) => {
        return fetch(`http://localhost:5000/users/${email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
    }
    
    
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








