import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';


const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction:column;
    background-image: url("/resourcesPng/storagePage/background_mountain.png"),
    linear-gradient(rgba(255, 242, 211, 1),rgba(255,242,211,0.84),rgba(255,242,211,0.62),rgba(255,242,211,0.41));
    background-size: cover;
`
//-------------------------------------------------------------
const TextBtnContainer=styled.div`
    /*위치*/
    width:16%;
    height: 34vw;
    margin-right:0.5%;
    margin-top:0.25%;
    /*png*/
    background-image: url("/resourcesPng/storagePage/storage_menubar_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /*item 정렬*/
    display: flex;
    justify-content:space-around;
    flex-direction:column;
    align-items: flex-start;
`;
const TextNickNameContainer=styled.div`

`
//----------------------------------------------------------------------;
const MenuBtn=styled.button`
    /*스타일*/
    border: none;
    font-size: 2vw;
    font-family: gangwonedusaeeum;
    text-align: left;
    /*크기*/
    height: 2.5vw;
    width: 8vw;
    /*색상*/
    color: #FFFFFF;
    background-color:transparent;
`;
//---------------------------------------------------------------
const ListBackgroundImg=styled.div`
    width:47%;
    height: 34vw;
    background-image: url("/resourcesPng/storagePage/storage_list_background.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
`;
//--------------------------------------------
const ListContainer=styled.div`
    width:90%;
    height: 90%;
    margin-left: 5%;
    margin-top: 4%;
   //background-color: blue;
    /*item정렬*/
    display: flex;
    flex-direction: column;
`;
const ListStateText=styled.text`
    font-size: 1.7vw;
    color: #436052;
    font-family: gangwonedusaeeum;
    margin-left:2%;
    margin-top: 1%;
    /*밑줄 옵션*/
    text-decoration: underline;
    text-decoration-thickness: 4%;
    text-underline-position:under;
`;
const BookListContainer=styled.div`
    width: ${(props)=>props.width||'100%'};
    height: ${(props)=>props.height||'30%'};
    margin-top: ${(props)=>props.margin_top||'3%'};
    display: flex;
    justify-content:space-around;
    align-items: center;
    //background-color: yellow;
`;
const AddBookItem=styled.button`
    width: 14%;
    height: 100%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/add_novel_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    //background-color: green;
    border: none;
`;

const BookItemTitle=styled.text`
    width: 13%;
    height: 100%;
    //background-color: red;
    font-size: 1.1vw;
    color: #436052;
    font-family: gangwonedusaeeum;
    text-align: center;
`;
const BookListNextBtn=styled.button`
    width: 4%;
    height: 35%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/book_list_next_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
`;
//------------------------------------------------------------------
const ContentContainer=styled.div`
    height: 80%;
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 3%;
`;
const StorageNovelForm = () => {
    return (
        <div>
            <Helmet>
            <title>StorageNovel</title>
            <meta name="description" content="BlueMemories Introduce Page"/>
            </Helmet>

            <Wrapper>
                <LoggedInNavigationBar></LoggedInNavigationBar>
                <ContentContainer>
                    <TextBtnContainer>
                        <MenuBtn>일기</MenuBtn>
                        <MenuBtn>교환일기</MenuBtn>
                        <MenuBtn>오늘의 추천</MenuBtn>
                        <MenuBtn>소설</MenuBtn>
                        <MenuBtn>그림책</MenuBtn>
                    </TextBtnContainer>
                    <ListBackgroundImg>
                        <ListContainer>
                            <ListStateText>작성 중</ListStateText>
                            <BookListContainer>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <BookListNextBtn></BookListNextBtn>
                            </BookListContainer>
                            <BookListContainer width='92%' height='15%' margin_top='0%'>
                                <BookItemTitle></BookItemTitle>
                                <BookItemTitle>비밀의 정원</BookItemTitle>
                                <BookItemTitle>노르웨이숲의 비밀 사건</BookItemTitle>
                                <BookItemTitle></BookItemTitle>
                                <BookItemTitle></BookItemTitle>
                            </BookListContainer>
                            <ListStateText>작성 완료</ListStateText>
                            <BookListContainer>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <AddBookItem></AddBookItem>
                                <BookListNextBtn></BookListNextBtn>
                            </BookListContainer>
                            <BookListContainer width='92%' height='15%' margin_top='0%'>
                                <BookItemTitle></BookItemTitle>
                                <BookItemTitle>비밀의 정원</BookItemTitle>
                                <BookItemTitle>노르웨이숲의 비밀 사건</BookItemTitle>
                                <BookItemTitle></BookItemTitle>
                                <BookItemTitle></BookItemTitle>
                            </BookListContainer>
                        </ListContainer>
                    </ListBackgroundImg>
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageNovelForm;
