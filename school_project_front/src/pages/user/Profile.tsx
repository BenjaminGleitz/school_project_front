import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useUser} from '../../contexts/UserContext';
import Message from "../../components/messages/Message.tsx";
import '../css/profile.css';
import Loader from "../../components/loader/Loader.tsx";
import { FaPen } from "react-icons/fa";

const Profile: React.FC = () => {
    const currentUser = useUser();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const location = useLocation();

    console.log(currentUser);

    const goToMyEvents = () => {
        window.location.href = "/my-events";
    }

    const goToMyParticipations = () => {
        window.location.href = "/my-participation";
    }

    const calculateAge = (birthdate: string): number => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

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

    const isProfilePage = location.pathname === "/profile";

    return (
        <div className={`profile-detail ${isProfilePage ? 'profile-page' : ''}`}>
            {showSuccessMessage && (
                <Message type="success" text="Profile updated successfully"/>
            )}
            {currentUser ? (
                <>
                    <div className="profile-container">
                        <div className="profile-items">
                            <div className="profile-items-header">
                                <div className="profile-items-values_image">
                                    <img className={"profileImage"}
                                         src={currentUser.image ? `http://127.0.0.1:8000/images/users/${currentUser.image}` : "http://127.0.0.1:8000/images/users/default482835492874646298346429847642984.jpg"}
                                         alt="User profile"/>
                                </div>
                                <button className={"updateUserEvent"} onClick={() => window.location.href = "/profile/update"}><FaPen /></button>
                            </div>
                            <div className="profile-items-values_header">
                                <h3>{currentUser.firstname} {currentUser.lastname}, </h3>
                                <p>{calculateAge(currentUser.birthdate)} years old</p>
                            </div>
                            {currentUser.description && (
                                <div className="profile-items-values_description">
                                    <p>{currentUser.description}</p>
                                </div>
                            )}

                            {/* cette div est cliquable (goToMyParticipations) et redirige vers la page de mes participations */}
                            <div className="profile-items-values_events" onClick={goToMyEvents}
                                 style={{cursor: 'pointer'}}>
                                <h3>My activities</h3>
                                {currentUser.eventsCreated.length === 0 ? (
                                    <p>No activity created</p>
                                ) : (
                                    <p>{currentUser.eventsCreated.length} {currentUser.eventsCreated.length > 1 ? 'activities created' : 'activity created'}</p>
                                )}
                            </div>

                            {/* cette div est cliquable (goToMyEvents) et redirige vers la page de mes événements */}
                            <div className="profile-items-values_events" onClick={goToMyParticipations}
                                 style={{cursor: 'pointer'}}>
                                <h3>My participations</h3>
                                {currentUser.eventsCreated.length === 0 ? (
                                    <p>No participation</p>
                                ) : (
                                    <p>{currentUser.eventsCreated.length} {currentUser.eventsCreated.length > 1 ? 'participations' : 'participation'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default Profile;
