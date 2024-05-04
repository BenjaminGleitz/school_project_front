// App.tsx
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

const App: React.FC = () => {
    return (
        <UserProvider> {/* Enveloppez votre application avec UserProvider */}
            <BrowserRouter>
                <div id="top"></div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/update" element={<UpdateUser />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
