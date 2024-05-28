import React, { useState } from 'react';
import styled from 'styled-components';

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

    return (
        <div>
            <Container>
                <ScrollBeforeButton onClick={handlePrev} disabled={currentIndex < 4}/>
                <ScrollContainer>
                    <Wrapper translateX={translateX}>
                        {items.map((item, index) => (
                            <Item key={index}>{item}</Item>
                        ))}
                    </Wrapper>
                </ScrollContainer>
                <ScrollNextButton onClick={handleNext} disabled={currentIndex + itemsPerPage >= items.length}/>
            </Container>




        </div>
    );
};

export default HorizontalScrollComponent;