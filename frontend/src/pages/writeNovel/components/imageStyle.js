import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {Context} from "../../Context/Context";

//style prompt//
const ImageStyleContainer= styled.div`
    width:99%;
    height: 6.5vw;
    left:0;
    /*도형 모양*/
    background-color: #3E6B57;
    border:1px solid #356650;
    border-radius: 6px;
    /*item 설정*/
    display: flex;
    flex-direction: column;
`;
const StyleTitle =styled.div`
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    text-decoration:underline;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
    user-select: none;
    /*크기*/
    height: auto;
    width: auto;
    /*색상*/
    color: #1C4E37;
    /*위치*/
    margin-left:1.5vw;
    margin-top:0.5vw;
`;
//////*DropDown*//////
const DropdownContainer=styled.div`
    width: 100%;
    height: 60%;
    margin-top:0.2vw;
    /*item 정렬*/
    position: relative;
    display: inline-block;
    justify-content: center;
    align-content: center;
`;
const DropdownTextButton = styled.div`
    width: 90%;
    height: 90%;
    margin-left: 5%;
    cursor: pointer;
    position: absolute;
    top:5px;
    z-index: 1;
    /*텍스트 스타일*/
    font-size: 2.5vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #80A691;
    user-select: none;
`;
const DropdownIconButton = styled.div`
    width: 2vw;
    height: 2vw;
    background: url("/resourcesPng/writeNovelPage/imageStyleIconBtn.png") no-repeat;
    background-size: contain;
    right: 3.8vw;
    top:1.4vw;
    cursor: pointer;
    position: absolute;
    z-index: 2;
`;
// 드롭다운 내용(항목들) 스타일
const DropdownContent = styled.div`
    display: ${props => props.isOpen ? 'block' : 'none'};
    width: 45%;
    min-width: 30%;
    margin-top:25px;
    margin-left: 50%;
    /*스타일*/
    background-color: #39604F;
    border:3px solid #335B4A;
    border-radius: 5px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    /*item정렬*/
    position: absolute;
    z-index:3;
    color: #153E29;
    /*드롭다운 목록*/
    a {
        padding-top:2%;
        padding-bottom: 3%;
        text-decoration: none;
        display: block;
        /*텍스트 스타일*/
        font-size: 1.5vw;
        font-family: gangwonedusaeeum, sans-serif; //대체폰트
        
        user-select: none;
        text-align: center;
        &:hover {
            background-color: #335B4A;
        }
    }
`;

const ImageStyleDropDown=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const {stableStyle, setStableStyle}=useContext(Context);
    // 드롭다운 항목 선택 핸들러
    const handleSelect = (text) => {
        setStableStyle(text); // 선택된 텍스트로 상태 업데이트
        setIsOpen(false); // 드롭다운 닫기
    };
    // DropdownTextButton에 표시할 값
    const displayedStyle = stableStyle.replace('-art', '');

    return (
        <ImageStyleContainer>
            <StyleTitle>Style</StyleTitle>
            <DropdownContainer>
                <DropdownTextButton onClick={() => setIsOpen(!isOpen)}>{displayedStyle}</DropdownTextButton>
                <DropdownIconButton onClick={() => setIsOpen(!isOpen)}></DropdownIconButton>
                <DropdownContent isOpen={isOpen}>
                    <a onClick={() => handleSelect('fantasy-art')}>fantasy</a>
                    <a onClick={() => handleSelect('digital-art')}>digital</a>
                    <a onClick={() => handleSelect('photographic')}>photographic</a>
                    <a onClick={() => handleSelect('anime')}>anime</a>
                    <a onClick={() => handleSelect('cinematic')}>cinematic</a>
                    <a onClick={() => handleSelect('pixel-art')}>pixel</a>
                </DropdownContent>
            </DropdownContainer>
        </ImageStyleContainer>
    )
}

export default ImageStyleDropDown;