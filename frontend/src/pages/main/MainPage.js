import React from 'react';
import IntroducePage from "../introduce/IntroducePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';
import {LogoBtn, LogoText, NotLoggedInBtn, LoggedInBtn, LoggedInNavigationBar} from "../../components/NavigationBar";
import {MenuBar}from "./components/MenuBar";
import { useAuth } from '../Context/AuthContext';

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
    const { user } = useAuth();
    return (
        <div>

            <Helmet>
            <title>Main</title>
            <meta name="description" content="BlueMemories Main Page"/>
            </Helmet>
            <WrapperContainer>
                <MenuBar></MenuBar>
                <Wrapper>
                    <Header>
                        {user ? <LoggedInBtn top_margin='4%' right_margin='5%'/> : <NotLoggedInBtn top_margin='4%' right_margin='5%'/>}

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
