import {Helmet} from "react-helmet";
import styled, {css} from 'styled-components';
import React, { useState, useEffect } from 'react';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import ImageOverlay from "./components/ImageOverlay";
import NovelCoverOverlay from "./components/NovelCoverOverlay";

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    background-color: #FBF5E4;
    flex-direction:column;
    align-items: center; /* 수직 중앙 정렬 */
`;

const BodyContainer=styled.div`
    width: 80%;
    height:100%;
    margin-bottom:1%;
    /*item정렬*/
    display: flex;
    justify-content: space-between;/* 수평  정렬 */
    flex-direction: row;
    align-items: center; /* 수직 중앙 정렬 */
`;
const BeforePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/beforePageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/beforePageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;
const AfterePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/afterPageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/afterPageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;

const WriteContainer = styled.div`
    width: 90%;
    height: 40vw;
    /*item 정렬*/
    display: flex;
    flex-direction: row;
    position:relative;
    justify-content: center;/* 수평  정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`;
const LeftImageCreateContainer=styled.div`
    width: 9vw;
    height: 10vw;
    background: url("/resourcesPng/writeNovelPage/imageCreateBtnContainerLeft.png") no-repeat center;
    background-size: contain;
    position: absolute;
    left: 2.5%;
    top: 1.5%;
    /*item*/
    display: flex;
    flex-direction: column;
`;
const WritePage = styled.div`
    background: url("/resourcesPng/writeNovelPage/whitePage.png") no-repeat center;
    background-size: contain;
    /*스타일*/
    border:none;
    outline:none;
    /*크기*/
    width: 55vw;
    height: 40vw;
    /*레이어*/
    position:absolute;
    z-index: 1;
`;
const WriteText = styled.textarea`
    width: 22.5vw;
    height: 32vw;
    /*스타일*/
    border: none;
    outline:none;
    resize: none;
    overflow: hidden; /* 스크롤바 숨김 */
    background-color: transparent;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 3;
    /*위치*/
    top:10%;
    left: ${(props) => props.marginLeft || '15.2%'};
    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        overflow: hidden; /* 스크롤바 숨김 */
        /*텍스트 설정*/
        font-size: 0.8vw;
        font-family: BokkLight, sans-serif; //대체폰트
    }
`;
const Image=styled.img`
    width: 25vw;
    height: 37vw;
    border:none;
    outline:none;
    /*레이어*/
    position:absolute;
    z-index: 2;
    left:${(props)=>props.marginLeft||'13.5%'};
    opacity:0.9;
    object-fit: cover;
`;
const RightImageCreateContainer=styled.div`
    width: 9vw;
    height: 10vw;
    background: url("/resourcesPng/writeNovelPage/imageCreateBtnContainerRight.png") no-repeat center;
    background-size: contain;
    position: absolute;
    right: 2.5%;
    top: 1.5%;
`;
const CreateImageButton=styled.button`
    width: 4vw;
    height: 4vw;
    background: url("/resourcesPng/writeNovelPage/addImageBtn.png") no-repeat center;
    background-size: contain;
    border:none;
    margin-top: 5%;
    margin-left: 30%;
    &:hover{
        cursor: pointer;
    }
`;
const DeleteImageButton=styled.button`
    width: 4vw;
    height: 4vw;
    background: url("/resourcesPng/writeNovelPage/deleteImageBtn.png") no-repeat center;
    background-size: contain;
    border:none;
    margin-top: 12%;
    margin-left: 30%;
    &:hover{
        cursor: pointer;
    }
`;

const LeftPageNumber=styled.span`
    left:15%;
    bottom:5%;
    //padding:2%;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 4;
    align-content: center;
    
`;
const RightPageNumber=styled.span`
    right:15%;
    bottom:5%;
    //padding:2%;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 4;
    align-content: center;
