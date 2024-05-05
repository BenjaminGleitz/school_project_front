import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Message from "../../components/messages/Message.tsx";

const Profile: React.FC = () => {
    const currentUser = useUser();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const successParam = queryParams.get('success');

        // Check if success message is stored in localStorage
        const storedSuccess = localStorage.getItem('updateSuccess');
        if (successParam === 'true' || storedSuccess === 'true') {
            setShowSuccessMessage(true);
            // Clear success message from localStorage
            localStorage.removeItem('updateSuccess');
        }
    }, [location.search]);

    return (
        <div>
            <h1>My Profile</h1>
            {showSuccessMessage && (
                <Message type="success" text="Profile updated successfully" />
            )}
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
