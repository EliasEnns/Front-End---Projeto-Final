import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Profile = ({ user }) => {
    const auth = useAuth(); 
    const navigate = useNavigate();
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedTelephone, setEditedTelephone] = useState('');

    useEffect(() => {
        // Initialize state with current user data
        setEditedUsername(auth.user?.username || '');
        setEditedName(auth.user?.name || '');
        setEditedEmail(auth.user?.email || '');
        setEditedTelephone(auth.user?.telephone || '');
        setEditedPassword('');
        setConfirmPassword('');
    }, [auth.user]);

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
        setEditedName(auth.user?.name || '');
        setEditedEmail(auth.user?.email || '');
        setEditedTelephone(auth.user?.telephone || '');
        setEditedPassword('');
        setConfirmPassword('');
    };

    const handleSaveProfile = async () => {
        try {
            // Fetch all users to check username availability
            const response = await fetch("http://localhost:3000/users");
            const users = await response.json();
    
            // Check if username already exists (excluding current user's own username)
            const isUsernameTaken = users.some(
                (u) => u.username === editedUsername && u.id !== auth.user?.id
            );
    
            if (isUsernameTaken) {
                throw new Error("Username already in use");
            }
    
            // Proceed to update the user profile
            const updateResponse = await fetch(`http://localhost:3000/users/${auth.user?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: editedUsername,
                    name: editedName,
                    email: editedEmail,
                    telephone: editedTelephone
                }),
            });
    
            if (!updateResponse.ok) {
                throw new Error("Failed to save profile");
            }
    
            // Update local state and UI upon successful update
            auth.setUser((prevUser) => ({
                ...prevUser,
                username: editedUsername,
                name: editedName,
                email: editedEmail,
                telephone: editedTelephone
            }));
            setEditingUsername(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSavePassword = async () => {
        if (editedPassword === confirmPassword) {
            if (editedPassword.length > 0) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${auth.user?.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ password: editedPassword }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to edit password");
                    }

                    setEditingPassword(false);
                } catch (err) {
                    console.error(err.message);
                }
            } else {
                alert('Password cannot be empty');
            }
        } else {
            alert('Passwords do not match');
        }
    };

    const handleDelete = async () => {
        try {
            if (!auth.user) {
                throw new Error("User not found");
            }
            const response = await fetch(`http://localhost:3000/users/${auth.user?.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            auth.setUser(null);
            auth.setToken("");
            localStorage.removeItem("site");
            navigate("/login");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <h1>Profile Management</h1>
            <h1>Welcome, {auth.user?.username}</h1>
            {editingUsername ? (
                <>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="telephone">Telephone:</label>
                        <input
                            type="tel"
                            id="telephone"
                            value={editedTelephone}
                            onChange={(e) => setEditedTelephone(e.target.value)}
                            placeholder="Telephone"
                        />
                    </div>
                    <div>
                        <button onClick={handleSaveProfile}>Save Profile</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <div>
                            <p>Username: {auth.user?.username}</p>
                        </div>
                        <div>
                            <p>Name: {auth.user?.name}</p>
                        </div>
                        <div>
                            <p>Email: {auth.user?.email}</p>
                        </div>
                        <div>
                            <p>Telephone: {auth.user?.telephone}</p>
                        </div>
                        <div>
                            <button onClick={handleEditUsername}>Edit Profile</button>
                        </div>
                    </div>
                </>
            )}
            {editingPassword ? (
                <>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="New Password"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleSavePassword}>Save Password</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <p>Password: ********</p>
                        <button onClick={handleEditPassword}>Edit Password</button>
                    </div>
                </>
            )}
            <button style={{ backgroundColor: 'red' }} onClick={handleDelete}>Delete User</button>
        </>
    );
};

export default Profile;
