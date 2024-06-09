import {Helmet} from "react-helmet";
import styled from 'styled-components';
import {LoggedInNavigationBar} from '../../components/NavigationBar';
import {StoargeTextBtnContainer} from '../../components/StorageTextBtn';
import {useEffect, useState} from "react";
import Modal from "./RequestModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction:column;
    background-image: url("/resourcesPng/storagePage/background_mountain.png"),
    linear-gradient(rgba(255, 242, 211, 1),rgba(255,242,211,0.84),rgba(255,242,211,0.62),rgba(255,242,211,0.41));
    background-size: cover;
    font-family: gangwonedusaeeum;
`;
const ContentContainer=styled.div`
    height: 80%;
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 3%;
`;

const ListBackgroundImg=styled.div`
    width:47%;
    height: 34vw;
    background-image: url("/resourcesPng/storagePage/storage_list_background.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
`;

const ExchangeDiaryList=styled.div`
    padding-top: 1vh;
    margin-left:5vh;
    width: 80%;
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const AddExchangeDiaryItem=styled.button`
    width: 100%;
    height: 100%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/add_novel_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
    margin-right: 2vh;
`;

const ExchangeDiaryListItem = styled.div`
    width: 20%;
    height: auto;
    background-image: url("/resourcesPng/storagePage/storageDiary/ListObject.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    display: flex;
    flex-direction: column;
    margin-right: 2vh;
    text-align: center;
    margin-bottom: 2vh;
`;

const ExchangeDiaryListItems = styled.div`
    width: 20%;
    height: 100%;
    background-image: url("/resourcesPng/storagePage/storageDiary/ListObject.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    display: flex;
    flex-direction: column;
    margin-right: 2vh;
    text-align: center;
    margin-bottom: 2vh;
`;

const LabelTextBox=styled.div`
    width: 100%;
    height: 5%;
    margin-left: 5vh;
    margin-top: 5%;
`;

const LabelText=styled.p`
    font-size: 2vh;
    text-decoration-line: underline;
    text-decoration-thickness: 1%;
    color: #436052;
`;

const Button = styled.button`
    font-size: 1.5vh;
    margin:1.5vh 0.5vh  0.5vh;
    cursor: pointer;
    border: none;
    background-color: #FEF7EA;
    font-family: GangwonEduSaeeum;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    width: 80%;
`;

const StorageExchangeDiaryForm = () => {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [exRequests, setExRequests] = useState([]);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/exchange-diary-list')
            .then(response => {
                setExRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/requestList')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }, []);

    const handleAccept = (id) => {
        axios.post(`http://localhost:8080/api/request-accepted/${id}`)
            .then(response => {
                setRequests(requests.filter(request => request.id !== id));
            })
            .catch(error => {
                console.error('Error accepting request:', error);
            });
    };

    const handleReject = (id) => {
        axios.post(`http://localhost:8080/api/request-unaccepted/${id}`)
            .then(response => {
                setRequests(requests.filter(request => request.id !== id));
            })
            .catch(error => {
                console.error('Error rejecting request:', error);
            });
    };


    const [value, onChange] = useState(new Date());

    const handleView = (request, value) =>{
        const diaryId = request.id;
        const year = value.getFullYear();
        const month = value.getMonth() + 1; // getMonth()는 0부터 시작
        const day = value.getDate();
        const weekdayIndex = value.getDay();
        axios.get(`http://localhost:8080/api/exchangeDiary-list/${diaryId}`)
            .then(response => {
                // 날짜에 해당하는 데이터가 있을 경우
                if (response.status === 200) {
                    navigate('/ex', { state: { entries: response.data,weekdayIndex,diaryId,year, month, day} });

                }
            })
            .catch(error => {
                // 날짜에 해당하는 데이터가 없을 경우
                if (error.response && error.response.status === 404) {
                    navigate('/writeExchangeDiary', { state: { year, month, day, weekdayIndex, diaryId } });
                } else {
                    console.error('Error fetching entry:', error);
                }
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    <StoargeTextBtnContainer margin_top='66%'></StoargeTextBtnContainer>
                    <ListBackgroundImg>
                        <LabelTextBox>
                            <LabelText>교환일기 목록</LabelText>
                        </LabelTextBox>
                        <ExchangeDiaryList>
                            <div style={{height:"100%", width:"20%", display:"inline-block", marginRight:"2vh"}}>
                                <AddExchangeDiaryItem onClick={openModal}></AddExchangeDiaryItem>
                                {isModalOpen && <Modal onClose={closeModal} />}
                            </div>
                            {exRequests.map(request => (
                                <ExchangeDiaryListItems key={request.id}
                                                        onClick={() => handleView(request,value)}>
                                    <div style={{position:"relative", top:"2vh", overflow:"hidden",wordWrap:"break-word", fontSize:"1.3vh"}}>
                                        {request.title}
                                    </div>
                                    <div style={{position:"relative", top:"9vh", fontSize:"1.4vh"}}>
                                        {request.memberNo2}
                                        <br/>with.{request.memberNo1}
                                    </div>
                                </ExchangeDiaryListItems>
                            ))}
                        </ExchangeDiaryList>
                        <LabelTextBox>
                            <LabelText>교환일기 신청 목록</LabelText>
                        </LabelTextBox>
                        <ExchangeDiaryList>
                            {requests.map(request => (
                                <ExchangeDiaryListItem key={request.id}>
                                    <div style={{position:"relative", top:"2vh", overflow:"hidden",wordWrap:"break-word", fontSize:"1.3vh"}}>
                                        {request.title}
                                    </div>
                                    <div style={{position:"relative", top:"9vh", fontSize:"1.4vh"}}>
                                        요청 ID : {request.sender}
                                    </div>
                                    <div style={{position:"relative", top:"9vh"}}>
                                        <Button onClick={() => handleReject(request.id)}>거절</Button>
                                        <Button onClick={() => handleAccept(request.id)}>수락</Button>
                                    </div>
                                </ExchangeDiaryListItem>
                            ))}
                        </ExchangeDiaryList>
                    </ListBackgroundImg>
                </ContentContainer>
            </Wrapper>
        </div>
    );
};

export default StorageExchangeDiaryForm;
