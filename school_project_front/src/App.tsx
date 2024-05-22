import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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
import Auth from "./pages/Auth.tsx";

const App: React.FC = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Content />
            </BrowserRouter>
        </UserProvider>
    );
};

const Content: React.FC = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/', '/login', '/register'];

    return (
        <>
            <div id="top"></div>
            {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/" element={<Auth />} />
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
        </>
    );
};

export default App;
