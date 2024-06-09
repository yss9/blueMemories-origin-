import {Helmet} from "react-helmet";
import styled, {css} from 'styled-components';
import React, {useState, useEffect, useContext} from 'react';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import ImageOverlay from "./components/imageOverlay/ImageOverlay";
import NovelCoverOverlay from "./components/coverOverlay/NovelCoverOverlay";
import {Context} from "../Context/Context";
import {useLocation} from "react-router";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const location = useLocation();
    const { novelId } = location.state || { novelId: null };  //navigate로 받은 novelId
    //novelContents list 저장
    const [novelContents,setNovelContents]=useState([]);
    const [pages,setPages]=useState([{pageNumber:1,textContent:"",image:""},{pageNumber:2,textContent:"",image:""}])
    //텍스트, 이미지, 페이지 번호 초기화
    const [currentPage, setCurrentPage]=useState(null); //novels의 index역할
    const [textA, setTextA]=useState('');
    const [textB, setTextB]=useState('');
    const [imageA, setImageA]=useState(null);
    const [imageB, setImageB]=useState(null);
    const [pageNumberA, setPageNumberA]=useState(1);
    const [pageNumberB, setPageNumberB]=useState(2);
    const [saveTimeout,setSaveTimeout]=useState(null); //textarea 타임아웃 설정
    //해당 페이지가 이미지인지 텍스트인지 상태 확인 (false: 텍스트 상태, true: 이미지 상태)
    const [stateImageA, setStateImageA]=useState(false);
    const [stateImageB, setStateImageB]=useState(false);
    //페이지 넘김 버튼 비/활성화
    const [nextPageBtnActive, setNextPageBtnActive] = useState(false);
    const [prevPageBtnActive, setPrevPageBtnActive] = useState(false);
    //이미지 오버레이 상태
    const [imageOverlayState, setImageOverlayState]=useState(false);
    const [selectCreateBtn, setSelectCreateBtn]=useState('left');
    //책 표지 오버레이 상태
    const [coverOverlayState, setCoverOverlayState] = useState(false);
    // 책 표지 초기값 이후 수정된 값들을 저장
    const [cover, setCover]=useState(null);
    /**
     * novelContents db에서 novel id와 일치하는 값들 가져오기(List)
     * 'novelContents[]' 에 저장
     * pages = novelContents
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
                setNovelContents(data); //db에서 novelContent 가져오기
            };
            fetchContents();
        }
    },[novelId]);
    /** novelContents가 변경될 때 'currentPage'초기화 작업 수행
     * novelContents의 가장 마지막 페이지 번호로 초기화 해야함
     * currentPage = novelContents.length - 2 // curentPage는 0부터 시작
     */
    useEffect(() => {
        if (novelContents.length > 0) { //이전 작성내용이 있는 상태
            setCurrentPage(novelContents.length - 2);
            setPages(novelContents);

        } else { //이전 작성내용이 없는 상태
            setCurrentPage(0);
        }
    }, [novelContents]); // novelContents가 변경될 때 실행

    /** [text, image, pageNumber]변수들 'pages[currentPage]' 값으로 초기화
     * (가장 마지막으로 작성된 페이지)
     * 이전에 작성된 내용이 있는 경우에만 실행
     *///&&currentPage+2<=novelContents.length
    useEffect(()=>{
        if(currentPage!==null&&pages!==null){
            const handleSetTextAndImageA=()=>{ //왼쪽 페이지 text, image 초기화
                if(pages[currentPage].textContent){
                    setTextA(pages[currentPage].textContent);
                    setStateImageA(false); //페이지 상태 텍스트로 변경
                }
                else{
                    setTextA('');
                }
                if(pages[currentPage].image){
                    setImageA(`data:image/jpeg;base64,${pages[currentPage].image}`);
                    setStateImageA(true); //페이지 상태 이미지로 변경

                }
                else{
                    setImageA('');
                    setStateImageA(false); //페이지 상태 텍스트로 변경
                }
                setPageNumberA(pages[currentPage].pageNumber);
            };
            const handleSetTextAndImageB=()=> { //오른쪽 페이지 text, image 초기화
                if(pages[currentPage+1].textContent){
                    setTextB(pages[currentPage+1].textContent);
                    setStateImageB(false); //페이지 상태 텍스트로 변경
                }
                else{
                    setTextB('');
                }
                if(pages[currentPage+1].image){
                    setImageB(`data:image/jpeg;base64,${pages[currentPage+1].image}`);
                    setStateImageB(true); //페이지 상태 이미지로 변경
                }
                else{
                    setImageB('');
                    setStateImageB(false); //페이지 상태 텍스트로 변경
                }
                setPageNumberB(pages[currentPage+1].pageNumber);
            };
            handleSetTextAndImageA();
            handleSetTextAndImageB();
        }
    },[currentPage]);

    /** [pages.textContent, pages.image 실시간 저장]
     * --textarea 입력 값 변경 핸들러--
     * textarea에 글자가 변경되면 내용 임시 저장 배열에 text 저장
     * textarea 높이 초과하지 않는지 검사
     * 저장된 image는 초기화
     * 타임아웃을 설정하여 과부하 문제 방지
     * index : currentPage 왼/오 구분하기 위함
     * setText : setTextA || setTextB 구분하기 위함
     **/
    const handleTextChange = (e, index, setText) => {
        const textarea = e.target;
        const value = e.target.value; //텍스트 입력값 저장
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight; //textarea 높이 초과 검토
        if(!isOverflowing) {//높이 초과 안한다면
            setText(textarea.value);//해당 변수에 텍스트 값 저장(setTextA || setTextB)
            //타임아웃 설정
            if (saveTimeout) {
                clearTimeout(saveTimeout); // 이전에 설정된 타이머가 있으면 이를 취소 -> 불필요한 배열 업데이트를 방지
            }
            setSaveTimeout(setTimeout(() => { // 새로운 타이머 설정 -> 500ms 이후 지정된 함수 실행
                setPages(prevPages => {
                    const updatedPages = [...prevPages]; //이전 상태의 모든 요소를 새로운 배열에 복사
                    updatedPages[index].textContent = value; // text 저장
                    updatedPages[index].image = ''; // 텍스트가 입력되면 이미지 초기화
                    return updatedPages;
                });
            }, 100));
        }
    };

    /** [페이지 이전/다음 버튼 설정]
     * --pageNextBtn 설정--
     * if(현재 페이지 + 2 < pages.length){ //이전에 작성한 내용이 있음
     *  다음 페이지 버튼 활성화
     *  }
     *  else{
     *      if(양쪽 페이지에 글이나 그림이 써졌다면){
     *          다음 페이지 버튼 활성화
     *      }else{
     *          다음 페이지 비활성화
     *      }
     *  }
     * --pagePrevBtn 설정--
     * if(현재 페이지 === 0 ) => prevBtn 비활성화
     */
    useEffect(()=>{
        if(currentPage!==null&&pages!==null){
            const handleNextPageButton=()=>{
                if(currentPage + 2 < pages.length){
                    setNextPageBtnActive(true);
                }
                else{
                    if((pages[currentPage].textContent || (stateImageA)) && (pages[currentPage+1].textContent || (stateImageB))){
                        setNextPageBtnActive(true);
                    }else{
                        setNextPageBtnActive(false);
                    }
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
    },[currentPage,pages,stateImageB,stateImageA]);

    /**
     * pageNextBtn 클릭했을 때 실행되는 함수
     * if(currentPage+2<novelContents.length){currentPage+2}
     * else { 
     * pages 새로운 페이지(배열) 2개 추가;
     * 내용 및 변수 상태 초기화(글, 그림);
     * => useEffect handleSetTextAndImageA, handleSetTextAndImageB
     * }
     */
    const handleNextPageSetting=()=>{
        if(currentPage+2<pages.length){ //이전 작성 내용이 있는 경우
            setCurrentPage(currentPage+2);
        }
        else{ //새로운 다음 페이지로 넘어감
            setPages(prevPages =>[
                ...prevPages,
                {pageNumber:prevPages.length+1,textContent:"",image:""},
                {pageNumber:prevPages.length+2,textContent:"",image:""}
            ]);
            setCurrentPage(currentPage+2);
            setStateImageA(false); //페이지 상태 텍스트로 변경
            setStateImageB(false); //페이지 상태 텍스트로 변경
        }
    }
    /**
     * pagePrevBtn 클릭했을 때 실행되는 함수
     * currentPage-- 해줌.
     */
    const handlePrevPageSetting=()=>{
        setCurrentPage(currentPage-2);
    }

    //왼쪽 '삭제' 버튼 (내용 삭제)
    const handleDeleteContentsA=()=>{
        pages[currentPage].textContent='';
        pages[currentPage].image='';
        setTextA('');
        setImageA('');
        setStateImageA(false); //페이지 상태 텍스트로 변경
    }
    //오른쪽 '삭제' 버튼 (내용 삭제)
    const handleDeleteContentsB=()=>{
        pages[currentPage+1].textContent='';
        pages[currentPage+1].image='';
        setTextB('');
        setImageB('');
        setStateImageB(false); //페이지 상태 텍스트로 변경
    }

    /** [이미지 추가 버튼]
     * imageOverlay 내림
     * imageOverlay의 [prompt, style, image] 전부 초기화
     */
    const handleImageOverlayA=()=>{
        if(textA.trim()==='') {  //글자가 없을때만 이미지 추가 오버레이 내림
            setImageOverlayState(true);
            setSelectCreateBtn('left');
        }
        else{
            alert('텍스트를 지우고 다시 시도해주세요.');
        }
    }
    const handleImageOverlayB=()=>{
        if(textB.trim()==='') {  //글자가 없을때만 이미지 추가 오버레이 내림
            setImageOverlayState(true);
            setSelectCreateBtn('right');
        }
        else{
            alert('텍스트를 지우고 다시 시도해주세요.');
        }
    }

    /** [ImageOverlay에서 매개변수 전달받아 image src 설정]
     * pages[currentPage].image 도 매개변수 값으로 update 해준다
     * if(왼쪽 이미지 생성 버튼){
     *     imageOverlay.js에서 생성된 이미지는 왼쪽 이미지에 설정
     * }
     * else{
     *     오른쪽 이미지에 설정
     * }
     */
    const handleImageOverlaySrc=async (file,url)=>{
        const image64 = await convertFileToBase64(file);
        if(selectCreateBtn==='left'){
            pages[currentPage].image=image64.split(',')[1]; // "data:image/jpeg;base64," 부분을 제거하고 저장
            setImageA(url);
            setStateImageA(true);
        }
        else{
            pages[currentPage+1].image=image64.split(',')[1];
            setImageB(url);
            setStateImageB(true);
        }
    }
    //file => base64 형변환
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    /** [책 표지 visible 설정]
     * 책 완성 버튼 눌렀을 때 alert -> coverOverlay visible
     */
    const handleCoverBtnClick = (data) => {
        // 책 표지 overlay 내림
        setCoverOverlayState(true);
        //이미지 생성 화면 올림
        setImageOverlayState(false);
    };

    /**['임시저장', '저장하고 나가기'] && ['책 완성']
     * pages[] 내용을 novelContent에 덮어 씌우기
     * & cover[] 내용을 novel에 덮어 씌우기 + stastus: status 로 변경
     * status 매개변수 값에 따라 in_complete or complete
     * */
    const handleSave = async (status) => {
        try {
            for (const page of pages) {
                const formData = new FormData();
                formData.append('novelId', novelId);
                pages.forEach((page, index) => {
                    formData.append('pageNumber', page.pageNumber);
                    formData.append('textContent', page.textContent);
                    formData.append('image', page.image || new Blob([]));
                });

                const response = await axios.post(`http://localhost:8080/api/novelContents/replace`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status !== 200) {
                    throw new Error('Failed to save novel contents');
                }
            }
            console.log('Novel contents saved successfully');
            // Novel DB
            // => cover[] 내용 + IN_COMPLETED로 변경
            console.log("title: "+cover.title);
            const formData = new FormData();
            formData.append('novelId', novelId);
            formData.append('title', cover.title);
            formData.append('titleX', cover.titleX);
            formData.append('titleY', cover.titleY);
            formData.append('titleSize', cover.titleSize);
            formData.append('coverImage', cover.coverImage);
            formData.append('status', status);

            const statusResponse = await axios.post(`http://localhost:8080/api/novels/updateNovelCover`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (statusResponse.status === 200) {
                console.log('Novel status updated successfully');
            } else {
                throw new Error('Failed to update novel status');
            }

        } catch (error) {
            console.error('Error saving novel contents:', error);
        }
    };

    const handleSaveInComplete = async () => {
        await handleSave('IN_COMPLETED'); // 책 작성 중
    }
    /**['책 완성']
     * pages[] 내용을 novelContent에 덮어 씌우기 &
     * & cover[] 내용을 novel에 덮어 씌우기 + stastus: COMPLETED 로 변경
     *
     * if(둘다 수정 x 면 ){
     *     알림창 "제목과 표지를 생성해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else if(cover_image만 수정 x 면){
     *     알림창 "표지를 생성해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else if(title만 수정 x 면){
     *     알림창 "제목을 입력해 주세요." => 확인버튼 => 책 표지 cover visible
     * }
     * else (전부 수정되었다면){
     *     "완성한 책은 수정할 수 없습니다. 책 작성을 완료하시겠습니까?"
     * }
     */
    const handleSaveComplete = async () => {
        if (cover.title === 'untitled' && (cover.coverImage === null)) {
            alert('책제목과 책표지를 생성해 주세요.');
            setCoverOverlayState(true);
        } else if (!cover.coverImage || cover.coverImage === '') {
            alert('책표지를 생성해 주세요.');
            setCoverOverlayState(true);
        } else if (cover.title === 'untitled'){
            alert('책제목을 입력해 주세요.');
            setCoverOverlayState(true);
        }
        else {
            const userConfirmed = window.confirm("완성한 책은 수정할 수 없습니다. 책 작성을 완료하시겠습니까?");
            if (userConfirmed) { //"확인 버튼 클릭한 경우"
                await handleSave('COMPLETED'); // 책 완성
                navigate("/storageNovel");
            }
        }

    }


    return (
        <div>
            <Helmet>
                <title>WriteNovel</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>
            <Wrapper>
                <WriteMenuBar visible={handleCoverBtnClick} onInComplete={handleSaveInComplete} onComplete={handleSaveComplete} novelId={novelId} ></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn isActive={prevPageBtnActive} disabled={!prevPageBtnActive} onClick={handlePrevPageSetting}></BeforePageBtn>
                    <WriteContainer>
                        <LeftImageCreateContainer>
                            <CreateImageButton onClick={handleImageOverlayA}></CreateImageButton>
                            <DeleteImageButton onClick={handleDeleteContentsA}></DeleteImageButton>
                        </LeftImageCreateContainer>
                        <WritePage></WritePage>
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            value={textA}
                            onChange={(e) => handleTextChange(e, currentPage, setTextA)}
                            hidden={stateImageA}
                           ></WriteText>
                        {imageA && imageA !== 'null' && imageA !== '' && <Image src={imageA} alt="Image" />}
                        <WriteText
                            placeholder="글을 작성하거나 그림을 생성해보세요"
                            marginLeft={'53.2%'}
                            value={textB}
                            onChange={(e) => handleTextChange(e, currentPage+1, setTextB)}
                            hidden={stateImageB}
                           ></WriteText>
                        {imageB && imageB !== 'null' && imageB !== '' && <Image marginLeft={'51.7%'} src={imageB} alt="Image" />}
                        <RightImageCreateContainer>
                            <CreateImageButton onClick={handleImageOverlayB}></CreateImageButton>
                            <DeleteImageButton onClick={handleDeleteContentsB}></DeleteImageButton>
                        </RightImageCreateContainer>
                        <LeftPageNumber>{pageNumberA}</LeftPageNumber>
                        <RightPageNumber>{pageNumberB}</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive} onClick={handleNextPageSetting}></AfterePageBtn>
                </BodyContainer>
                <ImageOverlay
                    visible={imageOverlayState}
                    setVisible={setImageOverlayState}
                    onImageRegister={handleImageOverlaySrc}
                ></ImageOverlay>
                <NovelCoverOverlay visible={coverOverlayState} setVisible={setCoverOverlayState} novelId={novelId} cover={cover} setCover={setCover}></NovelCoverOverlay>
            </Wrapper>
        </div>
    );
};

export default WriteNovelForm;

