import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from "axios";
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
    display: flex;
    overflow: hidden;
    width: 86.3%;
    height: 100%;
    //background-color: red;
`;

const Wrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.translateX}px);
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

const HorizontalScrollComponent = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;//한번에 보여질 item 개수
    const {user} = useAuth();// userID
    const userID = user.id;

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

    const translateX = -(currentIndex * (644 / itemsPerPage));

    const fetchIncompleteNovels = async (userID) => {
        console.log("userid: "+userID);
        try {
            const response = await axios.get(`http://localhost:8080/api/novels/storageNovel/complete?memberId=${userID}`);
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

    return (
        <div>
            <Container>
                <ScrollBeforeButton onClick={handlePrev} disabled={currentIndex < 4}/>
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

export default HorizontalScrollComponent;