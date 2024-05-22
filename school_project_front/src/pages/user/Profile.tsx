import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useUser} from '../../contexts/UserContext';
import Message from "../../components/messages/Message.tsx";
import Loader from "../../components/loader/Loader.tsx";
import '../css/profile.css';

const Profile: React.FC = () => {
    const currentUser = useUser();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const location = useLocation();

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return new Date(dateString).toLocaleString("en-EN", options);
    };

    console.log(currentUser);

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
        <div className={"profile-detail"}>
            <h1>My Profile</h1>
            {showSuccessMessage && (
                <Message type="success" text="Profile updated successfully"/>
            )}
            {currentUser ? (
                <>
                    <div className="profile-container">
                        <div className="profile-items">
                            <p>Email: </p>
                            <p>First Name: </p>
                            <p>Last Name: </p>
                            <p>Nationality</p>
                            <p>Birthdate</p>
                            <p>Gender</p>
                            <p>Events Created: </p>
                            <p>Events: </p>
                            <p>Favorite City: </p>

                        </div>
                        <div className="profile-items-values">
                            <p>{currentUser.email}</p>
                            <p>{currentUser.firstname}</p>
                            <p>{currentUser.lastname}</p>
                            <p>{currentUser.nationality}</p>
                            <p>{formatDate(currentUser.birthdate)}</p>
                            <p>{currentUser.gender}</p>
                            <p>{currentUser.eventsCreated.length}</p>
                            <p>{currentUser.events.length}</p>
                            {currentUser.favoriteCity ? (
                                <p>{currentUser.favoriteCity.name}</p>
                            ) : (
                                <p>No favorite city</p>
                            )}
                        </div>
                    </div>
                    <button onClick={() => window.location.href = "/profile/update"}>Update Profile</button>
                </>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default Profile;
