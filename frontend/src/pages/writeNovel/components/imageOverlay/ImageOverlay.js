import styled from 'styled-components';
import ImageStyleDropDown from "./imageStyle";
import ImagePrompt from "../../../../components/imagePrompt";
import ImageUploader from "../../../../components/imageFileInput";
import DragAndDrop from "../ImageDragAndDrop";
import React, {useState} from "react";
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
    const [stableStyle,setStableStyle]=useState('fantasy');
    const [stablePrompt,setStablePrompt]=useState('');
    const [imageFile,setImageFile]=useState(null);
    const [imageUrl, setImageUrl]=useState('/resourcesPng/writeNovelPage/imageShowPanel.png');

    /** [업로드, 드래그드롭 => 이미지 설정]
     * imageUploader, DragAndDrop에서 사용할 함수
     */
    const handleImageSelected = (file) => {
        setImageFile(file);
        const url=URL.createObjectURL(file);
        setImageUrl(url);
    };

    /** ['AI 그림 생성하기' 버튼]
     * stableAPI 호출
     */
    const loadImageFromApi = async () => {
        try {
            const file = await loadImageFromBackend(stablePrompt,stableStyle,"9:16");//encodedPrompt,stableStyle
            setImageFile(file);
            const url=URL.createObjectURL(file);
            setImageUrl(url);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    };

    /** ['취소' 버튼]
     * (style, prompt, image) 초기화 & 창 닫기
     */
    const handleClose = () => {
        setVisible(false);
        setStableStyle('fantasy-art');
        setStablePrompt('');
        setImageUrl('/resourcesPng/writeNovelPage/imageShowPanel.png');
    };

    /** ['등록' 버튼]
     * if( imageUrl에 다른 이미지가 들어왔다면 ){
     *     writeNovelPage.js의 handleImageOverlaySrc(file,url)실행
     * }
     * 창 닫기
     */
    const handleImageUpdate=()=>{
        if(imageUrl!=='/resourcesPng/writeNovelPage/imageShowPanel.png')
            onImageRegister(imageFile,imageUrl)
        handleClose();
    };

    return(
        <Overlay visible={visible}>
            <MakingImageLeftContainer>
                <ImagePromptContainer>
                    <ImageStyleDropDown stableStyle={stableStyle} setStableStyle={setStableStyle}></ImageStyleDropDown>
                    <ImagePrompt stablePrompt={stablePrompt} setStablePrompt={setStablePrompt}></ImagePrompt>
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