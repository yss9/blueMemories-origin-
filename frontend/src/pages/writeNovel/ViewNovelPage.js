import {Helmet} from "react-helmet";
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import {ViewMenuBar } from '../../components/WriteMenuBar';
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
    margin-bottom:1%;
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
const WriteText = styled.div`
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

const ViewNovelForm = () => {
    const location = useLocation();
    const {novelId}=location.state || {}; //navigate로 받은 novelId
    //novelContents list 저장
    const [novelContents,setNovelContents]=useState([]);
    //텍스트, 이미지, 페이지 번호 초기화
    const [currentPage, setCurrentPage]=useState(0); //novels의 index역할
    const [textA, setTextA]=useState('');
    const [textB, setTextB]=useState('');
    const [imageA, setImageA]=useState(null);
    const [imageB, setImageB]=useState(null);
    const [pageNumberA, setPageNumberA]=useState(1);
    const [pageNumberB, setPageNumberB]=useState(2);
    //페이지 넘김 버튼 비/활성화
    const [nextPageBtnActive, setNextPageBtnActive] = useState(false);
    const [prevPageBtnActive, setPrevPageBtnActive] = useState(false);

    /**
     * novelContents db에서 novel id와 일치하는 값들 가져오기(List)
     * 'novelContents[]' 에 저장
     */
    const fetchNovelContents = async (novelId)=>{
        try{
            const response = await axios.get(`http://localhost:8080/api/novelContents/view?novelId=${novelId}`);
            console.log('Success fetching novel contents');
            return response.data;
        }catch(error){
            console.log('Error fetching novel contents: ',error);
            return [];
        }
    }
    useEffect(()=>{
        if(novelId){
            const fetchContents = async () =>{
                const data =await fetchNovelContents(novelId);
                setNovelContents(data);
            };
            fetchContents();
        }
    },[novelId]);
    /**
     * [text, image, pageNumber]변수들 'novelContents[]' 값으로 초기화
     */
    useEffect(()=>{
        if(novelContents.length>0){
            const handleSetTextAndImageA=()=>{
                setTextA(novelContents[currentPage]?.textContent || '');
                if(novelContents[currentPage].image){
                    setImageA(`data:image/jpeg;base64,${novelContents[currentPage].image}`);
                }
                else{
                    setImageA('');
                }
                setPageNumberA(novelContents[currentPage].pageNumber);
            };
            const handleSetTextAndImageB=()=> {
                setTextB(novelContents[currentPage + 1]?.textContent || '');
                if(novelContents[currentPage+1].image){
                    setImageB(`data:image/jpeg;base64,${novelContents[currentPage+1].image}`);
                }
                else{
                    setImageB('');
                }
                setPageNumberB(novelContents[currentPage+1].pageNumber);
            };
            handleSetTextAndImageA();
            handleSetTextAndImageB();
        }
    },[currentPage,novelContents]);
    /**
     * pageNextBtn 설정
     * if(현재 페이지 + 2 < novelContents.length) => nextBtn 활성화
     * ---------------------------
     * pagePrevBtn 설정
     * if(현재 페이지 === 0 ) => prevBtn 비활성화
     * ---------------------------
     * 현재 페이지값이 갱신될때마다 실행되어야 하므로 useEffect 사용
     */
    useEffect(()=>{
        if(currentPage+1){
            const handleNextPageButton=()=>{
                if(currentPage + 2< novelContents.length){ //currentPage는 0부터 시작이기 때문에 2를 더해줌
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
    },[currentPage,novelContents]);
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
                <title>WriteNovel</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>
            <Wrapper>
                <ViewMenuBar></ViewMenuBar>
                <BodyContainer>
                    <BeforePageBtn isActive={prevPageBtnActive} disabled={!prevPageBtnActive} onClick={handlePrevPageSetting}></BeforePageBtn>
                    <WriteContainer>
                        <WritePage></WritePage>
                        <WriteText>{textA}</WriteText>
                        {imageA && imageA !== 'null' && imageA !== '' && <Image src={imageA} alt="Image" />}
                        <WriteText marginLeft={'53.2%'}>{textB}</WriteText>
                        {imageB && imageB !== 'null' && imageB !== '' && <Image marginLeft={'51.7%'} src={imageB} alt="Image" />}
                        <LeftPageNumber>{pageNumberA}</LeftPageNumber>
                        <RightPageNumber>{pageNumberB}</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive} onClick={handleNextPageSetting}></AfterePageBtn>
                </BodyContainer>
            </Wrapper>
        </div>
    );
};
export default ViewNovelForm;

