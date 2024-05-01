import React from 'react'
import './App.css'
import Navbar from "./components/navbar/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div id="top"></div>
                <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
