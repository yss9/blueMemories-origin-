import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import NovelCoverOverlay from "./components/coverOverlay/DrawBookCoverOverlay";
import React, {useContext, useState} from 'react';
import ImageOverlay from "./components/imageOverlay/ImageOverlay";
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
    margin-bottom:5%;
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
const MainContentsContainer = styled.div`
    width: 90%;
    height: 40vw;
    /*item 정렬*/
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;/* 수평  정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`;
const ImageCreateContainer=styled.div`
    width: 9vw;
    height: 10vw;
    background: url("/resourcesPng/writeDrawBookPage/imageCreateBtnContainer.png") no-repeat center;
    background-size: contain;
    position: absolute;
    left: 5%;
    top: 3.5%;
    /*item*/
    display: flex;
    flex-direction: row;
`;
const CreateImageButton=styled.button`
    width: 3vw;
    height: 3vw;
    background: url("/resourcesPng/writeNovelPage/addImageBtn.png") no-repeat center;
    background-size: contain;
    border:none;
    margin-top: 40%;
    margin-left: 10%;
    &:hover{
        cursor: pointer;
    }
`;
const DeleteImageButton=styled.button`
    width: 3vw;
    height: 3vw;
    background: url("/resourcesPng/writeNovelPage/deleteImageBtn.png") no-repeat center;
    background-size: contain;
    border:none;
    margin-top: 40%;
    margin-left: 15%;
    &:hover{
        cursor: pointer;
    }
`;
const WriteContainer = styled.div`
    background: url("/resourcesPng/writeDrawBookPage/writeDrawWhitePage.png") no-repeat center;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    width: 97%;
    height: 25vw;
    /*item*/
    display: flex;
    flex-direction: row;
    position: relative;
`;
const ImageCreateBtn = styled.div`
    width:48%;
    height:88%;
    margin-top: 2%;
    margin-left:1%;
    background-color: transparent;
    &:hover{
        cursor: pointer;
    }
    /*LAYER*/
    position: absolute;
    z-index: 2;
`;
const Image = styled.img`
    width:48%;
    height:89.5%;
    margin-top: 1.8%;
    margin-left:1%;
    /*LAYER*/
    position: absolute;
    z-index: 1;
`;
const WriteText =styled.textarea`
    width:40%;
    height:70%;
    margin-top: 5%;
    margin-left:55%;
    /*스타일*/
    border: none;
    outline:none;
    resize: none;
    overflow: hidden; /* 스크롤바 숨김 */
    /*텍스트 설정*/
    font-size: 1.5vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        overflow: hidden; /* 스크롤바 숨김 */
        /*텍스트 설정*/
        font-size: 1.5vw;
        font-family: gangwonedusaeeum, sans-serif; //대체폰트
    }  
`;
const LeftPageNumber=styled.span`
    left:3%;
    bottom:7%;
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
    right:3%;
    bottom:7%;
    //padding:2%;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 4;
    align-content: center;
`;
const WriteDrawBookForm = () => {

    //textarea 글자수 제한(높이가 기준)
    const [text, setText] = useState('');
    const handleInput=(e)=>{
        const textarea = e.target;
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
        if(!isOverflowing){
            setText(textarea.value);
        }
    };

    //책 표지 버튼(WriteMenuBar.js)눌렀을 때 콜백함수
    const [coverVisible, setCoverVisible] = useState(false);
    const handleCoverBtnClick = (data) => {
        // WriteMenuBar 클릭 시 NovelCoverOverlay 보이도록 설정
        setCoverVisible(!coverVisible);
        //이미지 생성 화면이 출력돼있을 경우 올라감
        setVisible(false);
    };

    //imageOverlayItem 상태 관리
    const {stableStyle,setStableStyle}=useContext(Context);//contextAPI: style-preset
    const {stablePrompt,setStablePrompt} = useContext(Context);//contextAPI: prompt
    const {setStableImage} = useContext(Context);//contextAPI: prompt
    //textarea, image, imageAddBtn, imageDeleteBtn 상태 관리
    const [imageUrl, setImageUrl] = useState('');//image
    const [imagePrompt, setImagePrompt] = useState(stablePrompt);//prompt
    const [imageStyle, setLImageStyle] = useState(stableStyle);//style


    //이미지 생성 버튼 클릭 -> background animation
    const [visible, setVisible] = useState(false);
    const toggleOverlay=()=> {
        setVisible(!visible);
        if(imageUrl===''){
            setStableImage('/resourcesPng/writeNovelPage/imageShowPanel.png');
        }else{
            setStableImage(imageUrl);
        }
        setStableStyle(imageStyle);
        setStablePrompt(imagePrompt);
    };

    //생성된 이미지 가져와서 image에 적용
    const handleImageRegister=(imageUrl)=>{
        //context 값 저장
        setImageUrl(imageUrl);
        setImagePrompt(stablePrompt);
        setLImageStyle(stableStyle);
    }

    //왼쪽 삭제 버튼
    const handleDeleteImage=()=>{
        setText('');//텍스트 초기화
        setImageUrl('');//이미지 초기화
        setLImageStyle('fantasy-art');
        setImagePrompt('');
    }
    return (
        <div>
            <Helmet>
                <title>WriteDrawBook</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>

            <Wrapper>
                <WriteMenuBar onClick={handleCoverBtnClick}></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn></BeforePageBtn>
                    <MainContentsContainer>
                        <ImageCreateContainer>
                        <CreateImageButton onClick={toggleOverlay}></CreateImageButton>
                        <DeleteImageButton onClick={handleDeleteImage}></DeleteImageButton>
                    </ImageCreateContainer>
                        <WriteContainer>
                            {imageUrl && <Image src={imageUrl} alt="Selected Image" />}
                            <ImageCreateBtn onClick={toggleOverlay}></ImageCreateBtn>
                            <WriteText
                                placeholder="왼쪽 페이지는 그림을, 오른쪽 페이지는 글을 작성해보세요"
                                value={text}
                                onInput={handleInput}
                            ></WriteText>
                            <LeftPageNumber>2</LeftPageNumber>
                            <RightPageNumber>3</RightPageNumber>
                        </WriteContainer>
                    </MainContentsContainer>
                    <AfterePageBtn></AfterePageBtn>
                </BodyContainer>
                <ImageOverlay  visible={visible} setVisible={setVisible} onImageRegister={handleImageRegister}></ImageOverlay>
                <NovelCoverOverlay visible={coverVisible} setVisible={setCoverVisible}></NovelCoverOverlay>
            </Wrapper>
        </div>
    );
};

export default WriteDrawBookForm;
