import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/user/Profile';
import UpdateUser from './pages/user/UpdateUser';
import { UserProvider } from './contexts/UserContext';
import MyEventsCreated from './pages/user/EventsCreated';
import CreateEvent from './pages/event/CreateEvent';
import UpdateEvent from './pages/event/UpdateEvent';
import ChangeLocationUser from './pages/user/ChangeLocationUser';
import Home from './pages/Home';
import MyEventsParticipation from "./pages/user/EventsPartcipation.tsx";

const App: React.FC = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <div id="top"></div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/update" element={<UpdateUser />} />
                    <Route path="/change-location" element={<ChangeLocationUser />} />
                    <Route path="/my-events" element={<MyEventsCreated />} />
                    <Route path="/my-participation" element={<MyEventsParticipation />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/update-event/:eventId" element={<UpdateEvent />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
