import React from 'react';
import {Helmet} from "react-helmet";
import styled from "styled-components";


const Body = styled.body`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-image: url("/resourcesPng/loginPage/background.png");
    background-size: cover;
`;

const LeftContainer = styled.div`
    width: 760px;
    height: 700px;
    background-size: cover;
    background-image: url("/resourcesPng/loginPage/left_img.png");
`;

const RightContainer = styled.div`
    width: 600px;
    height: 700px;
    background-size: cover;
    background-image: url("/resourcesPng/loginPage/right_img.png");
`;

const MessageContainer=styled.div`
    margin-left: 15%;
`;

const LoginContainer=styled.div`
    margin-top: 10%;
    margin-left: 15%;
`;

const font=styled.p`
   font-family: "Inkfree";
`;

const WelcomeMassage=styled(font)`
    margin-top:2%;
    font-size: 23px;
    color: #524284;
`;

const LoginText = styled(font)`
    margin-top: 23%;
    font-size: 50px;
    color: #120240;
`;

const InputText=styled(font)`
    margin-left: 1%;
    margin-top: 6%;
    font-size: 21px;
    color: #000000;
`;

const InputBox=styled.input`
    width: 80%;
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const ButtonBox = styled.div`
    margin-top: 50px;
    margin-left: 15%;
`;

const LoginButton=styled.button`
    font-family: "Ink Free";
    width: 25%;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 24px;
    background-color: #5B81E3; /* 버튼 배경색 */
    color: white; /* 텍스트 색상 */
    border: none;
    border-radius: 50px;
`;

const JoinButton=styled.button`
    font-family: "Ink Free";
    margin-left: 45%;
    font-size: 24px;
    background-color: white; /* 버튼 배경색 */
    color: black; /* 텍스트 색상 */
    border: none;
    border-radius: 0; /* 테두리 반경을 없앰 */
    box-shadow: none; /* 그림자 효과를 없앰 */
    cursor: pointer;
`;

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
