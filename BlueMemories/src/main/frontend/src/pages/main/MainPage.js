import React from 'react';
import RegisterPage from "../register/RegisterPage";
import LoginPage from "../login/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
`;
const Box = styled.div`
width:400px;
height:600px;
background: white;
box-shadow: 11px 14px 30px -17px rgba(125,125,125,1);
`;
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
           
            <Helmet>
            <title>Main</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            <Wrapper>
                <Box>

                </Box>
            <p>{text}</p>
            <button type="button" onClick={goRegister}>Register</button>
            <button type="button" onClick={goLogin}>Login</button>
            </Wrapper>
            <Routes>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
    );

};

export default MainForm;
