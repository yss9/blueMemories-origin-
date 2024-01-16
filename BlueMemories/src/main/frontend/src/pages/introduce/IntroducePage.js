import React from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';
import {NavExport} from "../../components/NavigationBar";
import { LogoText } from '../../components/LoginBtn';

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction:column;
`;

const DiaryBody = styled.div`
    width:100%;
    min-height:100vh;
    background-image: url("/resourcesPng/introducePage/introduce_background1.png"),
    linear-gradient(rgba(255, 227, 157, 0.65),rgba(255,234,163,0.29),rgba(255,237,182,0.2),rgba(255,253,246,0));
    background-size: cover;
    display: flex;
    /*item 정렬*/
    align-items: space-between;
    flex-direction:column;
    justify-content:space-between;
`;


const TogetherDiaryBody = styled.div`
    width:100%;
    height:70vh;
    background-image: url("/resourcesPng/introducePage/introduce_background2.png"),
    linear-gradient(rgba(226, 130, 124, 0.685),rgba(211,140,118,0.51),rgba(220,140,115,0.31),rgba(243,184,198,0));
    background-size: cover;
    display: flex;
    /*item 정렬*/
    flex-direction:column-reverse;
    
`;

const BookBody = styled.div`
    width:100%;
    height:100vh;
    background-image: url("/resourcesPng/introducePage/introduce_background3.png"),
    linear-gradient(rgba(71, 78, 141, 1),rgba(89,88,166,0.82),rgba(30,35,142,0.2233),rgba(35,48,164,0));
    background-size: cover;
    display: flex;
   /*item 정렬*/
   flex-direction:column-reverse;
`;

const Footer = styled.div`
    width:100%;
    height:15vh;
    background-color: #081405;
    /*item 정렬*/
    display: flex;
    align-items: space-between;
    flex-direction:column;
    justify-content:space-between;
`;

const WhiteContainer=styled.div`
    width: 85%;
    height: 80%;
    background-image: url("/resourcesPng/introducePage/white_background.png");
    background-size: cover;
    /*item 정렬*/
    align-self: center;
    display: flex;
`;

const TitleContainer=styled.div`
    width: auto;
    height: auto;
    margin-top: 10%;
    background-color: red;
    /*item 정렬*/
    display: flex;
    flex-direction: column;
`;
const Text=styled.div`
    font-size: ${(props) => props.fontsize || '2rem'};
`;
const ImageContainer=styled.div`
    width: 50%;
    height: 70%;
    margin-top: 10%;
    background-color: pink;
    /*item 정렬*/
    display: flex;
    flex-direction: column;
`;    
const Image=styled.image`
    width:70%;
    height:60%;
    background-image: url("/resourcesPng/introducePage/diary_image1.png");
    background-size: contain;
    background-repeat: no-repeat;
`;
const IntroduceForm = () => {
    return (
        <div>
            <Helmet>
            <title>Introduce</title>
            <meta name="description" content="BlueMemories Introduce Page"/>
            </Helmet>
           
            <Wrapper>
                <DiaryBody>
                    <NavExport></NavExport>
                    <WhiteContainer>
                        <TitleContainer>
                            <Text fontsize='4rem'>일기</Text>
                            <Text fontsize='3rem'>오늘 하루를 기록해 보세요</Text>
                            <Text><LogoText text={"Blue memories는 일기를 분석해서 감정을 측정해줘요\n감정에 따라 다양한 색상의 스티커를 달력에 부착해 드리고,\n음악과 영상을 추천해 드려요\n\n일기를 작성하고 다양한 감정을 모으고\n음악을 추천받아보세요!"}></LogoText></Text>
                        </TitleContainer>
                        <ImageContainer>
                            <Image></Image>
                        </ImageContainer>
                    </WhiteContainer>
                </DiaryBody>
            </Wrapper>
            
            <TogetherDiaryBody>
                <WhiteContainer></WhiteContainer>
            </TogetherDiaryBody>
            
           <BookBody>
                <WhiteContainer></WhiteContainer>
           </BookBody>
           <Footer></Footer>
        </div>
    );
};

export default IntroduceForm;