`;

const WriteNovelForm = () => {

    //이미지 추가버튼 => 이미지 생성 overlay
    const [visible, setVisible] = useState(false);
    const toggleOverlay=()=> {
        setVisible(!visible);
    }

    //textarea 글자수 제한(높이가 기준)
    const [textA, setTextA] = useState('');
    const [textB, setTextB] = useState('');
    const handleInput=(setText)=>(e)=>{
        const textarea = e.target;
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
        if(!isOverflowing){
            setText(textarea.value);
        }
    };

    //menubar 책 표지 버튼(WriteMenuBar.js)눌렀을 때 콜백함수
    const [coverVisible, setCoverVisible] = useState(false);
    const handleCoverBtnClick = (data) => {
        // WriteMenuBar 클릭 시 NovelCoverOverlay 보이도록 설정
        setCoverVisible(!coverVisible);
    };

    //textarea, image, imageAddBtn, imageDeleteBtn 상태 관리
    const [leftImage, setLeftImage] = useState(null);//imageL
    const [rightImage, setRightImage] = useState(null);//imageR
    const [leftDisabled, setLeftDisabled] = useState(false);//imageAddBtnL
    const [rightDisabled, setRightDisabled] = useState(false);//imageAddBtnR

    // 'left' 또는 'right' 값을 저장할 상태 설정
    const [selectedButton, setSelectedButton] = useState(null);
    // 왼쪽 버튼 클릭 핸들러
    const handleLeftButtonClick = () => {
        toggleOverlay();
        setSelectedButton('left');
        // 필요한 추가 로직
    };
    // 오른쪽 버튼 클릭 핸들러
    const handleRightButtonClick = () => {
        toggleOverlay();
        setSelectedButton('right');
        // 필요한 추가 로직
    };
    //생성된 이미지 가져와서 image에 적용
    const handleImageRegister=(imageUrl)=>{
        console.log('Registered Image URL:', imageUrl); // 콘솔 로그 추가
        if(selectedButton==='left'){
            setLeftImage(imageUrl);
            setLeftDisabled(true);//등록된 이미지가 있음
        }
        else{//(selectedButton==='right')
            setRightImage(imageUrl);
            setRightDisabled(true);//등록된 이미지가 있음
        }
    }
    // leftDisabled 상태에 따라 textArea 내용 초기화 및 hidden 설정
    useEffect(() => {
        if (leftDisabled) {//등록된 이미지가 있음
            setTextA(''); // 왼쪽 textarea의 내용을 초기화
        }
    }, [leftDisabled]); // leftDisabled 상태에 의존

    // rightDisabled 상태가 변경될 때마다 실행
    useEffect(() => {
        if (rightDisabled) {//등록된 이미지가 있음
            setTextB(''); // 오른쪽 textarea의 내용을 초기화
        }
    }, [rightDisabled]); // rightDisabled 상태에 의존
    //왼쪽 삭제 버튼
    const LeftHandleDeleteImage=()=>{
        setLeftDisabled(false);//등록된 이미지가 없음
        setLeftImage('');//이미지 초기화
    }
    //오른쪽 삭제 버튼
    const RightHandleDeleteImage=()=>{
        setRightDisabled(false);//등록된 이미지가 없음
        setRightImage('');//이미지 초기화
    }
    return (
        <div>
            <Helmet>
                <title>WriteNovel</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>
            <Wrapper>
                <WriteMenuBar onClick={handleCoverBtnClick}></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn></BeforePageBtn>
                    <WriteContainer>
                        <LeftImageCreateContainer>
                            <CreateImageButton onClick={handleLeftButtonClick}></CreateImageButton>
                            <DeleteImageButton onClick={LeftHandleDeleteImage}></DeleteImageButton>
                        </LeftImageCreateContainer>
                        <WritePage></WritePage>
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textA}
                            onInput={handleInput(setTextA)}
                            hidden={leftDisabled}></WriteText>
                        {leftImage && <Image src={leftImage} alt="Selected Image" />}
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textB}
                            onInput={handleInput(setTextB)}
                            marginLeft={'53.2%'}
                            hidden={rightDisabled}></WriteText>
                        {rightImage && <Image marginLeft={'51.7%'} src={rightImage} alt="Selected Image" />}
                        <RightImageCreateContainer>
                            <CreateImageButton onClick={handleRightButtonClick}></CreateImageButton>
                            <DeleteImageButton onClick={RightHandleDeleteImage}></DeleteImageButton>
                        </RightImageCreateContainer>
                        <LeftPageNumber>2</LeftPageNumber>
                        <RightPageNumber>3</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn></AfterePageBtn>
                </BodyContainer>
                <ImageOverlay  visible={visible} setVisible={setVisible} onImageRegister={handleImageRegister}></ImageOverlay>
                <NovelCoverOverlay visible={coverVisible} setVisible={setCoverVisible}></NovelCoverOverlay>
            </Wrapper>
        </div>
    );
};

export default WriteNovelForm;
