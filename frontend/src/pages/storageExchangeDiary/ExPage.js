import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Body,
    Container,
    Head,
    HeadNavButton,
    LeftContainer,
    LeftDiaryTextContainer,
    LeftDiaryWriteContainer,
    RightContainer,
    TitleBox,
    TitleWeatherContainer,
    WeatherBox,
} from "../storageDiary/CreateDiaryPage";
import styled from "styled-components";

const TitleInDiv = styled.div`
    color: #9C876E;
    padding-left: 5%;
    font-size: 65%;
`;

const TextDiv = styled.div`
    color: #9C876E;
    font-size: 3.65vh;
`;

const SentimentContainer = styled.div`
    display: inline-block;
    width: 140%;
    height: 5vh;
    margin-left: 100%;
    position: relative;
    bottom: 230%;
`;

const HappyBoxL = styled.div`
    background-image: ${({ max }) => (max === 'happy' ? 'url("/resourcesPng/viewDiaryPage/happyOn.png")' : 'url("/resourcesPng/viewDiaryPage/happyOff.png")')};
    background-size: cover;
    display: inline-block;
    width: 12%;
    height: 100%;
    margin-left: 3vh;
`;

const HappyBoxR = styled.div`
    display: inline-block;
    margin-left: 0.7vh;
    margin-right: 1.3vh;
`;

const NeutralBoxL = styled.div`
    background-image: ${({ max }) => (max === 'neutral' ? 'url("/resourcesPng/viewDiaryPage/neutralOn.png")' : 'url("/resourcesPng/viewDiaryPage/neutralOff.png")')};
    background-size: cover;
    display: inline-block;
    width: 12%;
    height: 100%;
`;

const NeutralBoxR = styled.div`
    display: inline-block;
    margin-left: 0.7vh;
    margin-right: 1.3vh;
`;

const SadBoxL = styled.div`
    background-image: ${({ max }) => (max === 'sad' ? 'url("/resourcesPng/viewDiaryPage/sadOn.png")' : 'url("/resourcesPng/viewDiaryPage/sadOff.png")')};
    background-size: cover;
    display: inline-block;
    width: 12%;
    height: 100%;
`;

const SadBoxR = styled.div`
    display: inline-block;
    margin-left: 0.7vh;
    margin-right: 1.3vh;
`;

const ConfidenceLabel = styled.div`
    color: #E7D3A0;
    font-size: 1.5vh;
    position: relative;
    bottom: 1.5vh;
`;

const ConfidenceRate = styled.div`
    color: #D09B6B;
    font-size: 2vh;
    position: relative;
    bottom: 1.5vh;
`;

const LeftTopContainer = styled.div`
    width: 100%;
    height: 5vh;
`;

const DateBox = styled.div`
    padding-left: 7vh;
    padding-top: 1vh;
    width: 15%;
    height: 50%;
    font-size: 2.3vh;
    color: #C9A67C;
`;

const WeekBox = styled.div`
    width: 40%;
    height: 50%;
    padding-left: 7vh;
    font-size: 2.3vh;
    color: #C9A67C;
`;

const Day = styled.div`
    display: inline-block;
    padding: 5px 5px;
    margin: 0 5px;
    height: 3vh;
    border-radius: 30px;
    background: ${(props) => (props.isSelected ? '#F9EED0' : 'none')};
`;

const DetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { entries, weekdayIndex, diaryId, year, month, day } = location.state;
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [currentPage, setCurrentPage] = useState(0);
    const [maxEmotion, setMaxEmotion] = useState({ left: '', right: '' });

    useEffect(() => {
        const determineMaxEmotion = (entry) => {
            const emotions = {
                happy: Math.round(entry.confidencePositive),
                neutral: Math.round(entry.confidenceNeutral),
                sad: 100 - Math.round(entry.confidencePositive) - Math.round(entry.confidenceNeutral)
            };
            const maxEmotion = Object.keys(emotions).reduce((a, b) => (emotions[a] > emotions[b] ? a : b));
            return maxEmotion;
        };

        if (entries && entries.length > 0) {
            const leftEntry = entries[getEntryIndex(currentPage, 0)];
            const rightEntry = entries[getEntryIndex(currentPage, 1)];
            setMaxEmotion({
                left: leftEntry ? determineMaxEmotion(leftEntry) : '',
                right: rightEntry ? determineMaxEmotion(rightEntry) : ''
            });
        }
    }, [entries, currentPage]);

    const navigateToWritePage = (diaryId) => {
        navigate('/writeExchangeDiary', { state: { year, month, day, weekdayIndex, diaryId } });
    };


    const goStorageDiaryPage = () => {
        navigate("/storageExchangeDiary")
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(entries.length / 2) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const WeekdaysHighlighter = ({ selectedWeekday }) => {
        return (
            <div style={{ display: "flex" }}>
                {weekdays.map((day, index) => (
                    <Day key={day} isSelected={index === selectedWeekday}>
                        {day}
                    </Day>
                ))}
            </div>
        );
    };

    const getEntryIndex = (page, side) => (page * 2) + side;

    return (
        <div>
            <Container>
                <Head>
                    <HeadNavButton style={{marginLeft: "2%", cursor: "pointer"}}
                                   onClick={goStorageDiaryPage}>나가기</HeadNavButton>
                    <HeadNavButton style={{marginLeft: "34%"}} onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</HeadNavButton>
                    <HeadNavButton style={{marginLeft: "7%"}} onClick={handleNextPage} disabled={currentPage >= Math.ceil(entries.length / 2) - 1}>Next
                    </HeadNavButton>
                    <HeadNavButton style={{marginLeft: "34%"}}
                                   onClick={() => navigateToWritePage(diaryId)}>작성하기</HeadNavButton>


                </Head>
                <Body>
                    <LeftContainer>
                        {getEntryIndex(currentPage, 0) < entries.length && (
                            <>
                                <LeftTopContainer>
                                    <DateBox>
                                        <div style={{display: "flex", marginLeft: "10%"}}>
                                            {entries[getEntryIndex(currentPage, 0)].year}
                                            <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                            {entries[getEntryIndex(currentPage, 0)].month}
                                            <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                            {entries[getEntryIndex(currentPage, 0)].day}
                                        </div>
                                    </DateBox>
                                    <WeekBox>
                                        <WeekdaysHighlighter selectedWeekday={weekdayIndex}></WeekdaysHighlighter>
                                        <SentimentContainer>
                                            <HappyBoxL max={maxEmotion.left}></HappyBoxL>
                                            <HappyBoxR>
                                                <ConfidenceLabel>happy</ConfidenceLabel>
                                                <ConfidenceRate>{Math.round(entries[getEntryIndex(currentPage, 0)].confidencePositive)}%</ConfidenceRate>
                                            </HappyBoxR>
                                            <NeutralBoxL max={maxEmotion.left}></NeutralBoxL>
                                            <NeutralBoxR>
                                                <ConfidenceLabel>neutral</ConfidenceLabel>
                                                <ConfidenceRate>{Math.round(entries[getEntryIndex(currentPage, 0)].confidenceNeutral)}%</ConfidenceRate>
                                            </NeutralBoxR>
                                            <SadBoxL max={maxEmotion.left}></SadBoxL>
                                            <SadBoxR>
                                                <ConfidenceLabel>sad</ConfidenceLabel>
                                                <ConfidenceRate>{100 - Math.round(entries[getEntryIndex(currentPage, 0)].confidencePositive) - Math.round(entries[getEntryIndex(currentPage, 0)].confidenceNeutral)}%</ConfidenceRate>
                                            </SadBoxR>
                                        </SentimentContainer>
                                    </WeekBox>
                                </LeftTopContainer>
                                <LeftDiaryTextContainer>
                                    <TitleWeatherContainer>
                                        <TitleBox>
                                            <label style={{color: "#E7D3A0"}}>Today</label>
                                            <TitleInDiv>{entries[getEntryIndex(currentPage, 0)].title}</TitleInDiv>
                                        </TitleBox>
                                        <WeatherBox>
                                            <label style={{color: "#E7D3A0"}}>Weather</label>
                                            <div style={{display:"inline-block",color: "#C9A67C", fontSize: "2vh", marginLeft:"3vh"}}> 작성자
                                                : {entries[getEntryIndex(currentPage, 0)].writer}</div>
                                            <TitleInDiv>{entries[getEntryIndex(currentPage, 0)].weather}</TitleInDiv>
                                        </WeatherBox>
                                    </TitleWeatherContainer>
                                    <LeftDiaryWriteContainer>
                                        <TextDiv>{entries[getEntryIndex(currentPage, 0)].content}</TextDiv>
                                    </LeftDiaryWriteContainer>
                                </LeftDiaryTextContainer>
                            </>
                        )}
                    </LeftContainer>
                    <RightContainer style={{marginRight: "4vh"}}>
                        {getEntryIndex(currentPage, 1) < entries.length && (
                            <>
                                <LeftTopContainer>
                                    <DateBox>
                                        <div style={{display: "flex", marginLeft: "10%"}}>
                                            {entries[getEntryIndex(currentPage, 1)].year}
                                            <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                            {entries[getEntryIndex(currentPage, 1)].month}
                                            <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                            {entries[getEntryIndex(currentPage, 1)].day}
                                        </div>
                                    </DateBox>
                                    <WeekBox>
                                        <WeekdaysHighlighter selectedWeekday={weekdayIndex}></WeekdaysHighlighter>
                                        <SentimentContainer>
                                            <HappyBoxL max={maxEmotion.right}></HappyBoxL>
                                            <HappyBoxR>
                                                <ConfidenceLabel>happy</ConfidenceLabel>
                                                <ConfidenceRate>{Math.round(entries[getEntryIndex(currentPage, 1)].confidencePositive)}%</ConfidenceRate>
                                            </HappyBoxR>
                                            <NeutralBoxL max={maxEmotion.right}></NeutralBoxL>
                                            <NeutralBoxR>
                                                <ConfidenceLabel>neutral</ConfidenceLabel>
                                                <ConfidenceRate>{Math.round(entries[getEntryIndex(currentPage, 1)].confidenceNeutral)}%</ConfidenceRate>
                                            </NeutralBoxR>
                                            <SadBoxL max={maxEmotion.right}></SadBoxL>
                                            <SadBoxR>
                                                <ConfidenceLabel>sad</ConfidenceLabel>
                                                <ConfidenceRate>{100 - Math.round(entries[getEntryIndex(currentPage, 1)].confidencePositive) - Math.round(entries[getEntryIndex(currentPage, 1)].confidenceNeutral)}%</ConfidenceRate>
                                            </SadBoxR>
                                        </SentimentContainer>
                                    </WeekBox>
                                </LeftTopContainer>
                                <LeftDiaryTextContainer>
                                    <TitleWeatherContainer>
                                        <TitleBox>
                                            <label style={{color: "#E7D3A0"}}>Today</label>
                                            <TitleInDiv>{entries[getEntryIndex(currentPage, 1)].title}</TitleInDiv>
                                        </TitleBox>
                                        <WeatherBox>
                                            <label style={{color: "#E7D3A0"}}>Weather</label>
                                            <div style={{
                                                display: "inline-block",
                                                color: "#C9A67C",
                                                fontSize: "2vh",
                                                marginLeft: "3vh"
                                            }}> 작성자
                                                : {entries[getEntryIndex(currentPage, 0)].writer}</div>
                                            <TitleInDiv>{entries[getEntryIndex(currentPage, 1)].weather}</TitleInDiv>
                                        </WeatherBox>
                                    </TitleWeatherContainer>
                                    <LeftDiaryWriteContainer>
                                        <TextDiv>{entries[getEntryIndex(currentPage, 1)].content}</TextDiv>
                                    </LeftDiaryWriteContainer>
                                </LeftDiaryTextContainer>
                            </>
                        )}
                    </RightContainer>
                </Body>
            </Container>
        </div>
    );
};

export default DetailPage;
