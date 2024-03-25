import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";

//컨테이너 초록색 이미지 
const TextBtnContainer=styled.div`
    /*위치*/
    width:16%;
    height: 34vw;
    margin-right:0.5%;
    margin-top:0.25%;
    /*png*/
    background-image: url("/resourcesPng/storagePage/storage_menubar_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /*item 정렬*/
    display: flex;
    flex-direction:column;
    position: relative;
`;
//현재 페이지 위치 알려주는 진한 초록색 사각형 바
const TextBarImg=styled.div`
    /*위치*/
    width: 90%;
    height: 5vw;
    position: absolute;
    align-self: center;
    margin-top: ${(props)=>props.margin_top||'133%'};
    z-index: 1;
    /*png*/
    background-image: url("/resourcesPng/storagePage/menu_item_count_rectangle.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
//OO님의 기록
const TextNickName=styled.div`
    width:100%;
    height: 10%;
    padding-top:7%;
    font-size:1.7vw;
    text-align: center;
    font-family: gangwonedusaeeum;
    color: #FFFFFF;
`;
const MenuContainer=styled.div`
    width:90%;
    height:78%;
    margin-left:12%;
    margin-top:3%;
    display: flex;
    justify-content:space-around;
    flex-direction:column;
    align-items: flex-start;
    z-index: 2;
`;
//큰 흰색 글씨 버튼
const MenuBtn=styled.button`
    /*스타일*/
    border: none;
    font-size: 1.8vw;
    font-family: gangwonedusaeeum;
    text-align: left;
    margin-top: 2%;
    /*크기*/
    height: 2.5vw;
    width: 85%;
    /*색상*/
    color: #FFFFFF;
    background-color:transparent;
`;
//작은 연초록 글씨 컨테이너
const MenuItemCountContainer=styled.button`
    width: 83%;
    height: 3vw;
    border: none;
    display: flex;
    flex-direction:column;
    /*색상*/
    color: #FFFFFF;
    background-color:transparent;
`;
//작은 연초록 글씨
const MenuItemCount=styled.text`
    //background-color: green;
    font-size: 1vw;
    font-family: gangwonedusaeeum;
    color: #A6E6BC;
`;

//보관함 왼쪽 초록색 버튼
const StoargeTextBtnContainer=({margin_top})=>{
    const navigate = useNavigate();
    const goToStorageNovel=()=>{
        navigate("/storageNovel");
    }
    const goToStorageExchangeDiary=()=>{
        navigate("/storageExchangeDiary");
    }
    const goToStorageRecommend=()=>{
        navigate("/storageRecommend");
    }
    const goToStorageDiary=()=>{
        navigate("/storageDiary");
    }
    const goToStorageDrawBook=()=>{
        navigate("/storageDrawBook");
    }
    return (
        <TextBtnContainer>
            <TextBarImg margin_top={margin_top}></TextBarImg>
            <TextNickName>정윤님의 기록</TextNickName>
            <MenuContainer>
                <MenuBtn onClick={goToStorageDiary}>일기</MenuBtn>
                <MenuItemCountContainer onClick={goToStorageDiary}>
                    <MenuItemCount>작성한 일기: </MenuItemCount>
                </MenuItemCountContainer>
                <MenuBtn onClick={goToStorageExchangeDiary}>교환일기</MenuBtn>
                <MenuItemCountContainer onClick={goToStorageExchangeDiary}>
                    <MenuItemCount>작성한 교환 일기: </MenuItemCount>
                    <MenuItemCount>미작성 교환 일기: </MenuItemCount>
                </MenuItemCountContainer>
                <MenuBtn onClick={goToStorageRecommend}>오늘의 추천</MenuBtn>
                <MenuItemCountContainer onClick={goToStorageRecommend}>
                    <MenuItemCount>오늘의 추천: </MenuItemCount>
                </MenuItemCountContainer>
                <MenuBtn onClick={goToStorageNovel}>소설</MenuBtn>
                <MenuItemCountContainer onClick={goToStorageNovel}>
                    <MenuItemCount>작성 중 소설: </MenuItemCount>
                    <MenuItemCount>작성 완료 소설: </MenuItemCount>
                </MenuItemCountContainer>
                <MenuBtn onClick={goToStorageDrawBook}>그림책</MenuBtn>
                <MenuItemCountContainer onClick={goToStorageDrawBook}>
                    <MenuItemCount>작성 중 그림책: </MenuItemCount>
                    <MenuItemCount>작성 완료 그림책: </MenuItemCount>
                </MenuItemCountContainer>
            </MenuContainer>
        </TextBtnContainer>
        

    );
};
export {StoargeTextBtnContainer};

