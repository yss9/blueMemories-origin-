import React from 'react';
import styled from 'styled-components';

const StyledEditor = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    min-height: 300px;
    width: 80%;
    margin: auto;
    position: relative;
    overflow-wrap: break-word;
    cursor: text;
    outline: none;
    font-family: gangwonedusaeeum, sans-serif;
    font-size: 3vh;
`;

const Button = styled.button`
  margin: 10px;
`;

function WrittenComponent() {
    const addImage = () => {
        const imageUrl = "https://via.placeholder.com/150";
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.maxWidth = '100px';
        imgElement.style.maxHeight = '100px';
        imgElement.style.float = 'left'; // 이미지를 왼쪽으로 플로팅
        imgElement.style.marginRight = '10px'; // 텍스트와 이미지 사이에 여백 추가
        document.getElementById('editable').appendChild(imgElement);
    };

    return (
        <div>
            <Button onClick={addImage}>이미지 추가</Button>
            <StyledEditor
                id="editable"
                contentEditable
                dangerouslySetInnerHTML={{ __html: '<p>여기에 텍스트를 입력하세요...</p>' }}
            />
        </div>
    );
}

export default WrittenComponent;