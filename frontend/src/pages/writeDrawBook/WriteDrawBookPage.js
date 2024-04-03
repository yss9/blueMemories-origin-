import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import NovelCoverOverlay from "../writeDrawBook/components/NovelCoverOverlay";
import React, {useState} from 'react';
import ImageOverlay from "../writeDrawBook/components/ImageOverlay";

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
    width:47%;
    height:87.5%;
    margin-top: 2.2%;
    margin-left:1.5%;
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

    //이미지 생성 background animation
    const [visible, setVisible] = useState(false);
    const toggleOverlay=()=> {
        setVisible(!visible);
    };

    //책 표지 버튼(WriteMenuBar.js)눌렀을 때 콜백함수
    const [coverVisible, setCoverVisible] = useState(false);
    const handleCoverBtnClick = (data) => {
        // WriteMenuBar 클릭 시 NovelCoverOverlay 보이도록 설정
        setCoverVisible(!coverVisible);
    };

    //그림 생성
    const [image,setImage]=useState('');
    const handleImageRegister=(imageUrl)=>{
        console.log('Registered Image URL:', imageUrl); // 콘솔 로그 추가
        setImage(imageUrl);
    }
    //writetext높이 제한해야함 높이 지나면 더이상 글 안써지도록
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
                        <WriteContainer>
                            {image && <Image src={image} alt="Selected Image" />}
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
