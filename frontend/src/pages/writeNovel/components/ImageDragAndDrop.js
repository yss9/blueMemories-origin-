import React, { useState } from 'react';
import styled from 'styled-components';


const ImageUploadContainer =styled.div`
    width:99%;
    height: 10vw;
    left:0;
    /*도형 모양*/
    background-color: #80A691;
    border-radius: 6px;
    /*item 설정*/
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ImageUploadIcon=styled.div`
    width: 2.5vw;
    height: 2.5vw;
    background: url("/resourcesPng/writeNovelPage/imageUploadBtn.png") no-repeat;
    background-size: contain;
    margin-top:2vw;
`;
const ImageUploadText=styled.div`
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #163F2B;
    user-select: none;
    /*크기*/
    height: auto;
    width: auto;
    margin-top:1vw;
`;
const DragAndDrop = ({onImageSelected}) => {
    const [image, setImage] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault(); // 기본 이벤트를 방지
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files; // 드롭한 파일 목록
        if (files && files.length > 0) {
            const file = files[0];
            setImage(URL.createObjectURL(file)); // 파일을 미리보기 가능한 URL로 변환
            if(onImageSelected) {
                onImageSelected(URL.createObjectURL(file));
            }
        }
    };

    return (
        <ImageUploadContainer
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <ImageUploadIcon></ImageUploadIcon>
            <ImageUploadText>사진을 끌어다 놓으세요</ImageUploadText>
            {/*{image ? <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : ""}*/}
        </ImageUploadContainer>
    );
};

export default DragAndDrop;