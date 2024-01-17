import styled from "styled-components";
import React from 'react';
import MainPage from "../pages/main/MainPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import {LoginBtnExport,LogoText} from "./LoginBtn";

const HeaderContainer=styled.div`
    height:10%;
    width: auto;
    display: flex;
    flex-direction:row;
    justify-content:space-around;
    margin-top:4%;
    margin-left:2.5%;
    margin-right:2.5%;
`;

const NavContainer=styled.div`
    width:50%;
     /*item 정렬*/
    display: flex;
    justify-content:space-around;
`;

const NavBtn=styled.button`
    /*스타일*/
    border: none;
    font-size: 2.5rem;
    font-family: gangwonedusaeeum;
    /*크기*/
    height: 2.5rem;
    width: auto;
    /*색상*/
    background: none;
`;

const LogoBtn = styled.button`
    font-size: 2rem;
    font-family: inkfree;
    border:none;
    background: none;
    text-align: left; 
    
`

const NavExport=()=>{
    const [text,setText] = useState('');
    const navigate = useNavigate();
    const goMain = () => {
        setText('Main 페이지 입니다.')
        navigate('/');
    }
    const goIntroduce = () => {
        setText('Introduce 페이지 입니다.')
        navigate('/introduce');
    }
    return (
        <div>
            <HeaderContainer>
                        <LogoBtn onClick={goMain}><LogoText text={"Blue\nMemories"}></LogoText></LogoBtn>
                        <NavContainer>
                            <NavBtn>서비스 소개</NavBtn>
                            <NavBtn>책 쓰기</NavBtn>
                            <NavBtn>일기 쓰기</NavBtn>
                            <NavBtn>FAQ</NavBtn>
                            <NavBtn>고객센터</NavBtn>
                        </NavContainer>
                        <LoginBtnExport></LoginBtnExport>
                    </HeaderContainer>

            <Routes>
                <Route path="../" element={<MainPage />}></Route>
                
            </Routes>
        </div>
        
    );
};

export {NavExport};