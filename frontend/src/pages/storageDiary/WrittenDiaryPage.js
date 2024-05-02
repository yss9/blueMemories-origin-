import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {Container, Head, Body, LeftContainer, RightContainer, DateContainer, FileUploadContainer, LeftDiaryTextContainer,
    RightDiaryTextContainer, DateBox, WeekBox, TitleWeatherContainer, TitleBox, WeatherBox, LeftDiaryWriteContainer,
    WriteDiaryBox, RightWriteDiaryBox, ImageBox, WeekdayContainer, Day, TextAreaContainer, HeadNavButton, FileUploadBox,
    ImageUploadButton} from "../storageDiary/CreateDiaryPage"



function WrittenDiaryForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content1,setContent1] = useState('');
    const [content2 ,setContent2]=useState('');
    const [file, setFile] = useState(null);
    const [weather, setWeather] = useState('');
    const [response, setResponse] = useState('');
    const {year, month, day, weekdayIndex} = location.state || {}; // 넘겨받은 상태가 없는 경우를 대비해 기본값 설정
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState("/resourcesPng/writeDiaryPage/imageReload.png");


    const handleInput = (setContent) => (e) => {
        const textarea = e.target;
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
        if (!isOverflowing) {
            setContent(textarea.value);
        }
    };



    const handleDiaryCreate = () => {

        const content = content1 + '\n' + content2;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('weather', weather);
        formData.append('year',[year]);
        formData.append('month',[month]);
        formData.append('day',[day]);
        formData.append('weekdayIndex',[weekdayIndex]);

        if (file){
            formData.append('file', file);
        }

        axios.post('http://localhost:8080/api/posting', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                setResponse(res.data);
                console.log(response);
                navigate('/storageDiary');
            })
            .catch(error => {
                console.error('Error during diary creation:', error);
            });

    };

    const goStorageDiary = () => {
        navigate('/storageDiary');
    }

    // div 클릭시 input 태그의 클릭 이벤트 트리거
    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    // 파일이 선택되었을 때 실행될 핸들러
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file); // 상태 업데이트
            const reader = new FileReader();

            reader.onloadend = () =>{
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const WeekdaysHighlighter = ({ selectedWeekday }) => {
        return (
            <WeekdayContainer>
                {weekdays.map((day, index) => (
                    <Day key={day} isSelected={index === selectedWeekday}>
                        {day}
                    </Day>
                ))}
            </WeekdayContainer>
        );
    };

    return (
        <div>
            <Container>
                <Head>
                    <HeadNavButton onClick={goStorageDiary} style={{marginLeft:"3%"}}>나가기</HeadNavButton>
                    <HeadNavButton style={{marginLeft:"2%"}}>임시저장</HeadNavButton>
                    <HeadNavButton onClick={handleDiaryCreate} style={{marginLeft:"70%"}}>작성완료</HeadNavButton>
                </Head>
                <Body>
                    <LeftContainer>
                        <DateContainer>
                            <DateBox>
                                <div style={{display: "flex", marginLeft: "10%"}}>
                                    {year}
                                    <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                    {month}
                                    <div style={{display: "flex", marginLeft: "5%", marginRight: "5%"}}> /</div>
                                    {day}
                                </div>
                            </DateBox>
                            <WeekBox>
                                <WeekdaysHighlighter selectedWeekday={weekdayIndex}></WeekdaysHighlighter>
                            </WeekBox>
                        </DateContainer>
                        <LeftDiaryTextContainer>
                            <TitleWeatherContainer>
                                <TitleBox>
                                    <label style={{color:"#E7D3A0"}}>Today</label>
                                    <TextAreaContainer value={title} onChange={(e) => setTitle(e.target.value)}></TextAreaContainer>
                                </TitleBox>
                                <WeatherBox>
                                    <label style={{color:"#E7D3A0"}}>Weather</label>
                                    <TextAreaContainer value={weather} onChange={(e) => setWeather(e.target.value)}></TextAreaContainer>
                                </WeatherBox>
                            </TitleWeatherContainer>
                            <LeftDiaryWriteContainer>
                                <WriteDiaryBox value={content1} onInput={handleInput(setContent1)} onChange={(e) => setContent1(e.target.value)}>
                                </WriteDiaryBox>
                            </LeftDiaryWriteContainer>
                        </LeftDiaryTextContainer>
                    </LeftContainer>
                    <RightContainer>
                        <FileUploadContainer>
                            <FileUploadBox>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{display: 'none'}}
                                />
                                <ImageUploadButton onClick={handleDivClick}></ImageUploadButton>
                            </FileUploadBox>
                        </FileUploadContainer>
                        <RightDiaryTextContainer>
                            <ImageBox>
                                {previewUrl && (
                                    <img src={previewUrl} alt="Preview" style={{width:'100%', height:'95%',marginTop:"1.5%"}}/>
                                )}
                            </ImageBox>
                            <RightWriteDiaryBox value={content2} onInput={handleInput(setContent2)} onChange={(e) => setContent2(e.target.value)}>
                            </RightWriteDiaryBox>
                        </RightDiaryTextContainer>
                    </RightContainer>
                </Body>
            </Container>
        </div>
    );
}

export default WrittenDiaryForm;