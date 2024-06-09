// import React, {useEffect, useState} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//     Body,
//     Container,
//     DateBox,
//     DateContainer,
//     Day, FileUploadBox, FileUploadContainer,
//     Head,
//     HeadNavButton,
//     LeftContainer,
//     LeftDiaryTextContainer,
//     LeftDiaryWriteContainer, RightContainer, RightDiaryTextContainer, RightWriteDiaryBox,
//     TextAreaContainer,
//     TitleBox,
//     TitleWeatherContainer,
//     WeatherBox,
//     WeekBox,
//     WeekdayContainer, WriteDiaryBox
// } from "./CreateExchangeDiaryPage";
// import styled from "styled-components";
//
// const ImageBox = styled.div`
//     width: 95%;
//     height: 40%;
//     margin-left: 3%;
// `;
//
// const TitleInDiv =styled.div`
//     color: #9C876E;
//     padding-left: 5%;
//     font-size: 65%;
// `;
//
// const TextDiv = styled.div`
//     color: #9C876E;
//     font-size:3.65vh;
// `;
//
// const SentimentContainer = styled.div`
//     width: 80%;
//     margin-left: 7.5%;
//     height: 8vh;
//     margin-top: 1.5vh;
//     border: 0.75vh solid #F4E3C1; // 테두리 색상
//     border-radius: 30px; // 둥근 모서리
//     background-color: #FFF8E5; // 배경 색상
// `;
//
// const SentimentLeftContainer=styled.div`
//     display: inline-block;
// `;
//
// const HappyBoxL=styled.div`
//     background-image: ${({ max }) => (max === 'happy' ? 'url("/resourcesPng/viewDiaryPage/happyOn.png")' : 'url("/resourcesPng/viewDiaryPage/happyOff.png")')};
//     background-size: cover;
//     display: inline-block;
//     width: 12%;
//     height: 100%;
//     margin-left: 3vh;
// `;
//
// const HappyBoxR=styled.div`
//     display: inline-block;
//     margin-left: 0.7vh;
//     margin-right: 1.3vh;
// `;
//
// const NeutralBoxL=styled.div`
//     background-image: ${({ max }) => (max === 'neutral' ? 'url("/resourcesPng/viewDiaryPage/neutralOn.png")' : 'url("/resourcesPng/viewDiaryPage/neutralOff.png")')};
//     background-size: cover;
//     display: inline-block;
//     width: 12%;
//     height: 100%;
// `;
//
// const NeutralBoxR=styled.div`
//     display: inline-block;
//     margin-left: 0.7vh;
//     margin-right: 1.3vh;
// `;
//
// const SadBoxL=styled.div`
//     background-image: ${({ max }) => (max === 'sad' ? 'url("/resourcesPng/viewDiaryPage/sadOn.png")' : 'url("/resourcesPng/viewDiaryPage/sadOff.png")')};
//     background-size: cover;
//     display: inline-block;
//     width: 12%;
//     height: 100%;
// `;
//
// const SadBoxR=styled.div`
//     display: inline-block;
//     margin-left: 0.7vh;
//     margin-right: 1.3vh;
// `;
//
// const ConfidenceLabel = styled.div`
//     color: #E7D3A0;
//     font-size: 2vh;
//     position: relative;
//     bottom:2.8vh;
// `;
//
// const ConfidenceRate = styled.div`
//     color:#D09B6B;
//     font-size:3vh;
//     position: relative;
//     bottom: 2vh;
// `;
//
//
// const ExDiaryView = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { entries,weekdayIndex } = location.state;
//     const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//     const [maxEmotion, setMaxEmotion] = useState('');
//
//     var happy = Math.round(entries[0].confidencePositive);
//     var neutral = Math.round(entries[0].confidenceNeutral);
//     var sad = 100-happy-neutral;
//
//     useEffect(() => {
//
//         if (happy > neutral && happy > sad) {
//             setMaxEmotion('happy');
//         } else if (neutral > happy && neutral > sad) {
//             setMaxEmotion('neutral');
//         } else {
//             setMaxEmotion('sad');
//         }
//     }, [happy, neutral, sad]);
//
//
//     const WeekdaysHighlighter = ({ selectedWeekday }) => {
//         return (
//             <WeekdayContainer>
//                 {weekdays.map((day, index) => (
//                     <Day key={day} isSelected={index === selectedWeekday}>
//                         {day}
//                     </Day>
//                 ))}
//             </WeekdayContainer>
//         );
//     };
//
//     return (
//         <div>
//             <Container>
//                 <Head>
//                     <HeadNavButton style={{marginLeft:"3%", cursor:"pointer"}}>나가기</HeadNavButton>
//                     <HeadNavButton style={{marginLeft:"2%"}}></HeadNavButton>
//                     <HeadNavButton style={{marginLeft:"70%"}}></HeadNavButton>
//                 </Head>
//                 <Body>
//                     <LeftContainer>
//                         <DateContainer>
//                             <DateBox>
//                                 <div style={{display: "flex", marginLeft: "10%"}}>
//                                     {entries[0].year}
//                                     <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
//                                     {entries[0].month}
//                                     <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
//                                     {entries[0].day}
//                                 </div>
//                             </DateBox>
//                             <WeekBox>
//                                 <WeekdaysHighlighter selectedWeekday={weekdayIndex}></WeekdaysHighlighter>
//                             </WeekBox>
//                         </DateContainer>
//                         <LeftDiaryTextContainer>
//                             <TitleWeatherContainer>
//                                 <TitleBox>
//                                     <label style={{color:"#E7D3A0"}}>Today</label>
//                                     <TitleInDiv>{entries[0].title}</TitleInDiv>
//                                 </TitleBox>
//                                 <WeatherBox>
//                                     <label style={{color:"#E7D3A0"}}>Weather</label>
//                                     <TitleInDiv>{entries[0].weather}</TitleInDiv>
//                                 </WeatherBox>
//                             </TitleWeatherContainer>
//                             <LeftDiaryWriteContainer>
//                                 <TextDiv>{entries[0].content} </TextDiv>
//                             </LeftDiaryWriteContainer>
//                         </LeftDiaryTextContainer>
//                     </LeftContainer>
//                     <RightContainer>
//                         <SentimentContainer>
//                             <SentimentLeftContainer>
//                             </SentimentLeftContainer>
//                             <HappyBoxL max = {maxEmotion}></HappyBoxL>
//                             <HappyBoxR>
//                                 <ConfidenceLabel>happy</ConfidenceLabel>
//                                 <ConfidenceRate>{happy}%</ConfidenceRate>
//                             </HappyBoxR>
//                             <NeutralBoxL max = {maxEmotion}></NeutralBoxL>
//                             <NeutralBoxR>
//                                 <ConfidenceLabel>neutral</ConfidenceLabel>
//                                 <ConfidenceRate>{neutral}%</ConfidenceRate>
//                             </NeutralBoxR>
//                             <SadBoxL max = {maxEmotion}></SadBoxL>
//                             <SadBoxR>
//                                 <ConfidenceLabel>sad</ConfidenceLabel>
//                                 <ConfidenceRate>{sad}%</ConfidenceRate>
//                             </SadBoxR>
//                         </SentimentContainer>
//                         <RightDiaryTextContainer>
//                             <TextDiv></TextDiv>
//                         </RightDiaryTextContainer>
//                     </RightContainer>
//                 </Body>
//             </Container>
//         </div>
//     );
// }
//
// export default ExDiaryView;