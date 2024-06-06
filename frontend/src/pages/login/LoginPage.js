import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {Body,LeftContainer,RightContainer,MessageContainer,WelcomeMassage,
    LoginContainer,LoginText,InputText,InputBox,ButtonBox,LoginButton,JoinButton} from "../../components/LoginJoin"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext";
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    //로그인 상태 설정
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },//@RequestBody MemberController (json->java객체로 변환)
                body: JSON.stringify({ memberId: email, password: password })
            });
            const data = await response.json();
            if (response.ok) {
                login(data);
                console.log('Login successful:', data.id);
                await deleteNovels(data.id); //novel status:TEMPORARY 삭제
                navigate('/'); // 로그인 성공 후 리디렉션
            } else {
                console.error('Failed to login:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //novel status:TEMPORARY 삭제 __충돌방지위해서 여기에서 실행
    const deleteNovels = async (userID) => {
        try {
            await axios.delete(`http://localhost:8080/api/novels/deleteTemporary?memberId=${userID}`);
            console.log('Temporary novels deleted successfully');
        } catch (error) {
            console.error('Error deleting temporary novels:', error);
        }
    };



    const goRegister = () => {
        navigate('/register');
    }
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
                        <InputBox
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                        <InputText>Password</InputText>
                        <InputBox
                            type="text"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    </LoginContainer>
                    <ButtonBox>
                        <LoginButton onClick={handleLogin}>Login</LoginButton>
                        <JoinButton onClick={goRegister}>Join</JoinButton>
                    </ButtonBox>

                </RightContainer>
            </Body>

        </div>
    );
};

export default LoginForm;
