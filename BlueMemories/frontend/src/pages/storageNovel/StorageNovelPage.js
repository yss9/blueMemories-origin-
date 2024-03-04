import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';
import { BookListItemContainer } from '../../components/BookList';
import { StoargeTextBtnContainer } from '../../components/StorageTextBtn';

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction:column;
    background-image: url("/resourcesPng/storagePage/background_mountain.png"),
    linear-gradient(rgba(255, 242, 211, 1),rgba(255,242,211,0.84),rgba(255,242,211,0.62),rgba(255,242,211,0.41));
    background-size: cover;
`;
const ContentContainer=styled.div`
    height: 80%;
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 3%;
`;
//-------------------------------------------------------------

//가운데 아이템 컨테이너 베이지배경
const ListBackgroundImg=styled.div`
    width:47%;
    height: 34vw;
    background-image: url("/resourcesPng/storagePage/storage_list_background.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
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
                    <StoargeTextBtnContainer></StoargeTextBtnContainer>
                    <ListBackgroundImg>
                        <BookListItemContainer></BookListItemContainer>
                    </ListBackgroundImg>
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageNovelForm;
