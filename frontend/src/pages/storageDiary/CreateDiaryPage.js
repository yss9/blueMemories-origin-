import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useLocation} from "react-router";
import 'react-resizable/css/styles.css';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const TextAreaContainer = styled.textarea`
    border: none;
    outline: none;
    resize: none;
    width: 90%;
    height: 50%;
    background-color: #FAFAED;
    font-size: 62%;
    padding-left: 5%;
    color: #9C876E;
    font-family: GangwonEduSaeeum;
`;

const Container = styled.div`
    font-family: GangwonEduSaeeum;
`;

const Head = styled.div`
    background-color: #E7C694;
    width: 100%;
    height: 4.5vh;
`;

const HeadNavButton=styled.button`
    font-family: GangwonEduSaeeum;
    font-size: 3.5vh;
    color:#FFFFFF;
    background-color: #E7C694;
    border: none;
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95.5vh;
    background-color: #FAFAED;
    background-size: cover;
`;

const LeftContainer = styled.div`
    width: 100%;
    height: 95.5vh;
`;

const RightContainer = styled.div`
    width: 100%;
    height: 95.5vh;
`;

const DateContainer = styled.div`
    width: 100%;
    height: 11vh;
    font-size: 2.7vh;
    background-color: #FAFAED;
`;

const FileUploadContainer = styled.div`
    width: 100%;
    height: 11vh;
`;

const FileUploadBox=styled.div`
    width: 85%;
    height: 4vh;
    margin-left: 5%;
    background-color: #FEDDAB;
    border-radius: 0 0 20px 20px;
`;
const ImageUploadButton=styled.div`
    width: 3.1vh;
    height: 3.1vh;
    margin-left: 10%;
    padding: 0.5%;
    background-image: url("/resourcesPng/writeDiaryPage/imageBtn.png");
    background-size: cover;
    border:none;
`;

const LeftDiaryTextContainer=styled.div`
    width: 85%;
    height: 80vh;
    margin-left: 10%;
    margin-right: 5%;
    margin-top: 3%;
    background-size: cover;
    background-image: url("/resourcesPng/writeDiaryPage/diaryTitleLine.png");
`;

const RightDiaryTextContainer=styled.div`
    width: 85%;
    height: 80vh;
    margin-left: 5%;
    margin-right: 10%;
    margin-top: 3%;
    background-size: cover;
    background-image: url("/resourcesPng/writeDiaryPage/diaryWriteLine.png");
`;

const DateBox = styled.div`
    position: absolute;
    margin-top:5%;
    margin-left:6%;
    display: inline-block;
    height: 3vh;
    width: 15vh;
    text-align: center;
    border: 3px solid #F1D68E;
    color:#C9A67C;
    border-radius: 30px;
`;

const WeekBox = styled.div`
    position: absolute;
    margin-top:5%;
    margin-left:18%;
    color: #C9A67C;
    display: inline-block;
`;

const TitleWeatherContainer=styled.div`
    height: 8vh;
    padding-top: 1.5%;
    font-size: 3.5vh;
`;

const TitleBox=styled.div`
    height:85%;
    width: 65%;
    display : inline-block;
`;

const WeatherBox=styled.div`
    height:85%;
    width: 30%;
    padding-left: 1%;
    border-left: 0.25vh solid rgba(245,233,199,95);
    display : inline-block;
`;

const LeftDiaryWriteContainer=styled.div`
    height: 71vh;
    width: 100%;
    background-color:red ;
`;

const WriteDiaryBox=styled.textarea`
    background-image:url("/resourcesPng/writeDiaryPage/leftWriteLine.png") ;
    background-size: cover;
    background-color: #FAFAED;
    border: none;
    outline: none;
    resize: none;
    overflow: hidden;
    font-size:3.65vh;
    font-family: GangwonEduSaeeum;
    color: #9C876E;
    width: 100%;
    height: 100%;
    
`;

const RightWriteDiaryBox=styled.textarea`
    background-image:url("/resourcesPng/writeDiaryPage/diaryWriteLine.png") ;
    background-size: cover;
    background-color: #FAFAED;
    border: none;
    outline: none;
    resize: none;
    font-size:3.7vh;
    font-family: GangwonEduSaeeum;
    color: #9C876E;
    width: 100%;
    height: 100%;
    
`;

const WeekdayContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Day = styled.div`
    padding: 5px 10px;
    margin: 0 5px;
    height: 3vh;
    border-radius: 30px;
    background: ${(props) => (props.isSelected ? '#F9EED0' : 'none')};
    
`;


function GeneralDiaryForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content1,setContent1] = useState('');
    const [content2 ,setContent2]=useState('');
    const [image1, setImage1] = useState(null);
    const [weather, setWeather] = useState('');
    const [response, setResponse] = useState('');
    const {year, month, day, weekdayIndex} = location.state || {}; // 넘겨받은 상태가 없는 경우를 대비해 기본값 설정
    const fileInputRef = useRef(null);

    const handleInput=(setContent)=>(e)=>{
        const textarea = e.target;
        const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
        if(!isOverflowing){
            setContent(textarea.value);
        }
    };


    const handleDiaryCreate = () => {

        const content = content1 + '\n' + content2;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('weather', weather);
        if (image1) formData.append('image1', image1);

        axios.post('http://localhost:8080/api/{id}/posting', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                setResponse(res.data);
                console.log(response);
                navigate('/login');
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
        console.log(file); // 선택된 파일 로그 출력
        // 파일 처리 로직 작성
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
                            <RightWriteDiaryBox value={content2} onInput={handleInput(setContent2)} onChange={(e) => setContent2(e.target.value)}>
                            </RightWriteDiaryBox>
                        </RightDiaryTextContainer>
                    </RightContainer>
                </Body>
            </Container>
        </div>
    );
}

export default GeneralDiaryForm;

// <div>
//     <label>Title</label>
//     <TextAreaContainer value={title} onChange={(e) => setTitle(e.target.value)}></TextAreaContainer>
// </div>
//
// {/* Content */
// }
// <div>
//     <label>Content</label>
//     <TextAreaContainer value={content} onChange={(e) => setContent(e.target.value)}></TextAreaContainer>
// </div>
//
// {/* Images */
// }
// <div>
//     <label>Image 1</label>
//     <input type="file" onChange={(e) => setImage1(e.target.files[0])}/>
// </div>
// <div>
//     <label>Image 2</label>
//     <input type="file" onChange={(e) => setImage2(e.target.files[0])}/>
// </div>
//
//
// {/* Submit button */
// }
// <div>
//     <button onClick={handleDiaryCreate}>Submit Diary</button>
// </div>
//
// <div>
//     <lable> Year : {year} , Month: {month} Day: {day} WeekDay:{weekdayIndex}</lable>
// </div>
