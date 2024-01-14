// src/App.js
import React from 'react';
import {BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './App.css';
import MainPage from "./pages/main/MainPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
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
                {/* 웹 서비스 소개 페이지 */}
                <Route path="/" element={<MainPage />} />
                {/* <SignIn /> */}
                <Route path="/register" element={<RegisterPage />} />
                {/* <LogIn /> */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

