import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { BookWriteMenuBar } from '../../components/WriteMenuBar';
import BookCoverOverlay from "./components/coverOverlay/DrawBookCoverOverlay";
import React, {useEffect, useState} from 'react';
import ImageOverlay from "./components/imageOverlay/ImageOverlay";
import {useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();
    const location = useLocation();
    const { bookId } = location.state || { bookId: null };  //navigate로 받은 bookId
    //bookContents list 저장
    const [bookContents,setBookContents]=useState([]);
    const [pages,setPages]=useState([{pageNumber:1,textContent:"",image:""},{pageNumber:2,textContent:"",image:""}])
    //텍스트, 이미지, 페이지 번호 초기화
    const [currentPage, setCurrentPage]=useState(null); //books의 index역할
    const [text, setText]=useState('');
    const [image, setImage]=useState(null);
    const [pageNumberA, setPageNumberA]=useState(1);
    const [pageNumberB, setPageNumberB]=useState(2);
    const [saveTimeout,setSaveTimeout]=useState(null); //textarea 타임아웃 설정
    //페이지 넘김 버튼 비/활성화
    const [nextPageBtnActive, setNextPageBtnActive] = useState(false);
    const [prevPageBtnActive, setPrevPageBtnActive] = useState(false);
    //이미지 오버레이 상태
    const [imageOverlayState, setImageOverlayState]=useState(false);
    //책 표지 오버레이 상태
    const [coverOverlayState, setCoverOverlayState] = useState(false);
    // 책 표지 초기값 이후 수정된 값들을 저장
    const [cover, setCover]=useState(null);

    /**
     * bookContents db에서 book id와 일치하는 값들 가져오기(List)
     * 'bookContents[]' 에 저장
     * pages = bookContents
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
                setBookContents(data); //db에서 bookContent 가져오기
            };
            fetchContents();
        }
    },[bookId]);
    /** bookContents가 변경될 때 'currentPage'초기화 작업 수행
     * bookContents의 가장 마지막 페이지 번호로 초기화 해야함
     * currentPage = bookContents.length - 2 // curentPage는 0부터 시작
     */
    useEffect(() => {

        if (bookContents.length > 0) { //이전 작성내용이 있는 상태
            setCurrentPage(bookContents.length - 2);
            setPages(bookContents);

        } else { //이전 작성내용이 없는 상태
            setCurrentPage(0);
        }
    }, [bookContents]); // bookContents가 변경될 때 실행

    /** [text, image, pageNumber]변수들 'pages[currentPage]' 값으로 초기화
     * (가장 마지막으로 작성된 페이지)
     * 이전에 작성된 내용이 있는 경우에만 실행
     *///&&currentPage+2<=bookContents.length
    useEffect(()=>{
        if(currentPage!==null&&pages!==null){
            const handleSetImage=async () => { //왼쪽 페이지 image 초기화
                if (pages[currentPage].image) {
                    setImage(`data:image/jpeg;base64,${pages[currentPage].image}`);
                } else {
                    setImage('');
                }
                setPageNumberA(pages[currentPage].pageNumber);
            };
            const handleSetText=()=> { //오른쪽 페이지 text 초기화
                if(pages[currentPage+1].textContent){
                    setText(pages[currentPage+1].textContent);
                }
                else{
                    setText('');
                }
                setPageNumberB(pages[currentPage+1].pageNumber);
            };
            handleSetImage();
            handleSetText();
        }
    },[currentPage,bookContents]);

    /** [pages.textContent, pages.image 실시간 저장]
     * --textarea 입력 값 변경 핸들러--
     * textarea에 글자가 변경되면 내용 임시 저장 배열에 text 저장
     * textarea 높이 초과하지 않는지 검사
     * 저장된 image는 초기화
     * 타임아웃을 설정하여 과부하 문제 방지
     * index : currentPage 왼/오 구분하기 위함
     * setText : setTextA || setTextB 구분하기 위함
     **/
    const handleTextChange = (e, index) => {
        const textarea = e.target;
        const value = e.target.value; //텍스트 입력값 저장
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight; //textarea 높이 초과 검토
        if(!isOverflowing) {//높이 초과 안한다면
            setText(textarea.value);//
            //타임아웃 설정
            if (saveTimeout) {
                clearTimeout(saveTimeout); // 이전에 설정된 타이머가 있으면 이를 취소 -> 불필요한 배열 업데이트를 방지
            }
            setSaveTimeout(setTimeout(() => { // 새로운 타이머 설정 -> 500ms 이후 지정된 함수 실행
                setPages(prevPages => {
                    const updatedPages = [...prevPages]; //이전 상태의 모든 요소를 새로운 배열에 복사
                    updatedPages[index].textContent = value; // text 저장
                    updatedPages[index].image = '';
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
     *      if(양쪽 페이지에 글, 그림이 써졌다면){
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
                    //왼쪽 이미지, 오른쪽 텍스트 있으면 다음 페이지 버튼 활성화
                    if((image) && (text)){
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
    },[currentPage,pages,image,text]);

    /**
     * pageNextBtn 클릭했을 때 실행되는 함수
     * if(currentPage+2<bookContents.length){currentPage+2}
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
        }
    }
    /**
     * pagePrevBtn 클릭했을 때 실행되는 함수
     * currentPage-- 해줌.
     */
    const handlePrevPageSetting=()=>{
        setCurrentPage(currentPage-2);
    }

    //왼쪽 '삭제' 버튼 (이미지 삭제)
    const handleDeleteContents=()=>{
        pages[currentPage].image='';
        setImage('');
    }


    /** [이미지 추가 버튼]
     * imageOverlay 내림
     * imageOverlay의 [prompt, style, image] 전부 초기화
     */
    const handleImageOverlay=()=>{
        setImageOverlayState(true);
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
        pages[currentPage].image=image64.split(',')[1]; // "data:image/jpeg;base64," 부분을 제거하고 저장
        setImage(url);
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
     * pages[] 내용을 bookContent에 덮어 씌우기
     * & cover[] 내용을 book에 덮어 씌우기 + stastus: status 로 변경
     * status 매개변수 값에 따라 in_complete or complete
     * */
    function base64ToBlob(base64, mime) {
        const byteChars = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteChars.length; offset += 512) {
            const slice = byteChars.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: mime });
    }
    const handleSave = async (status) => {
        try {
            for (const page of pages) {
                const formData = new FormData();
                formData.append('bookId', bookId);
                pages.forEach((page, index) => {
                    formData.append('pageNumber', page.pageNumber);
                    formData.append('textContent', page.textContent);
                    if(page.image){
                        const blob = base64ToBlob(page.image, 'image/jpeg'); // 이미지 형식에 맞게 수정
                        formData.append('image', blob);
                    }else{
                        formData.append('image', new Blob([]));
                    }
                    console.log(page.pageNumber+" "+page.textContent+" "+page.image)
                });



            const response = await axios.post(`http://localhost:8080/api/bookContents/replace`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status !== 200) {
                    throw new Error('Failed to save book contents');
                }
       }
            console.log('Book contents saved successfully');
            console.log('title: '+cover.title);
            // Book DB
            // => cover[] 내용 + IN_COMPLETED로 변경
            const formData = new FormData();
            formData.append('bookId', bookId);
            formData.append('title', cover.title);
            formData.append('titleX', cover.titleX);
            formData.append('titleY', cover.titleY);
            formData.append('titleSize', cover.titleSize);
            formData.append('coverImage', cover.coverImage);
            formData.append('status', status);

            const statusResponse = await axios.post(`http://localhost:8080/api/books/updateBookCover`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (statusResponse.status === 200) {
                console.log('Book status updated successfully');
            } else {
                throw new Error('Failed to update book status');
            }

        } catch (error) {
            console.error('Error saving book contents:', error);
        }
    };

    const handleSaveInComplete = async () => {
        await handleSave('IN_COMPLETED'); // 책 작성 중
    }
    /**['책 완성']
     * pages[] 내용을 bookContent에 덮어 씌우기 &
     * & cover[] 내용을 book에 덮어 씌우기 + stastus: COMPLETED 로 변경
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
                navigate("/storageDrawBook");
            }
        }

    }

    return (
        <div>
            <Helmet>
                <title>WriteDrawBook</title>
                <meta name="description" content="BlueMemories WriteBook Page"/>
            </Helmet>

            <Wrapper>
                <BookWriteMenuBar visible={handleCoverBtnClick} onInComplete={handleSaveInComplete} onComplete={handleSaveComplete} bookId={bookId}></BookWriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn isActive={prevPageBtnActive} disabled={!prevPageBtnActive} onClick={handlePrevPageSetting}></BeforePageBtn>
                    <MainContentsContainer>
                        <ImageCreateContainer>
                        <CreateImageButton onClick={handleImageOverlay}></CreateImageButton>
                        <DeleteImageButton onClick={handleDeleteContents}></DeleteImageButton>
                    </ImageCreateContainer>
                        <WriteContainer>
                            {image && image !== 'null' && image !== '' && <Image src={image} alt="Selected Image" />}
                            <ImageCreateBtn onClick={handleImageOverlay}></ImageCreateBtn>
                            <WriteText
                                placeholder="왼쪽 페이지는 그림을, 오른쪽 페이지는 글을 작성해보세요"
                                value={text}
                                onChange={(e) => handleTextChange(e, currentPage+1)}
                            ></WriteText>
                            <LeftPageNumber>{pageNumberA}</LeftPageNumber>
                            <RightPageNumber>{pageNumberB}</RightPageNumber>
                        </WriteContainer>
                    </MainContentsContainer>
                    <AfterePageBtn isActive={nextPageBtnActive} disabled={!nextPageBtnActive} onClick={handleNextPageSetting}></AfterePageBtn>
                </BodyContainer>
                <ImageOverlay
                    visible={imageOverlayState}
                    setVisible={setImageOverlayState}
                    onImageRegister={handleImageOverlaySrc}></ImageOverlay>
                <BookCoverOverlay  visible={coverOverlayState} setVisible={setCoverOverlayState} bookId={bookId} cover={cover} setCover={setCover}></BookCoverOverlay>
            </Wrapper>
        </div>
    );
};

export default WriteDrawBookForm;
