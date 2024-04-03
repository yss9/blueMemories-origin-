import styled from 'styled-components';
import ImageStyleDropDown from "./imageStyle";
import ImagePrompt from "./imagePrompt";
import ImageUploader from "./imageFileInput";
import DragAndDrop from "./ImageDragAndDrop";
import React, {useState} from "react";

const Overlay = styled.div`
    background: url("/resourcesPng/writeNovelPage/makingImageBackground.png") no-repeat;
    background-size: contain;
    top: 2%;
    left: 0;
    width: 100%;
    height: 90%;
    /*item설정*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    z-index: 5;
    /*애니메이션*/
    // 애니메이션 효과 (시작부터끝까지 걸리는 시간/속도곡선)
    transition: transform 0.7s ease-out;
    // visible 상태일 때 화면에 전체 보이도록 설정
    transform: ${props => props.visible ? 'translateY(1.9vw)':'translateY(-43.5vw)'};
`;
///*이미지 생성*///
const MakingImageLeftContainer=styled.div`
    display: flex;
    flex-direction: column;
    width:32vw;
    height: 45vw;
    align-items: center;
`;
const ImagePromptContainer = styled.div`
    width:30vw;
    height: 36.5vw;
    margin-top:2vw;
    padding-left: 0.3vw;
    padding-right: 0.3vw;
    /*도형 모양*/
    border:2px solid #83B19D;
    border-radius: 8px;
    background-color: transparent;
    /*item정렬*/
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const ImageCreateButton=styled.button`
    width:30.5vw;
    height: 3.2vw;
    margin-top:0.5vw;
    padding-bottom: 0.5vw;
    /*텍스트 스타일*/
    font-size: 2vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #D6E7DD;
    user-select: none;
    /*버튼 스타일*/
    background-color: #305940;
    border-radius: 5px;
    border: none;
    box-shadow: 0 2px 3px 2px rgba(16, 56, 38, 0.65);
    cursor: pointer;
    &:active{
        background-color: #204830;
    }
`;
//////*오른쪽 컨테이너*//////
const ImageRightContainer =styled.div`
    width:26vw;
    height:39vw;
    margin-left:3vw;
    margin-top:2vw;
    position: relative;
`;
const ImageShowContainer = styled.div`
    background: url("/resourcesPng/writeNovelPage/imageShowPanel.png") no-repeat;
    background-size: contain;
    width:26vw;
    height: 40vw;
    padding:5px;
`;
//*왼쪽의 이미지가 보여지는 부분 --> ImageShowContainer위에 얹짐*///
const Image = styled.img`
    width: 26vw;
    height: 38.7vw;
    object-fit: contain;
`;
const ImageCreateBtnContainer=styled.div`
    width: 30%;
    height: 3vw;
    position: absolute;
    bottom:-3.5vw;
    right:1vw;
    /*item 설정*/
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ImageCreateBtn = styled.div`
    /*텍스트 스타일*/
    font-size: 2vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #244531;
    user-select: none;
    &:hover{
        cursor:pointer;
    }
`;
const ImageOverlay=({visible, setVisible})=>{
    // 이미지 URL 상태 추가
    const [selectedImageUrl, setSelectedImageUrl] = useState('/resourcesPng/writeNovelPage/imageShowPanel.png');
    // 이미지가 선택되었을 때 호출될 함수
    const handleImageSelected = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
    };
    //창닫기
    const handleClose = () => {
        setVisible(false);
    };
    return(
        <Overlay visible={visible}>
            <MakingImageLeftContainer>
                <ImagePromptContainer>
                    <ImageStyleDropDown></ImageStyleDropDown>
                    <ImagePrompt></ImagePrompt>
                    <ImageUploader onImageSelected={handleImageSelected}></ImageUploader>
                    <DragAndDrop onImageSelected={handleImageSelected}></DragAndDrop>
                </ImagePromptContainer>
                <ImageCreateButton>AI 그림 생성하기</ImageCreateButton>
            </MakingImageLeftContainer>
            <ImageRightContainer>
                <ImageShowContainer>
                    <Image src={selectedImageUrl} alt="Selected Image"></Image>
                </ImageShowContainer>
                <ImageCreateBtnContainer>
                    <ImageCreateBtn onClick={handleClose}>취소</ImageCreateBtn>
                    <ImageCreateBtn onClick={handleClose}>등록</ImageCreateBtn>
                </ImageCreateBtnContainer>

            </ImageRightContainer>
            
        </Overlay>
    );
};

export default ImageOverlay;