import styled from 'styled-components';
import ImageStyleDropDown from "./imageStyle";
import ImagePrompt from "./imagePrompt";
import ImageUploader from "../imageFileInput";
import DragAndDrop from "../ImageDragAndDrop";
import React, {useContext, useState} from "react";
import {Context} from "../../../Context/Context";
import {loadImageFromBackend} from "../../../API/stableApi";

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
const ImageCreateAiBtn=styled.button`
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
    outline: none;
    &:active{
        background-color: #204830;
        outline: none;
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
    padding:10px;
`;
//*왼쪽의 이미지가 보여지는 부분 --> ImageShowContainer위에 얹짐*///
const Image = styled.img`
    width: 26vw;
    height: 38.7vw;
    object-fit: cover;
    opacity:0.9;
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
const ImageOverlay=({visible, setVisible,onImageRegister})=>{
    //contextAPI: style-preset
    const {imageUrl, setImageUrl}=useContext(Context);
    const [imageFile,setImageFile]=useState(null);
    // 이미지가 선택되었을 때 호출될 함수
    const handleImageSelected = (file) => {
        const imageFile=URL.createObjectURL(file);
        setImageUrl(imageFile);
        setImageFile(file);
    };

    //contextAPI: style-preset
    const {stableStyle}=useContext(Context);
    //contextAPI: prompt
    const {stablePrompt} = useContext(Context);
    // const encodedPrompt = encodeURIComponent(stablePrompt);//구글 번역api 안거치고 바로 stable diffusion api사용할때는 encoding값 넘겨야한다.
    //stableDiffusion API formData
    const loadImageFromApi = async () => {
        try {
            const file = await loadImageFromBackend(stablePrompt,stableStyle,"9:16");//encodedPrompt,stableStyle
            const imageFile=URL.createObjectURL(file);
            setImageUrl(imageFile);
            setImageFile(file);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    };

    //취소 버튼 -> 초기화 -> 창닫기
    const handleClose = () => {
        setVisible(false);
        // 2초 후에 나머지 설정을 실행하도록 setTimeout 사용
        // setTimeout(() => {
        //     setStableStyle('fantasy-art');
        //     setStablePrompt('');
        //     setStableImage('/resourcesPng/writeNovelPage/imageShowPanel.png');
        // }, 2000); // 2000 밀리초(2초)
    };
    //등록 버튼 -> 값 update -> 창닫기
    //이미지 생성한거 없는 상태에서 등록 버튼 누르면 변화 x
    const handleImageUpdate=()=>{
        if(imageUrl!=='/resourcesPng/writeNovelPage/imageShowPanel.png')
            onImageRegister(imageFile,imageUrl)
        handleClose();
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
                <ImageCreateAiBtn onClick={loadImageFromApi}>AI 그림 생성하기</ImageCreateAiBtn>
            </MakingImageLeftContainer>
            <ImageRightContainer>
                <ImageShowContainer>
                    <Image src={imageUrl} alt="Selected Image"></Image>
                </ImageShowContainer>
                <ImageCreateBtnContainer>
                    <ImageCreateBtn onClick={handleClose}>취소</ImageCreateBtn>
                    <ImageCreateBtn onClick={handleImageUpdate}>등록</ImageCreateBtn>
                </ImageCreateBtnContainer>

            </ImageRightContainer>

        </Overlay>
    );
};

export default ImageOverlay;