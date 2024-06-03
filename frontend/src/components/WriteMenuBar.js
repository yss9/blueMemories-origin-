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
const WriteMenuBar=({onClick, onSave, novelId})=>{
    const navigate = useNavigate();
    const goToStorageNovel=()=>{
        navigate("/storageNovel");
    }

    const handleSaveOut=()=>{
        onSave();
        goToStorageNovel();
    }

    /**
     * [책 완성 버튼]
     * novel db에서 cover_image, title 가져옴
     * if(둘다 수정 x 면 ){
     *     알림창 "제목과 표지를 생성해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else if(cover_image만 수정 x 면){
     *     알림창 "표지를 생성해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else if(title만 수정 x 면){
     *     알림창 "제목을 입력해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else (전부 수정되었다면){
     *     "완성한 책은 수정할 수 없습니다. 책 작성을 완료하시겠습니까?"
     * }
     */

    const handleComplete = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/api/novels/complete/${novelId}`);
            const novel = response.data;
            novel.forEach(novel => {
                if (novel.title === 'untitled' && (novel.coverImage === null)) {
                    alert('책제목과 책표지를 생성해 주세요.');
                    onClick();
                } else if (!novel.coverImage || novel.coverImage === '') {
                    alert('책표지를 생성해 주세요.');
                    onClick();
                } else if (novel.title === 'untitled'){
                    alert('책제목을 입력해 주세요.');
                    onClick();
                }
                else {
                    const userConfirmed = window.confirm("완성한 책은 수정할 수 없습니다. 책 작성을 완료하시겠습니까?");
                    if (userConfirmed) { //"확인 버튼 클릭한 경우"
                        //db에 저장 -> novel status 변경
                    }
                }
            });

        } catch (error) {
            console.error('Error fetching novel:', error);
        }
    };

    return (
        <ImageContainer>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem onClick={handleComplete}>책 완성</MenuItem>
                    <MenuItem onClick={onClick}>책 표지</MenuItem>
                    <MenuItem onClick={onSave}>임시저장</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={handleSaveOut}>저장하고 나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};
export {WriteMenuBar};

