import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../pages/Context/AuthContext";

const Container=styled.div`
    width: 43.8vw;
    height: 12vw;
    display: flex;
    flex-direction: row;
    margin-top: 2%;
    align-items: center;
    justify-content: space-between;
`;
const ScrollContainer = styled.div`
    //background-color: red;
    display: flex;
    overflow: hidden;
    width: 75%;
    height: 100%;
    //background-color: red;
`;

const Wrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.translateX}px);
`;
const NewItemBtn = styled.button`
    width: 25%;
    height: 82%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/add_novel_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
    margin: 8px;
    border-radius: 8px;
    cursor: pointer;
`;
const Item = styled.div`
  flex: 0 0 20%;
  box-sizing: border-box;
  //padding: 10px;
  text-align: center;
  background: #f1f1f1;
  margin: 8px;
  border-radius: 8px;
`;
const ScrollBeforeButton = styled.button`
    width: 6%;
    height: 30%;
    border: none;
    cursor: pointer;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/book_list_before_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    visibility: ${props => (props.disabled ? 'hidden' : 'visible')};
`;
const ScrollNextButton = styled.button`
    width: 6%;
    height: 30%;
    border: none;
    cursor: pointer;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/book_list_next_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
`;

const NewAddHorizontalScrollComponent = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;//한번에 보여질 item 개수
    const {user} = useAuth();// userID
    const [novelId, setNovelId] = useState(null);//novel DB
    const navigate = useNavigate();
    const userID = user.id;

    //새로운 novel 생성
    const handleCreateNovel = async () => {
        try {
            console.log("user:" + userID);
            const response = await fetch('http://localhost:8080/api/novels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({member: {id: userID}})
            });
            const data = await response.json();
            if (response.ok) {
                setNovelId(data.id); // 생성된 소설 ID로 업데이트
                console.log('Novel created with ID:', data.id);
                navigate('/writeNovel', {state: {novelId: data.id}}); // 소설 작성 페이지로 리디렉션 (생성된 novel id 넘겨줌)
            } else {
                console.error('Failed to create novel:', data);
            }
        } catch (error) {
            console.error('Error creating novel:', error);
        }
    };

    //기존 novel db 불러오기 -> status가 'IN_COMPLETED' 인것들
    const fetchIncompleteNovels = async (userID) => {
        console.log("userid: "+userID);
        try {
            const response = await axios.get(`http://localhost:8080/api/novels/storageNovel/incomplete?memberId=${userID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching incomplete novels:', error);
            return [];
        }
    };

    const [novels, setNovels] = useState([]);
    useEffect(() => {
        const loadNovels = async () => {
            const data = await fetchIncompleteNovels(userID);
            setNovels(data);
        };
        loadNovels();
    }, [userID]);

    const handleNext = () => {
        if (currentIndex + itemsPerPage < items.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const translateX = -(currentIndex * (482 / itemsPerPage));
    console.log(currentIndex);
    return (
        <div>
            <Container>
                <ScrollBeforeButton onClick={handlePrev} disabled={currentIndex < 3}/>
                <NewItemBtn onClick={handleCreateNovel}></NewItemBtn>
                <ScrollContainer>
                    <Wrapper translateX={translateX}>
                        {novels.map((novel, index) => (
                            <Item key={index}>
                                <div>{novel.title}</div>
                            </Item>
                        ))}
                    </Wrapper>
                </ScrollContainer>
                <ScrollNextButton onClick={handleNext} disabled={currentIndex + itemsPerPage >= items.length}/>
            </Container>
        </div>
    );
};

export default NewAddHorizontalScrollComponent;