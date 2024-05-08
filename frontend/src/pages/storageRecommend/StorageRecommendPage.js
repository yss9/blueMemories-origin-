import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';
import { StoargeTextBtnContainer } from '../../components/StorageTextBtn';
import YouTube from "react-youtube";

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

const YouTubeBox = styled.div`
    margin-top: 10%;
    margin-left: 5%;
    display: inline-block;
`;


//<ListBackgroundImg>밑에다가 아이템들 넣으면 됨</ListBackgroundImg>
const StorageRecommendForm = () => {

    const videoId = "dQw4w9WgXcQ"; // YouTube 동영상 ID (예: Rick Astley's "Never Gonna Give You Up")

    const opts = {
        height: '250',
        width: '400',

        playerVars: {
            autoplay: 0,
        },
    };

    const onReady = (event) => {
        // API에 접근하기 위해 event 객체를 사용
        event.target.pauseVideo();
    };


    return (
        <div>
            <Helmet>
            <title>StorageDrawBook</title>
            <meta name="description" content="BlueMemories Introduce Page"/>
            </Helmet>

            <Wrapper>
                <LoggedInNavigationBar></LoggedInNavigationBar>
                <ContentContainer>
                    <StoargeTextBtnContainer margin_top='99%'></StoargeTextBtnContainer>
                    <ListBackgroundImg>
                        <YouTubeBox><YouTube videoId={videoId} opts={opts} onReady={onReady}/></YouTubeBox>
                        <YouTubeBox><YouTube videoId={videoId} opts={opts} onReady={onReady}/></YouTubeBox>
                        <YouTubeBox><YouTube videoId={videoId} opts={opts} onReady={onReady}/></YouTubeBox>
                        <YouTubeBox><YouTube videoId={videoId} opts={opts} onReady={onReady}/></YouTubeBox>
                    </ListBackgroundImg>
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageRecommendForm;
