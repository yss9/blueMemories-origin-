import React from 'react';
import RegisterPage from "../register/RegisterPage";
import LoginPage from "../login/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';

 //font-size:${(props)=>props.fontSize};
const WrapperContainer= styled.div`
    display: flex;
    flex-direction:column;
    height: auto;
`;

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
`;

const Header = styled.div`
    width:100%;
    min-height:100vh;
    background-image: url("/resourcesPng/mainPage/main_background1.png");
    background-size: cover;
    `;

const HeaderBtnContainer=styled.div`
    display: flex;
    flex-direction:row-reverse;
    height:50px;
    gap:15px;
    margin-top: 40px;
    margin-right: 70px;
`;

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
`;

const Logo = styled.h1`
    font-size: 4rem;
    margin-top: 50px;
    margin-left: 220px;
    font-family: inkfree;
`;

const LogoText = ({text})=>{
    return <div>
        {text.split("\n").map((txt)=>(
            <>
            {txt}<br></br></>
        ))}
    </div>;
};
//position:sticky;
//top:320px;
const MenuBarContainer=styled.div`
    height:260px;
    width:160px;
    /*item 정렬*/
    display: flex;
    flex-direction:column;
    justify-content:space-around;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const MenuBox=styled(MenuBarContainer)`
    /*위치*/
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(600px,-70px);
    /*스타일*/
    background-color: #EDEDED;
    border-radius: 10%;
    box-shadow: 10px 10px 12px -6px rgba(123,157,181,1);
     
`;
const MenuBtn=styled.button`
     /*스타일*/
    border: none;
    border-radius: 9px;
    font-size: 28px;
    font-family: "gangwonedusaeeum";
    /*크기*/
    height: 2.5rem;
    width: auto;
    /*색상*/
    background: none;

`;

const MainForm = () => {
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
    //const [text, setText] = useState('');
     //<p>{text}</p>
    
    return (
        <div>
            <Helmet>
            <title>Main</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            

            <WrapperContainer>
                <MenuBox>
                    <MenuBtn>서비스 소개</MenuBtn>
                    <MenuBtn>책 쓰기</MenuBtn>
                    <MenuBtn>일기 쓰기</MenuBtn>
                    <MenuBtn>FAQ</MenuBtn>
                    <MenuBtn>고객센터</MenuBtn>
                </MenuBox>
                <Wrapper>
                    <Header>
                        <HeaderBtnContainer>
                            <LoginBtn onClick={goRegister}>Join</LoginBtn>
                            <LoginBtn onClick={goLogin}>Login</LoginBtn>
                        </HeaderBtnContainer>
                        <Logo><LogoText text={"Blue\nMemories"}></LogoText></Logo>
                    </Header>
                </Wrapper>
                <Wrapper>
                </Wrapper>
            </WrapperContainer>
            

            <Routes>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
        
    );

};

export default MainForm;
