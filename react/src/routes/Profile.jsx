import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';

const Profile = () => {
    const auth = useAuth();
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedPassword, setEditedPassword] = useState('');

    const handleEditUsername = () => {
        setEditingUsername(true);
    };

    const handleEditPassword = () => {
        setEditingPassword(true);
    };

    const handleCancel = () => {
        setEditingUsername(false);
        setEditingPassword(false);
        setEditedUsername(auth.user?.username || '');
        setEditedPassword(auth.user?.password || '');
    };

    const handleSaveUsername = () => {
        auth.editUsernameAction(editedUsername);
        setEditingUsername(false);
    };

    const handleSavePassword = () => {
        auth.editPasswordAction(editedPassword);
        setEditingPassword(false);
    };

    const handleDelete = () => {
        // Call the deleteUserAction function from authprovider
        auth.deleteUserAction();
    };

    return (
        <>
            <h1>Profile</h1>
            <h1>Welcome! {auth.user?.username}</h1>
            {editingUsername ? (
                <>
                    <input
                        type="text"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                    />
                    <button onClick={handleSaveUsername}>Save Username</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <p>Username: {auth.user?.username}</p>
                    <button onClick={handleEditUsername}>Edit Username</button>
                </>
            )}
            {editingPassword ? (
                <>
                    <input
                        type="password"
                        value={editedPassword}
                        onChange={(e) => setEditedPassword(e.target.value)}
                    />
                    <button onClick={handleSavePassword}>Save Password</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <p>Password: {auth.user?.password}</p>
                    <button onClick={handleEditPassword}>Edit Password</button>
                </>
            )}
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default Profile;
