import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";

const MenuBarContainer=styled.div`
    //height:260px;
    //width:160px;
    height:35%;
    width:12%;
    /*item 정렬*/
    display: flex;
    flex-direction:column;
    justify-content:space-around;
    ///padding-top: 1%;
    padding-bottom: 1%;
    /*위치*/
    position:fixed;
    top:40%;
    right:3%;
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
    font-size: 2vw;
    font-family: gangwonedusaeeum;
    /*크기*/
    height: 2.5rem;
    width: auto;
    /*색상*/
    background: none;
`;   

const MenuBar = () => {
    const navigate = useNavigate();
    const goToIntroduce = () => {
        navigate('/introduce');
    }
    const goToStorageNovel = () => {
        navigate('/storageNovel');
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
        <MenuBox>
            <MenuBtn onClick={goToIntroduce}>서비스 소개</MenuBtn>
            <MenuBtn onClick={goToStorageDiary}>일기</MenuBtn>
            <MenuBtn onClick={goToStorageExchangeDiary}>교환일기</MenuBtn>
            <MenuBtn onClick={goToStorageNovel}>소설</MenuBtn>
            <MenuBtn onClick={goToStorageDrawBook}>그림책</MenuBtn>
        </MenuBox>
    );
};
                
export {MenuBar};