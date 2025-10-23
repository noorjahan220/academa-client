// src/Pages/ProfilePage/ProfilePage.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';


const ProfilePage = () => {
    const { user, updateUserProfile, updateUserInDB } = useContext(AuthContext);

    // CHANGE 1: Add 'phone' to the initial state
    const [profileData, setProfileData] = useState({
        name: user?.displayName || '',
        university: '',
        address: '',
        phone: '' // <-- Added phone field
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            fetch(`https://academa-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        setProfileData(prev => ({ ...prev, name: user.displayName }));
                    } else {
                        // CHANGE 2: Set the phone number from the fetched data
                        setProfileData({
                            name: data.name || user.displayName,
                            university: data.university || '',
                            address: data.address || '',
                            phone: data.phone || '' // <-- Set phone from DB
                        });
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching profile:", err);
                    setError("Could not load profile data.");
                    setIsLoading(false);
                });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setError('');
        setSuccess('');

        // No change needed here, as it sends the entire 'profileData' object
        const firebaseUpdate = updateUserProfile(profileData.name, user.photoURL);
        const dbUpdate = updateUserInDB(user.email, profileData);

        Promise.all([firebaseUpdate, dbUpdate])
            .then(() => {
                setSuccess("Profile updated successfully!");
                setIsEditing(false);
            })
            .catch(err => {
                console.error("Error saving profile:", err);
                setError("Failed to update profile. Please try again.");
            });
    };

    if (isLoading) {
        return <div className="text-center my-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex justify-center mb-4">
                    <img
                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${profileData.name}&background=random&size=128`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                    />
                </div>
                
                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Email (cannot be changed)</label>
                            <input type="email" value={user.email} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        {/* CHANGE 3: Add an input field for the phone number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">University</label>
                            <input type="text" name="university" value={profileData.university} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" name="address" value={profileData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleSave} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Save</button>
                            <button onClick={() => setIsEditing(false)} className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p><strong>Name:</strong> {profileData.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {/* CHANGE 4: Display the phone number */}
                        <p><strong>Phone:</strong> {profileData.phone || 'Not set'}</p>
                        <p><strong>University:</strong> {profileData.university || 'Not set'}</p>
                        <p><strong>Address:</strong> {profileData.address || 'Not set'}</p>
                        <div className="pt-4">
                           <button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Edit Profile</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;