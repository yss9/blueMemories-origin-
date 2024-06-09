import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';
import { StoargeTextBtnContainer } from '../../components/StorageTextBtn';
import YouTube from "react-youtube";
import {useEffect, useState} from "react";
import axios from "axios";

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
    font-family: gangwonedusaeeum;
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

const TextBox = styled.div`
    margin-top:5vh;
    margin-left:5vh;
    font-size: 2.4vh;
    color:#436052;
`

const RecommendContainer = styled.div`
    width: 100%;
    height: 15vh;
    margin-left:5vh;
    margin-top:2vh;
`;

const YouTubeBox = styled.div`
    display: inline-block;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin-right: 3vh;
    
`;


//<ListBackgroundImg>밑에다가 아이템들 넣으면 됨</ListBackgroundImg>
const StorageRecommendForm = () => {

    const [videoIds, setVideoIds] = useState([]);

    useEffect(() => {
        // 서버에서 신청목록 가져오기
        axios.get('http://localhost:8080/api/search')
            .then(response => {
                setVideoIds(response.data);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }, []);


    const opts = {
        height: '100%',
        width: '100%',

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
                        <TextBox>추천 음악</TextBox>
                        <RecommendContainer>
                            {videoIds.slice(0, 2).map((videoId, index) => (
                                <YouTubeBox key={index}>
                                    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
                                </YouTubeBox>
                            ))}
                        </RecommendContainer>
                        <TextBox>추천 동영상</TextBox>
                        <RecommendContainer>
                            {videoIds.slice(2, 4).map((videoId, index) => (
                                <YouTubeBox key={index}>
                                    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
                                </YouTubeBox>
                            ))}
                        </RecommendContainer>
                    </ListBackgroundImg>
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageRecommendForm;
