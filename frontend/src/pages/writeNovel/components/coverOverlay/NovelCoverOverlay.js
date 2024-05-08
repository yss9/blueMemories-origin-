import styled from 'styled-components';
import ImageStyleDropDown from "./coverStyle";
import ImagePrompt from "./coverPrompt";
import ImageUploader from "../imageFileInput";
import DragAndDrop from "../ImageDragAndDrop";
import TitlePrompt from "./TitleTextInput";
import TitleSize from "./TitleSizeControl";
import React, {useContext, useEffect, useRef, useState} from "react";
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
//////---왼쪽 컨테이너---//////
const LeftContainer=styled.div`
    display: flex;
    flex-direction: column;
    width:32vw;
    height: 45vw;
    align-items: center;
`;
//왼쪽 border line
const ImagePromptContainer = styled.div`
    width:28vw;
    height: 35.5vw;
    margin-top:2vw;
    padding-left: 0.2vw;
    padding-right: 0;
    /*도형 모양*/
    border:2px solid #83B19D;
    border-radius: 6px;
    background-color: transparent;
    /*item정렬*/
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
//하단 "AI 그림 생성하기" 버튼
const ImageCreateButton=styled.button`
    width:28vw;
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
//////---가운데 컨테이너---//////
const ImageShowContainer = styled.div`
    width:26vw;
    height: 40vw;
    background-color: #80A691;
    border-radius: 1%;
    margin-left:3vw;
    margin-top:2vw;
    
    /*item*/
    position: relative;
`;
//*왼쪽의 이미지가 보여지는 부분 --> ImageShowContainer위에 얹짐*///
const CoverImage = styled.img`
    height:98.5%;
    width:97.5%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    padding:5px;
`;
const TitleContainer=styled.div`
    width: 90%;
    height: 90%;
    left:5%;
    top:5%;
    position: absolute;
    z-index: 2;
    background-color: transparent;
`;
//제목 text
const Title = styled.text`
    width: auto;
    height: auto; 
    max-height:100%;
    overflow:hidden;
    /*텍스트 스타일*/
    font-size:5vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #212A25;
    user-select: none;
    white-space: pre-wrap; //'\n' 줄바꿈 인식
    /*위치 드래그*/
    cursor:move;
`;
/////---오른쪽 컨테이너---/////
const RightContainer=styled.div`
    display: flex;
    flex-direction: column;
    width:28vw;
    height: 36vw;
    align-items: center;
`;
const TitlePromptContainer = styled.div`
    width:70%;
    height: 49.5%;
    margin-top:2vw;
    padding-left: 0.3vw;
    padding-right: 0.1vw;
    padding-bottom: 0.2vw;
    /*도형 모양*/
    border:2px solid #83B19D;
    border-radius: 6px;
    background-color: transparent;
    /*item정렬*/
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const ImageCreateBtnContainer=styled.div`
    width: 25%;
    height: 3vw;
    margin-left:10vw;
    margin-top:0.5vw;
    /*item 설정*/
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ImageCreateBtn = styled.div`
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #244531;
    user-select: none;
    &:hover{
        cursor:pointer;
    }
`;
const NovelCoverOverlay=({visible,setVisible})=>{
    //contextAPI: style-preset
    const {stableCoverImage, setStableCoverImage}=useContext(Context);
    // 이미지가 선택되었을 때 호출될 함수
    const handleImageSelected = (imageUrl) => {
        setStableCoverImage(imageUrl);
    };

    //contextAPI: style-preset
    const {stableCoverStyle}=useContext(Context);
    //contextAPI: prompt
    const {stableCoverPrompt} = useContext(Context);
    //stableDiffusion API formData
    const loadImageFromApi = async () => {
        try {
            const url = await loadImageFromBackend(stableCoverPrompt,stableCoverStyle,"9:16");//encodedPrompt,stableStyle
            setStableCoverImage(url); // 생성된 이미지 URL 상태에 저장
        } catch (error) {
            console.error('Error loading image:', error);
        }
    };

    // 제목 동기화
    const {coverTitle, setCoverTitle}=useContext(Context);
    const handleTitleChange = (newTitle) => {
        // 입력된 제목으로 상태 업데이트
        setCoverTitle(newTitle);
    };

    // 스크롤러 값에 따른 제목 크기 변경
    const {coverTitlePxSize, setCoverTitlePxSize}=useContext(Context);
    const handleTitlePxSize = (newSize)=>{
        setCoverTitlePxSize(newSize);
    };

    //제목 위치 이동
    //드래그 중인 요소의 현재 위치
    const [position, setPosition] = useState({ x: 0, y: 0 });
    //드래그 상태 ->true는 드래그중, false는 드래그 아님
    const [dragging, setDragging] = useState(false);
    //드래그가 시작된 지점의 위치
    const {coverTitleStartPosition, setCoverTitleStartPosition}=useContext(Context);
    //제목 컨테이너 참조
    const titleContainerRef = useRef(null);
    //제목 컨테이너 참조
    const titleRef = useRef(null);
    const handleMouseDown=(event)=>{
        if (event.target === event.currentTarget){
            setDragging(true);
            //마우스 위치 계산
            setCoverTitleStartPosition({
                x:event.clientX-position.x,
                y:event.clientY-position.y
            });
        }
    };
    const handleMouseMove=(event)=>{
        if(!dragging) return;
        if(dragging){
            // TitleContainer의 경계값 가져오기
            const containerBounds = titleContainerRef.current.getBoundingClientRect();
            // Title 컴포넌트의 현재 크기를 얻습니다.
            const titleBounds = titleRef.current.getBoundingClientRect();

            // 마우스 포인터의 위치에서 시작 위치를 뺀 값입니다.
            let newX = event.clientX - coverTitleStartPosition.x;
            let newY = event.clientY - coverTitleStartPosition.y;

            // newX와 newY가 TitleContainer 내에 있는지 확인하고 조정합니다.
            // TitleContainer의 왼쪽 또는 상단 경계를 넘지 않도록 합니다.
            newX = Math.max(0, newX);
            newY = Math.max(0, newY);

            // TitleContainer의 오른쪽 또는 하단 경계를 넘지 않도록 합니다.
            newX = Math.min(containerBounds.width - titleBounds.width, newX);
            newY = Math.min(containerBounds.height - titleBounds.height, newY);

            // 위치를 업데이트합니다.
            setPosition({ x: newX, y: newY });

        }
    };
    const handleMouseUp=()=>{
        setDragging(false);
    };

    //취소 버튼 -> 창닫기
    const handleClose = () => {
        setVisible(false);
    };

    return(
        <Overlay visible={visible}>
            <LeftContainer>
                <ImagePromptContainer>
                    <ImageStyleDropDown></ImageStyleDropDown>
                    <ImagePrompt></ImagePrompt>
                    <ImageUploader key="secondImageUploader" onImageSelected={handleImageSelected}></ImageUploader>
                    <DragAndDrop onImageSelected={handleImageSelected}></DragAndDrop>
                </ImagePromptContainer>
                <ImageCreateButton onClick={loadImageFromApi}>AI 그림 생성하기</ImageCreateButton>
            </LeftContainer>
            <ImageShowContainer>
                <CoverImage src={stableCoverImage} alt="Selected Image"></CoverImage>
                <TitleContainer
                    ref={titleContainerRef}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}>
                    <Title
                        ref={titleRef}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        style={{
                            fontSize:`${coverTitlePxSize}vw`,
                            overflow:`hidden`,
                            cursor:`move`,
                            left: `${position.x}px`,
                            top:`${position.y}px`,
                            position:`absolute`
                    }}>{coverTitle}</Title>
                </TitleContainer>
            </ImageShowContainer>
            <RightContainer>
                <TitlePromptContainer>
                    <TitlePrompt onChange={handleTitleChange}></TitlePrompt>
                    <TitleSize onChange={handleTitlePxSize}></TitleSize>
                </TitlePromptContainer>
                <ImageCreateBtnContainer>
                    <ImageCreateBtn onClick={handleClose}>취소</ImageCreateBtn>
                    <ImageCreateBtn onClick={handleClose}>등록</ImageCreateBtn>
                </ImageCreateBtnContainer>
            </RightContainer>
        </Overlay>
    );
};

export default NovelCoverOverlay;