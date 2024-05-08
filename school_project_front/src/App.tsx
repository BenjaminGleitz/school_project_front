import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/user/Profile';
import UpdateUser from './pages/user/UpdateUser';
import { UserProvider } from './contexts/UserContext';
import MyEventsCreated from "./pages/user/EventsCreated.tsx";
import MyEventsParticipation from "./pages/user/EventsPartcipation.tsx";
import CreateEvent from "./pages/event/CreateEvent.tsx";

const App: React.FC = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <div id="top"></div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/update" element={<UpdateUser />} />
                    <Route path={"/my-events"} element={<MyEventsCreated />} />
                    <Route path={"/my-participation"} element={<MyEventsParticipation />} />
                    <Route path={"/create-event"} element={<CreateEvent />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
