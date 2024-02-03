import React from 'react';
import IntroducePage from "../introduce/IntroducePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';
import {LogoBtn,LogoText,NotLoggedInBtn,LoggedInBtn} from "../../components/NavigationBar";


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

const MenuBarContainer=styled.div`
    height:260px;
    width:160px;
    /*item 정렬*/
    display: flex;
    flex-direction:column;
    justify-content:space-around;
    padding-top: 10px;
    padding-bottom: 10px;
    /*위치*/
    position:fixed;
    top:40%;
    right:2%;
    /*스타일*/
    background-color: #EDEDED;
    border-radius: 10%;
    box-shadow: 10px 10px 12px -6px rgba(123,157,181,1);
`;
const MenuBox=styled(MenuBarContainer)` 
    
`;
const MenuBtn=styled.button`
     /*스타일*/
    border: none;
    border-radius: 9px;
    font-size: 28px;
    font-family: gangwonedusaeeum;
    /*크기*/
    height: 2.5rem;
    width: auto;
    /*색상*/
    background: none;

`;

///////////////main2번째 페이지////////////////////
const Body=styled.div`
    width:100%;
    min-height:100vh;
    background-image: url("/resourcesPng/mainPage/main_background2.png"),
    linear-gradient(rgba(80, 213, 247, 1), rgba(28, 120, 144, 1));
    background-size: cover;
 `;

///////////////////////////////////////////////////
const MainForm = () => {
    const navigate = useNavigate();
    const goIntroduce = () => {
        navigate('/introduce');
    }

    return (
        <div>
            <Helmet>
            <title>Main</title>
            <meta name="description" content="BlueMemories Main Page"/>
            </Helmet>
            <WrapperContainer>
                <MenuBox>
                    <MenuBtn onClick={goIntroduce}>서비스 소개</MenuBtn>
                    <MenuBtn>책 쓰기</MenuBtn>
                    <MenuBtn>일기 쓰기</MenuBtn>
                    <MenuBtn>FAQ</MenuBtn>
                    <MenuBtn>고객센터</MenuBtn>
                </MenuBox>
                <Wrapper>
                    <Header>
                        <NotLoggedInBtn top_margin='4%' right_margin='5%'></NotLoggedInBtn> 
                        <LogoBtn fontSize='5vw' left_margin='10%' top_margin='3%'><LogoText text={"Blue\nMemories"}></LogoText></LogoBtn>
                    </Header>
                </Wrapper>
                
                <Wrapper>
                    <Body></Body>
                </Wrapper>
                
            </WrapperContainer>
            

            <Routes>
                <Route path="/introduce" element={<IntroducePage />}></Route>
            </Routes>
        </div>
        
    );

};

export default MainForm;
