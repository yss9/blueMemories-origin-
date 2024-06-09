import styled from "styled-components";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ImageContainer=styled.div`
    width:100%;
    height:5vw;
    /*item 설정*/
    position:relative;
    z-index: ${(props)=>props.index|| '6'};
`;

const TopImage = styled.div`
    width: 100%;
    height: 3vw;
    background-color: #5A9479;
    /*순서*/
    position: absolute;
    z-index: 2;
`;
//메뉴 버튼 컨테이너
const MenuBarContainer=styled.div`
    width:90%;
    height:auto;
    /*item 설정*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    top:7%;
    left:5vw;
    /*순서*/
    position:absolute;
    z-index:3;
`;

// 메뉴 그룹 (왼쪽 혹은 오른쪽 메뉴)
const MenuGroup = styled.div`
    width: fit-content;
    display: flex;
    gap: 3rem; // 메뉴 아이템 사이의 간격
`;

// 메뉴 아이템
const MenuItem = styled.button`
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
      color: #9CC3B1;
    }
    /*스타일*/
    border: none;
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    user-select: none;
    /*크기*/
    height: auto;
    width: auto;
    /*색상*/
    background: none;
    color: #FFFFFF;
    
`;
//로그인 했을 때 네비게이션 바
const WriteMenuBar=({visible, onInComplete, onComplete})=>{
    const navigate = useNavigate();
    const goToStorageNovel=()=>{
        navigate("/storageNovel");
    }

    const handleSaveOut=()=>{
        onInComplete();
        goToStorageNovel();
    }

    return (
        <ImageContainer>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem onClick={onComplete}>책 완성</MenuItem>
                    <MenuItem onClick={visible}>책 표지</MenuItem>
                    <MenuItem onClick={onInComplete}>임시저장</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={handleSaveOut}>저장하고 나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};

const ViewMenuBar=()=>{
    const navigate=useNavigate();
    const handleViewOut=()=>{
        navigate('/storageNovel');
    }
    return (
        <ImageContainer>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem></MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={handleViewOut}>나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};

//로그인 했을 때 네비게이션 바
const BookWriteMenuBar=({visible, onInComplete, onComplete})=>{
    const navigate = useNavigate();
    const goToStorageBook=()=>{
        navigate("/storageDrawBook");
    }

    const handleSaveOut=()=>{
        onInComplete();
        goToStorageBook();
    }

    return (
        <ImageContainer>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem onClick={onComplete}>책 완성</MenuItem>
                    <MenuItem onClick={visible}>책 표지</MenuItem>
                    <MenuItem onClick={onInComplete}>임시저장</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={handleSaveOut}>저장하고 나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};


const BookViewMenuBar=()=>{
    const navigate=useNavigate();
    const handleViewOut=()=>{
        navigate('/storageDrawBook');
    }
    return (
        <ImageContainer>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem></MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={handleViewOut}>나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};
export {WriteMenuBar,ViewMenuBar,BookWriteMenuBar,BookViewMenuBar};

