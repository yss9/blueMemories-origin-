// src/App.js
import React from 'react';
import {BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './App.css';
import MainPage from "./pages/main/MainPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import IntroducePage from "./pages/introduce/IntroducePage";
import {Helmet} from "react-helmet";

function App() {

    return (
        <BrowserRouter>
            <Helmet 
                titleTemplate='%s - BlueMemories'
                defaultTitle='BlueMemories'
            >
                <meta name="description" content="A BlueMemories application"/>
            </Helmet>
            <Routes>
                {/* main */}
                <Route path="/" element={<MainPage />} />
                {/* <SignIn /> */}
                <Route path="/register" element={<RegisterPage />} />
                {/* <LogIn /> */}
                <Route path="/login" element={<LoginPage />} />
                {/* <Introduce /> */}
                <Route path="/introduce" element={<IntroducePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

