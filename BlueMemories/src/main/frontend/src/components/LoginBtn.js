import styled from "styled-components";
import React from 'react';
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';

/*로그인, 회원가입 버튼 컨테이너*/
const HeaderBtnContainer=styled.div`
display: flex;
flex-direction:row-reverse;
height:50px;
gap:15px;
margin-top: 3%;
margin-right: 5%;
`

const LoginBtn = styled.button`
    /*스타일*/
    border: none;
    border-radius: 9px;
    font-size: 24px;
    font-family: inkfree;
    /*크기*/
    height: 2.5rem;
    width: 6rem;
    /*색상*/
    background: #B3B3B350;
`
 //font-size:${(props)=>props.fontSize};
const Logo = styled.h1`
    font-size: 4rem;
    margin-top: 5%;
    margin-left: 12%;
    font-family: inkfree;
`

const LogoText = ({text})=>{
    return <div>
        {text.split("\n").map((txt)=>(
            <>
            {txt}<br></br></>
        ))}
    </div>;
}



const LoginBtnExport=()=>{
    const [text,setText] = useState('');
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
            <HeaderBtnContainer>
                <LoginBtn onClick={goRegister}>Join</LoginBtn>
                <LoginBtn onClick={goLogin}>Login</LoginBtn>
            </HeaderBtnContainer>

            <Routes>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
        
    );
};

export {LoginBtnExport,Logo,LogoText};

