import React, { useState } from 'react';
import styled from 'styled-components';

const FileInputContainer = styled.label`
    width:99%;
    height: 2.5vw;
    padding-top: 1%;
    margin-top: 1%;
    margin-bottom: 1%;
    /*item 설정*/
    position: relative;
    display: inline-block;
    flex-direction: column;
    cursor: pointer;
    
`;
// 파일 선택 버튼 스타일링
const FileInputButton = styled.label`
    width: auto;
    height: auto;
    margin-bottom:15%;
    margin-left: 4.5%;
    position: absolute;
    /*도형 모양*/
    background-color: transparent;
    cursor: pointer;
    color: #1C4E37;

    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    text-decoration:underline;
    text-decoration-color: #1C4E37;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
    user-select: none;
    
`;
const FileInputIconButton=styled.label`
    width:1.8vw;
    height: 2vw;
    margin-top:1%;
    margin-right: 12%;
    right: 0;
    /*도형 모양*/
    background: url("/resourcesPng/writeNovelPage/imageUploadBtn.png") no-repeat;
    background-size: contain;
    /*item 설정*/
    position: absolute;
    cursor: pointer;
`
// 숨겨진 실제 파일 인풋
const HiddenFileInput = styled.input`
    display: none;
    //background: none;
    width:100%;
    background-color: transparent; /* 배경색 투명 */
    border: none; /* 테두리 제거 */
    outline: none; /* 포커스 아웃라인 제거 */
    -webkit-appearance: none; /* 크롬, 사파리에서 기본 스타일 제거 */
    -moz-appearance: none; /* 파이어폭스에서 기본 스타일 제거 */
    appearance: none; /* 최신 브라우저에서 기본 스타일 제거 */

`;

// // 이미지 프리뷰 스타일링
// const ImagePreview = styled.img`
//     max-width: 100%;
//     max-height: 300px;
//     margin-top: 20px;
// `;

const ImageUploader = ({onImageSelected}) => {
    const fileInputRef = React.useRef();
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onImageSelected) {
            onImageSelected(file);
        }
    };

    return (
        <div>

            <FileInputContainer>
                <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <FileInputButton onClick={handleButtonClick}>Upload image</FileInputButton>
                <FileInputIconButton onClick={handleButtonClick}></FileInputIconButton>
            </FileInputContainer>
        </div>
    );
};

export default ImageUploader;