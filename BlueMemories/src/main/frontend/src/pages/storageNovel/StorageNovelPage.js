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
    height: 89.3%;
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

`;
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
const ListContainer=styled.div`
    width:47%;
    height: 90%;
    background-image: url("/resourcesPng/storagePage/storage_list_background.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
                    <ListContainer></ListContainer>
                </ContentContainer>
                
            </Wrapper>
        </div>
    );
};

export default StorageNovelForm;
