// Profile.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Profile: React.FC = () => {
    const currentUser = useUser(); // Utilisez le hook useUser pour récupérer l'utilisateur actuel

    return (
        <div>
            <h1>My Profile</h1>
            {currentUser ? (
                <>
                    <p>ID: {currentUser.id}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>First Name: {currentUser.firstname}</p>
                    <p>Last Name: {currentUser.lastname}</p>
                    <p>Created At: {currentUser.createdAt}</p>
                    <p>Updated At: {currentUser.updatedAt}</p>
                    <p>Roles: {currentUser.roles.join(', ')}</p>
                    <p>Events Created: {currentUser.eventsCreated.length}</p>
                    <p>Events: {currentUser.events.length}</p>
                    {currentUser.favoriteCity ? (
                        <p>Favorite City: {currentUser.favoriteCity.name}</p>
                    ) : (
                        <p>No favorite city</p>
                    )}
                    <Link to="/profile/update">Update Profile</Link> {/* Ajoutez le lien vers UpdateUser */}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;