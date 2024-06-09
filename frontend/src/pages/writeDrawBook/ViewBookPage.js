import {Helmet} from "react-helmet";
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import {BookViewMenuBar} from '../../components/WriteMenuBar';
import {useLocation} from "react-router";
import axios from "axios";
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
    background: url(${props => props.isActive ? "/resourcesPng/writeNovelPage/beforePageBtn.png" : "/resourcesPng/writeNovelPage/disabledBeforePageBtn.png"}) no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
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
const Image = styled.img`
    width:48%;
    height:89.5%;
    margin-top: 1.8%;
    margin-left:1%;
    /*LAYER*/
    position: absolute;
    z-index: 1;
`;
const WriteText =styled.div`
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

const ViewBookForm = () => {
    const location = useLocation();
    const {bookId}=location.state || {}; //navigate로 받은 bookId
    //bookContents list 저장
    const [bookContents,setBookContents]=useState([]);
    //텍스트, 이미지, 페이지 번호 초기화
    const [currentPage, setCurrentPage]=useState(0); //books의 index역할
    const [text, setText]=useState('');
    const [image, setImage]=useState(null);
    const [pageNumberA, setPageNumberA]=useState(1);
    const [pageNumberB, setPageNumberB]=useState(2);
    //페이지 넘김 버튼 비/활성화
    const [nextPageBtnActive, setNextPageBtnActive] = useState(false);
    const [prevPageBtnActive, setPrevPageBtnActive] = useState(false);

    /**
     * bookContents db에서 book id와 일치하는 값들 가져오기(List)
     * 'bookContents[]' 에 저장
     */
    const fetchBookContents = async (bookId)=>{
        try{
            const response = await axios.get(`http://localhost:8080/api/bookContents/view?bookId=${bookId}`);
            console.log('Success fetching book contents');
            return response.data;
        }catch(error){
            console.log('Error fetching book contents: ',error);
            return [];
        }
    }
    useEffect(()=>{
        if(bookId){
            const fetchContents = async () =>{
                const data =await fetchBookContents(bookId);
                setBookContents(data);
            };
            fetchContents();
        }
    },[bookId]);
    /**
     * [text, image, pageNumber]변수들 'bookContents[]' 값으로 초기화
     */
    useEffect(()=>{
        if(bookContents.length>0){
            const handleSetImage=async () => {
                if (bookContents[currentPage].image) {
                    setImage(`data:image/jpeg;base64,${bookContents[currentPage].image}`);
                } else {
                    setImage('');
                }
                setPageNumberA(bookContents[currentPage].pageNumber);
            };
            const handleSetText=()=> {
                setText(bookContents[currentPage + 1]?.textContent || '');
                setPageNumberB(bookContents[currentPage+1].pageNumber);
            };
            handleSetImage();
            handleSetText();
        }
    },[currentPage,bookContents,image,text]);
    /**
     * pageNextBtn 설정
     * if(현재 페이지 + 2 < bookContents.length) => nextBtn 활성화
     * ---------------------------
     * pagePrevBtn 설정
     * if(현재 페이지 === 0 ) => prevBtn 비활성화
     * ---------------------------
     * 현재 페이지값이 갱신될때마다 실행되어야 하므로 useEffect 사용
     */
    useEffect(()=>{
        if(currentPage+1){
            const handleNextPageButton=()=>{
                if(currentPage + 2< bookContents.length){ //currentPage는 0부터 시작이기 때문에 2를 더해줌
                    setNextPageBtnActive(true);
                }
                else{
                    setNextPageBtnActive(false);
                }
            };
            const handlePrevPageButton=()=>{
                if(currentPage === 0){ //currentPage가 0이면 이전 페이지 버튼 비활성화
                    setPrevPageBtnActive(false);
                }
                else{
                    setPrevPageBtnActive(true);
                }
            };
            handleNextPageButton();
            handlePrevPageButton();
        }
    },[currentPage,bookContents]);
    /**
     * pageNextBtn 클릭했을 때 실행되는 함수
     * currentPage++ 해줌.
     */
    const handleNextPageSetting=()=>{
        setCurrentPage(currentPage+2);
    }
    /**
     * pagePrevBtn 클릭했을 때 실행되는 함수
     * currentPage-- 해줌.
     */
    const handlePrevPageSetting=()=>{
        setCurrentPage(currentPage-2);
    }
    return (
        <div>
            <Helmet>
                <title>WriteDrawBook</title>
                <meta name="description" content="BlueMemories WriteBook Page"/>
            </Helmet>

            <Wrapper>
                <BookViewMenuBar></BookViewMenuBar>
                <BodyContainer>
                    <BeforePageBtn isActive={prevPageBtnActive} disabled={!prevPageBtnActive} onClick={handlePrevPageSetting}></BeforePageBtn>
                    <MainContentsContainer>
                        <WriteContainer>
                            {image && image !== 'null' && image !== '' && <Image src={image} alt="Selected Image" />}
                            <WriteText>{text}</WriteText>
                            <LeftPageNumber>{pageNumberA}</LeftPageNumber>
                            <RightPageNumber>{pageNumberB}</RightPageNumber>
                        </WriteContainer>
                    </MainContentsContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive} onClick={handleNextPageSetting}></AfterePageBtn>
                </BodyContainer>
            </Wrapper>
        </div>
    );
};
export default ViewBookForm;

