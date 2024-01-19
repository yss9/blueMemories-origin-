import React from 'react';
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {Body,LeftContainer,RightContainer,MessageContainer,WelcomeMassage,
    LoginContainer,LoginText,InputText,InputBox,ButtonBox,LoginButton,JoinButton} from "../../components/LoginJoin"

const LoginForm = () => {
    return (
        <div>
            <Helmet>
            <title>Login</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            <Body>
                <LeftContainer></LeftContainer>
                <RightContainer>
                    <MessageContainer>
                        <LoginText>Login</LoginText>
                        <WelcomeMassage>Welcome to Blue Memories</WelcomeMassage>
                    </MessageContainer>
                    <LoginContainer>
                        <InputText>Email</InputText>
                        <InputBox type="text" placeholder="Enter your email"></InputBox>
                        <InputText>Password</InputText>
                        <InputBox type="text" placeholder="Enter your password"></InputBox>
                    </LoginContainer>
                    <ButtonBox>
                        <LoginButton>Login</LoginButton>
                        <JoinButton>Join</JoinButton>
                    </ButtonBox>

                </RightContainer>
            </Body>

        </div>
    );
};

export default LoginForm;
