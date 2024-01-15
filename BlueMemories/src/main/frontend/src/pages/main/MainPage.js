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
    //justify-content: center;
   // align-items: center;
    //background: pink;
`;
const Box = styled.div`
width:400px;
height:600px;
background: white;
box-shadow: 11px 14px 30px -17px rgba(125,125,125,1);
`;

const Header = styled.header`
    width:100%;
    min-height:100vh;
    background: black;
    `;

const LoginBtn = styled.button`
    /*스타일*/
    border: none;
    border-radius: 9px;
    /*크기*/
    height: 2.5rem;
    width: 6rem;
    font-size: 1rem;
    /*색상*/
    background: #B3B3B350; 
`
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
            <Helmet>
            <title>Main</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>

            <Wrapper>
                <Header>
                    <LoginBtn onClick={goRegister}>Register</LoginBtn>
                    <LoginBtn onClick={goLogin}>Login</LoginBtn>
                </Header>
               
            </Wrapper>
            <Wrapper>
                
            </Wrapper>

            <Routes>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
        
    );

};

export default MainForm;
