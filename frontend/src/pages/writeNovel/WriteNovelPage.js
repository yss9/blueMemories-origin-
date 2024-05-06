import {Helmet} from "react-helmet";
import styled, {css} from 'styled-components';
import React, {useState, useEffect, useContext} from 'react';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import ImageOverlay from "./components/imageOverlay/ImageOverlay";
import NovelCoverOverlay from "./components/coverOverlay/NovelCoverOverlay";
import {Context} from "../Context/Context";

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
`;
const AfterePageBtn = styled.button`
    background: url(${props => props.isActive ? "/resourcesPng/writeNovelPage/afterPageBtn.png" : "/resourcesPng/writeNovelPage/disabledAfterPageBtn.png"}) no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
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
    //해당 페이지에 글자가 적혀있을 경우 그림 생성 x
    const {novelOverlayState, setNovelOverlayState}=useContext(Context);
    const toggleOverlayA=()=> {//왼쪽 페이지 글자 유무 확인
        if(textA.trim()==='')//글자가 없을때만 이미지 추가 오버레이 내림
            setNovelOverlayState(true);
        else{
            alert('텍스트를 지우고 다시 시도해주세요.');
        }
    };
    const toggleOverlayB=()=> {//오른쪽 페이지 글자 유무 확인
        if(textB.trim()==='')//글자가 없을때만 이미지 추가 오버레이 내림
            setNovelOverlayState(true);
        else{
            alert('텍스트를 지우고 다시 시도해주세요.');
        }
    };

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
        //이미지 생성 화면이 출력돼있을 경우 올라감
        setNovelOverlayState(false);
    };
    //imageOverlayItem 상태 관리
    const {stableStyle,setStableStyle}=useContext(Context);//contextAPI: style-preset
    const {stablePrompt,setStablePrompt} = useContext(Context);//contextAPI: prompt
    const {setStableImage} = useContext(Context);//contextAPI: prompt
    //textarea, image, imageAddBtn, imageDeleteBtn 상태 관리
    const [leftImage, setLeftImage] = useState('');//imageL
    const [rightImage, setRightImage] = useState('');//imageR
    const [leftImagePrompt, setLeftImagePrompt] = useState(stablePrompt);//promptL
    const [rightImagePrompt, setRightImagePrompt] = useState(stablePrompt);//promptR
    const [leftImageStyle, setLeftImageStyle] = useState(stableStyle);//styleL
    const [rightImageStyle, setRightImageStyle] = useState(stableStyle);//styleR
    const [leftDisabled, setLeftDisabled] = useState(false);//imageAddBtnL
    const [rightDisabled, setRightDisabled] = useState(false);//imageAddBtnR

    // 'left' 또는 'right' 값을 저장할 상태 설정
    const [selectedButton, setSelectedButton] = useState(null);
    // 왼쪽 이미지 생성 버튼 클릭 핸들러
    const handleLeftButtonClick = () => {
        toggleOverlayA();//글자 유무 확인
        setSelectedButton('left');
        // 왼쪽 이미지의 style, prompt, img 를 overlay에 전달
        settingImageOverlayItem(leftImageStyle,leftImagePrompt,leftImage);
    };
    // 오른쪽 이미지 생성 버튼 클릭 핸들러
    const handleRightButtonClick = () => {
        toggleOverlayB();
        setSelectedButton('right');
        // 오른쪽 이미지의 style, prompt, img 를 overlay에 전달
        settingImageOverlayItem(rightImageStyle,rightImagePrompt,rightImage);
    };
    //이미지의 style, prompt, imageUrl 를 왼/오 페이지 값으로 전환
    const settingImageOverlayItem=(style,prompt,imageUrl)=>{
        if(imageUrl===''){
            setStableImage('/resourcesPng/writeNovelPage/imageShowPanel.png');
        }else{
            setStableImage(imageUrl);
        }
        setStableStyle(style);
        setStablePrompt(prompt);

    };

    //생성된 이미지 가져와서 image에 적용
    const handleImageRegister=(imageUrl)=>{
        if(selectedButton==='left'){
            //context 값 저장
            setLeftImage(imageUrl);
            setLeftImagePrompt(stablePrompt);
            setLeftImageStyle(stableStyle);
            setLeftDisabled(true);//등록된 이미지가 있음
        }
        else{//(selectedButton==='right')
            //context 값 저장
            setRightImage(imageUrl);
            setRightImagePrompt(stablePrompt);
            setRightImageStyle(stableStyle);
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
        setTextA('');//텍스트 초기화
        setLeftImage('');//이미지 초기화
        setLeftImageStyle('fantasy-art');
        setLeftImagePrompt('');
    }
    //오른쪽 삭제 버튼
    const RightHandleDeleteImage=()=>{
        setRightDisabled(false);//등록된 이미지가 없음
        setTextB('');//텍스트 초기화
        setRightImage('');//이미지 초기화
        setRightImageStyle('fantasy-art');
        setRightImagePrompt('');
    }
    //두 페이지 내용 우뮤 확인 후 다음 장 버튼 비/활성화
    const [nextPageBtnActive, setNextPageBtnActive] = useState(false);
    useEffect(() => {
        if (rightDisabled||textB.trim()!=='') {//왼쪽 페이지에 등록된 이미지가 있거나 글자가 있을 경우
            if(leftDisabled||textA.trim()!==''){
                //다음 페이지 넘김 버튼 활성화
                setNextPageBtnActive(true);
            }
            else{
                setNextPageBtnActive(false);
            }
        }
        else{
            setNextPageBtnActive(false);
        }
    }, [rightDisabled,textB,leftDisabled,textA]); // rightDisabled 상태에 의존
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
                            onChange={(e)=>setTextA(e.target.value)}
                            hidden={leftDisabled}></WriteText>
                        {leftImage && <Image src={leftImage} alt="Selected Image" />}
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textB}
                            onInput={handleInput(setTextB)}
                            marginLeft={'53.2%'}
                            onChange={(e)=>setTextB(e.target.value)}
                            hidden={rightDisabled}></WriteText>
                        {rightImage && <Image marginLeft={'51.7%'} src={rightImage} alt="Selected Image" />}
                        <RightImageCreateContainer>
                            <CreateImageButton onClick={handleRightButtonClick}></CreateImageButton>
                            <DeleteImageButton onClick={RightHandleDeleteImage}></DeleteImageButton>
                        </RightImageCreateContainer>
                        <LeftPageNumber>2</LeftPageNumber>
                        <RightPageNumber>3</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive}></AfterePageBtn>
                </BodyContainer>
                <ImageOverlay
                    visible={novelOverlayState}
                    setVisible={setNovelOverlayState}
                    onImageRegister={handleImageRegister}
                ></ImageOverlay>
                <NovelCoverOverlay visible={coverVisible} setVisible={setCoverVisible}></NovelCoverOverlay>
            </Wrapper>
        </div>
    );
};

export default WriteNovelForm;

