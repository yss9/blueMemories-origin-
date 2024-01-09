import React from 'react';
import RegisterPage from "../register/RegisterPage";
import LoginPage from "../login/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
const MainForm = () => {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const goRegister = () => {
        setText('Register 페이지 입니다.')
        navigate('/register');
    }
    const goLogin = () => {
        setText('Login 페이지 입니다.')
        navigate('/login');
    }
    return (
        <div>
            <p>{text}</p>
            <button type="button" onClick={goRegister}>Register</button>
            <button type="button" onClick={goLogin}>Login</button>
            <Routes>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
    );

};

export default MainForm;
