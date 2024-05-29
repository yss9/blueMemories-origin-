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

    //두 페이지 내용 유무 확인 후 다음 장 버튼 비/활성화
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


/**
 * 아래에부터는 novelContent db 관련 코드
 **/
    const [pages,setPages]=useState([{pageNumber:1,text:"",image:""},{pageNumber:2,text:"",image:""}])
    const [currentPageIndex,setCurrentPageIndex] = useState(0);
    const [tempText,setTempText]=useState("");
    const [tempImage, setTempImage]=useState();
    const [saveTimeout,setSaveTimeout]=useState(null);

    // const handleInput=(setText)=>(e)=>{
    //     const textarea = e.target;
    //     const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
    //     if(!isOverflowing){
    //         setText(textarea.value);
    //     }
    // };
    /**
     * textarea에 글자가 변경되면
     * 내용 임시 저장 배열에 text 저장
     * 저장된 image는 초기화
     * 타임아웃을 설정하여 과부하 문제 방지
     **/
    //입력값 변경 시 설정되는 타임아웃 설정
    const hadleTextChange = (e,index,setText)=>{
        const textarea = e.target;
        const value = e.target.value; //텍스트 입력값 저장
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight;

        if(!isOverflowing) {
            setText(textarea.value);//해당 변수에 텍스트 값 저장(setTextA || setTextB)
            if (saveTimeout) {
                clearTimeout(saveTimeout); // 이전에 설정된 타이머가 있으면 이를 취소 -> 불필요한 배열 업데이트를 방지
            }

            setSaveTimeout(setTimeout(() => { // 새로운 타이머 설정 -> 500ms 이후 지정된 함수 실행
                setPages(prevPages => {
                    const updatedPages = [...prevPages]; //이전 상태의 모든 요소를 새로운 배열에 복사
                    updatedPages[index].text = value; // text 저장
                    updatedPages[index].image = ''; // 텍스트가 입력되면 이미지 초기화
                    return updatedPages;
                });
            }, 200));
        }
    };

    /**생성된 이미지 가져와서 image에 적용
     * 내용 임시 저장 배열에 image 저장
     * 저장된 text는 초기화
     **/
    const handleImageRegister=(imageUrl)=>{
        //배열에 이미지 저장
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            const pageIndex = selectedButton === 'left' ? currentPageIndex : currentPageIndex + 1;
            updatedPages[pageIndex].image = imageUrl;
            updatedPages[pageIndex].text = ''; // 이미지가 등록되면 텍스트 초기화
            return updatedPages;
        });
        //왼쪽 페이지 이미지 적용
        if(selectedButton==='left'){
            //context 값 저장
            setLeftImage(imageUrl);
            setLeftImagePrompt(stablePrompt);
            setLeftImageStyle(stableStyle);
            setLeftDisabled(true);//등록된 이미지가 있음
        }
        //오른쪽 페이지 이미지 적용
        else{//(selectedButton==='right')
            //context 값 저장
            setRightImage(imageUrl);
            setRightImagePrompt(stablePrompt);
            setRightImageStyle(stableStyle);
            setRightDisabled(true);//등록된 이미지가 있음
        }
    }

    /**
     * 다음 페이지 버튼 선택 => (
     * 페이지 번호 증가 (배열도 새로운 페이지 2개 추가}
     * 내용 및 변수 상태 초기화(글 또는 그림) + 하단 페이지 번호
     * )
     */
    const handleAddPages = () => {
        setPages(prevPages => [
            ...prevPages, //이전 배열값에 새로운 페이지 두개 추가
            { pageNumber: prevPages.length + 1, text: '', image: '' },
            { pageNumber: prevPages.length + 2, text: '', image: '' }
        ]);
        setCurrentPageIndex(prevIndex => prevIndex + 2); //이전 페이지를 참조함으로써 안전한 비동기 업데이트
        console.log("AddPage_currentPageIndex: "+currentPageIndex);
    };

    /**
     * currentPageIndex가 변경될 때 마다
     * textA, textB, leftImage, rightImage 값 업데이트
     * 이때 값들은 배열에서 현재 페이지와 일치하는 인덱스 값 가져옴
      */
    useEffect(() => {
        // 페이지가 변경될 때 텍스트와 이미지를 업데이트합니다.
        setTextA(pages[currentPageIndex]?.text || '');
        setLeftImage(pages[currentPageIndex]?.image || '');
        if(pages[currentPageIndex].image===''){//다른페이지에서 이미지 등록을 하면 disabled가 true가 되어서 글자가 나타나지 않는 현상 방지
            setLeftDisabled(false);
        }
        else{
            setLeftDisabled(true);
        }
        setTextB(pages[currentPageIndex + 1]?.text || '');
        setRightImage(pages[currentPageIndex + 1]?.image || '');
        if(pages[currentPageIndex+1].image===''){
            setRightDisabled(false);
        }
        else{
            setRightDisabled(true);
        }
    }, [currentPageIndex]);
    // useEffect(() => {
    //     if (pages[currentPageIndex]) {
    //         setTextA(pages[currentPageIndex].text);
    //         setLeftImage(pages[currentPageIndex].image);
    //     }
    //     if (pages[currentPageIndex + 1]) {
    //         setTextB(pages[currentPageIndex + 1].text);
    //         setRightImage(pages[currentPageIndex + 1].image);
    //     }
    // }, [currentPageIndex]);
    const handlePrevPage = () => {
        setCurrentPageIndex(prevIndex => Math.max(prevIndex - 2, 0));
        console.log("PrevPage_currentPageIndex: "+currentPageIndex);
    };

    return (
        <div>
            <Helmet>
                <title>WriteNovel</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>
            <Wrapper>
                <WriteMenuBar onClick={handleCoverBtnClick}></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn onClick={handlePrevPage}></BeforePageBtn>
                    <WriteContainer>
                        <LeftImageCreateContainer>
                            <CreateImageButton onClick={handleLeftButtonClick}></CreateImageButton>
                            <DeleteImageButton onClick={LeftHandleDeleteImage}></DeleteImageButton>
                        </LeftImageCreateContainer>
                        <WritePage></WritePage>
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textA}
                            // onInput={handleInput(setTextA)}
                            // onChange={(e)=>setTextA(e.target.value)}
                            onChange={(e) => hadleTextChange(e, currentPageIndex, setTextA)}
                            hidden={leftDisabled}></WriteText>
                        {leftImage && <Image src={leftImage} alt="Selected Image" />}
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textB}
                            // onInput={handleInput(setTextB)}
                            marginLeft={'53.2%'}
                            // onChange={(e)=>setTextB(e.target.value)}
                            onChange={(e) => hadleTextChange(e, currentPageIndex+1, setTextB)}
                            hidden={rightDisabled}></WriteText>
                        {rightImage && <Image marginLeft={'51.7%'} src={rightImage} alt="Selected Image" />}
                        <RightImageCreateContainer>
                            <CreateImageButton onClick={handleRightButtonClick}></CreateImageButton>
                            <DeleteImageButton onClick={RightHandleDeleteImage}></DeleteImageButton>
                        </RightImageCreateContainer>
                        <LeftPageNumber>{currentPageIndex + 1}</LeftPageNumber>
                        <RightPageNumber>{currentPageIndex + 2}</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive} onClick={handleAddPages}></AfterePageBtn>
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

