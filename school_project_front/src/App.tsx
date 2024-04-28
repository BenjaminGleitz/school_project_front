import React from 'react'
import './App.css'
import Navbar from "./components/navbar/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div id="top"></div>
                <Navbar/>
                <section className='content' id='content'>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </section>
            </BrowserRouter>
        </>
    );
};

export default App;
