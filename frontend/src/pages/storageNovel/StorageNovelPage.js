import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';
import { BookListItemContainer } from '../../components/BookList';
import { StoargeTextBtnContainer } from '../../components/StorageTextBtn';
import {useEffect} from "react";
import axios from "axios";
import {useAuth} from "../Context/AuthContext";

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
    const {user} = useAuth();// userID
    const userID = user.id;
    useEffect(() => {
        const deleteTemporaryNovels = async () => {
            try {
                await axios.delete(`http://localhost:8080/api/novels/deleteTemporary?memberId=${userID}`);
                console.log('Temporary novels deleted successfully');
            } catch (error) {
                console.error('Error deleting temporary novels:', error);
            }
        };
        deleteTemporaryNovels();
    }, [userID]);
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
