import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";


//로고 버튼
const LogoBtn = styled.button`
    font-size: ${(props)=>props.fontSize|| '2vw'};
    font-family: inkfree;
    border:none;
    background: none;
    text-align: left; 
    margin-left: ${(props)=>props.left_margin||'3%'};
    margin-top: ${(props)=>props.top_margin||'none'};
    user-select: none;
`;
//로고 텍스트
const LogoText = ({text})=>{
    return <div>
        {text.split("\n").map((txt)=>(
            <>
            {txt}<br></br></>
        ))}
    </div>;
}
//-----------------------------------------------------------------
//네비게이션
const NavContainer=styled.div`
    width:50%;
     /*item 정렬*/
    display: flex;
    justify-content:space-around;
`;
const NavBtn=styled.button`
    /*스타일*/
    border: none;
    font-size: 2.3vw;
    font-family: gangwonedusaeeum;
    /*크기*/
    height: auto;
    width: auto;
    /*색상*/
    background: none;
`;
//---------------------------------------------------------------------
//로그인 및 회원가입 버튼(storage, profile)
const LoginBtn = styled.button`
    /*스타일*/
    border: none;
    border-radius: 9px;
    font-size: 1.3vw;
    font-family: inkfree;
    /*크기*/
    height: 2.5vw;
    width: 6vw;
    /*색상*/
    background: #B3B3B350;
    cursor:pointer;
    user-select: none;
`;
const LoginBtnContainer=styled.div`
    display: flex;
    flex-direction:row-reverse;
    height:auto;
    gap:15px;
    margin-right: ${(props)=>props.right_margin||'3%'};
    margin-top: ${(props)=>props.top_margin||'none'};
    align-items: center;
`;
//---------------------------------------------------------------------
//전체 컨테이너
const HeaderContainer=styled.div`
    height:5vw;
    width: auto;
    display: flex;
    flex-direction:row;
    justify-content:space-around;
    margin-top:4%;
    margin-left:2.5%;
    margin-right:2.5%;
`;
//---------------------------------------------------------------------
//로그인-회원가입 버튼 컨테이너
const NotLoggedInBtn=({top_margin, right_margin})=>{
    const navigate = useNavigate();
    const goToLogin=()=>{
        navigate("/login");
    }
    const goToRegister=()=>{
        navigate("/register");
    }
    return(
        <LoginBtnContainer top_margin={top_margin} right_margin={right_margin}>
            <LoginBtn onClick={goToRegister}>Register</LoginBtn>
            <LoginBtn onClick={goToLogin}>Login</LoginBtn>
        </LoginBtnContainer>
    );

};
//보관함-회원정보 버튼 컨테이너
const LoggedInBtn=({top_margin, right_margin})=>{
    const navigate = useNavigate();
    const goToStorageDiary=()=>{
        navigate("/storageDiary");
    }
    return(
        <LoginBtnContainer top_margin={top_margin} right_margin={right_margin}>
            <LoginBtn>Profile</LoginBtn>
            <LoginBtn onClick={goToStorageDiary}>Storage</LoginBtn>
        </LoginBtnContainer>
    );

};
//-------------------------------------------------------------------------
//로그인 했을 때 네비게이션 바
const LoggedInNavigationBar=()=>{
    const navigate = useNavigate();
    const goToMain=()=>{
        navigate("/");
    }
    const goToIntroduce=()=>{
        navigate("/introduce");
    }
    const goToStorageNovel=()=>{
        navigate("/storageNovel");
    }
    const goToStorageExchangeDiary=()=>{
        navigate("/storageExchangeDiary");
    }
    const goToStorageDiary=()=>{
        navigate("/storageDiary");
    }
    const goToStorageDrawBook=()=>{
        navigate("/storageDrawBook");
    }
    return (
        <HeaderContainer>
            <LogoBtn onClick={goToMain}><LogoText text={"Blue\nMemories"}></LogoText></LogoBtn>
            <NavContainer>
                <NavBtn onClick={goToIntroduce}>서비스 소개</NavBtn>
                <NavBtn onClick={goToStorageDiary}>일기</NavBtn>
                <NavBtn onClick={goToStorageExchangeDiary}>교환일기</NavBtn>
                <NavBtn onClick={goToStorageNovel}>소설</NavBtn>
                <NavBtn onClick={goToStorageDrawBook}>그림책</NavBtn>
            </NavContainer>
            <LoggedInBtn></LoggedInBtn>
        </HeaderContainer>
        
    );
};
//로그인 안했을 때 네비게이션 바
const NotLoggedInNavigationBar=()=>{
    const navigate = useNavigate();
    const goToMain=()=>{
        navigate("/");
    }
    const goToIntroduce=()=>{
        navigate("/introduce");
    }
    const goToLogin=()=>{
        navigate("/login");
    }
    return (
        <HeaderContainer>
            <LogoBtn onClick={goToMain}><LogoText text={"Blue\nMemories"}></LogoText></LogoBtn>
            <NavContainer>
                <NavBtn onClick={goToIntroduce}>서비스 소개</NavBtn>
                <NavBtn onClick={goToLogin}>일기 쓰기</NavBtn>
                <NavBtn onClick={goToLogin}>교환일기 쓰기</NavBtn>
                <NavBtn onClick={goToLogin}>책 쓰기</NavBtn>
                <NavBtn onClick={goToLogin}>그림책 쓰기</NavBtn>
            </NavContainer>
            <NotLoggedInBtn></NotLoggedInBtn>
        </HeaderContainer>
    );
};
export {LogoBtn,LogoText,NotLoggedInBtn,LoggedInBtn,LoggedInNavigationBar,NotLoggedInNavigationBar};

