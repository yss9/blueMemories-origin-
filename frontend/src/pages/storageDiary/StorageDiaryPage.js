import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';
import { StoargeTextBtnContainer } from '../../components/StorageTextBtn';
import Calendar from 'react-calendar';
import './Calendar.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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


//<ListBackgroundImg>밑에다가 아이템들 넣으면 됨</ListBackgroundImg>

function CustomNavigationLabel({ date }) {
    const monthNumber = date.getMonth() + 1; // getMonth() returns 0 for January, 1 for February, etc.
    if(monthNumber<10){
        return (
            <div style={{ textAlign: 'center' }}>
                <span>{date.getFullYear()}</span>
                <div></div>
                <div>{"0"+monthNumber}</div> {/* Display the month number */}
            </div>
        );
    }
    else{
        return (
            <div style={{ textAlign: 'center' }}>
                <span>{date.getFullYear()}</span>
                <div>{monthNumber}</div> {/* Display the month number */}
            </div>
        );
    }

}


const StorageDiaryForm = () => {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();

    const handleDateClick = (value) => {
        const year = value.getFullYear();
        const month = value.getMonth() + 1; // getMonth()는 0부터 시작
        const day = value.getDate();
        const weekdayIndex = value.getDay();

        navigate('/diaryWrite', { state: { year, month, day, weekdayIndex } });
    };
    // 각 날짜 셀의 내용을 포매팅하는 함수
    const formatDay = (locale, date) => {
        return date.getDate(); // '일' 부분만 반환
    };

    const formatShortWeekday = (locale, date) => {
        // 요일별 영문 약어 배열
        const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return weekDay[date.getDay()]; //(0 = 일요일, 1 = 월요일, ...)
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
                    <StoargeTextBtnContainer margin_top='33%'></StoargeTextBtnContainer>
                        <Calendar
                            onChange={handleDateClick}
                            value={value}
                            formatDay={formatDay}
                            formatShortWeekday={formatShortWeekday}
                            locale={"en-US"}
                            showNeighboringMonth={false}
                            navigationLabel={({ date, label }) => <CustomNavigationLabel date={date} />}
                        />
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageDiaryForm;
