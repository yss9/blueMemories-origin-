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
    return (
        <MenuBox>
            <MenuBtn onClick={goToIntroduce}>서비스 소개</MenuBtn>
            <MenuBtn>책 쓰기</MenuBtn>
            <MenuBtn onClick={goToStorageNovel}>일기 쓰기</MenuBtn>
            <MenuBtn>FAQ</MenuBtn>
            <MenuBtn>고객센터</MenuBtn>
        </MenuBox>
    );
};
                
export {MenuBar};