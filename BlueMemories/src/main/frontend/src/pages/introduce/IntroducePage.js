import React from 'react';
import {Helmet} from "react-helmet";
import styled from 'styled-components';
import {NavExport} from "../../components/NavigationBar";
import { LogoText } from '../../components/LoginBtn';
import {TitleContainer,Text,MovePageBtn} from './component/IntroduceText';
import {BannerEvent} from './component/Banner';

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

///////////교환 일기//////////////
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
const TogetherDiaryImageContainer=styled.div`
    width: 50%;
    height: 100%;
    /*item 정렬*/
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 7%;
`;
const TogetherDiaryImage = styled.image`
    width:80%;
    height:70%;
    background-image: url("/resourcesPng/introducePage/introduce_togetherdiary_img.png");
    background-size: contain;
    background-repeat: no-repeat;
`;

///////////소설/그림책//////////////
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
    height:20vh;
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
                            <Text fontsize='3rem' fontfamily='bokkbold'>일기</Text>
                            <Text fontsize='2rem'>오늘 하루를 기록해 보세요</Text>
                            <Text><LogoText text={"Blue memories는 일기를 분석해서 감정을 측정해줘요\n감정에 따라 다양한 색상의 스티커를 달력에 부착해 드리고,\n음악과 영상을 추천해 드려요\n\n일기를 작성하고 다양한 감정을 모으고\n음악을 추천받아보세요!"}></LogoText></Text>
                            <MovePageBtn>일기 작성하기</MovePageBtn>
                        </TitleContainer>
                        <BannerEvent></BannerEvent>
                    </WhiteContainer>
                </DiaryBody>
            </Wrapper>
            
            <TogetherDiaryBody>
                <WhiteContainer>
                    <TogetherDiaryImageContainer>
                        <TogetherDiaryImage></TogetherDiaryImage>
                    </TogetherDiaryImageContainer>
                    <TitleContainer align='right' left='0%' right='10%'>
                        <Text fontsize='2.5rem' fontfamily='bokkbold'>교환일기</Text>
                        <Text fontsize='1.7rem'>친구와 일기를 공유해 보세요</Text>
                        <Text><LogoText text={"오늘의 감정을 친구와 공유해보세요\n함께 일기를 작성하고 싶은 친구를 초대해 보세요\n친구와 경험을 공유해 보아요"}></LogoText></Text>
                        <MovePageBtn width='46%' height='11%' btnalign='end'>교환일기 작성하기</MovePageBtn>
                    </TitleContainer>
                </WhiteContainer>
            </TogetherDiaryBody>
            
           <BookBody>
                <WhiteContainer>
                    <TitleContainer left='9%' right='3%'>
                        <Text fontsize='3rem' fontfamily='bokkbold'>소설/그림책</Text>
                        <Text fontsize='2rem'>소설/그림책을 작성해 보세요</Text>
                        <Text><LogoText text={"Blue memories는 입력한 문장을 AI가 분석해줘요\n분석한 문장을 토대로 AI가 그림을 그려줍니다\n그림을 활용하여 책 표지를 만들거나,\n그림책의 장면으로 활용할 수 있습니다\n\n문장을 작성하여 나만의 책을 만들어 보세요!"}></LogoText></Text>
                        <MovePageBtn width='37%' btncolor='#6469D9'>책 작성하기</MovePageBtn>
                    </TitleContainer>
                    <BannerEvent></BannerEvent>
                </WhiteContainer>
           </BookBody>
           <Footer></Footer>
        </div>
    );
};

export default IntroduceForm;
