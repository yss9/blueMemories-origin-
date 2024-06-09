import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from "axios";
import {useAuth} from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";

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
`;

const Wrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.translateX}px);
`;

const Item = styled.div`
    position: relative;
    width: 8.5vw;
    height: 11vw;
    box-sizing: border-box;
    //text-align: center;
    margin: 10px;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #f1f1f1;
    cursor: pointer;
    background-image: ${props => `url(data:image/jpeg;base64,${props.coverImage})`};
`;
const Title = styled.div`
    /*텍스트 설정*/
    font-size: ${props => props.fontSize||'15px'};
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    user-focus: none;
    /*텍스트 위치*/
    position: absolute;
    left: ${props => props.x || '0px'};
    top: ${props => props.y || '0px'};
    margin: 6%;
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

const HorizontalScrollComponentBook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;//한번에 보여질 item 개수
    const {user} = useAuth();// userID
    const userID = user.id;
    const [books, setBooks] = useState([]);
    //스크롤 4개씩 넘어가는 효과
    const translateX = -(currentIndex * (780 / itemsPerPage));
    const navigate = useNavigate();

    // 기존 book db 불러오기 -> status가 'COMPLETED' 인것들
    const fetchCompleteBooks = async (userID) => {
        console.log("userid: " + userID);
        try {
            const response = await axios.get(`http://localhost:8080/api/books/storageBook/complete?memberId=${userID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching complete books:', error);
            return [];
        }
    };
    useEffect(() => {
        const FetchCompleteBooks = async () => {
            try {
                const book = await fetchCompleteBooks(userID); // 2. 작성 중인 소설 가져오기
                setBooks(book);

            } catch (error) {
                console.error('Error deleting temporary books:', error);
            }
        };

        FetchCompleteBooks();
    }, [userID]);

    //스크롤 오른쪽 next btn
    const handleNext = () => {
        if (currentIndex + itemsPerPage < books.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };
    //스크롤 왼쪽 prev btn
    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    //작성 완료 item 클릭하면 화면 전환 (해당 bookID넘겨줌)
    const handleNavigateViewPage=(bookId)=>{
        console.log('bookId:'+ bookId);
        navigate('/viewBook',  { state: { bookId: bookId } });
    }
    return (
        <div>
            <Container>
                <ScrollBeforeButton onClick={handlePrev} disabled={currentIndex < 4}/>
                <ScrollContainer>
                    <Wrapper translateX={translateX}>
                        {books.map((book, index) => (
                            <Item key={index}
                                  coverImage={book.coverImage}
                                  onClick={()=>handleNavigateViewPage(book.id)}
                            >
                                <Title
                                    fontSize={`${book.titleSize+20}px`}
                                    x={`${book.titleX/2}px`}
                                    y={`${book.titleY/3}px`}>
                                    {book.title}
                                </Title>
                            </Item>
                        ))}
                    </Wrapper>
                </ScrollContainer>
                <ScrollNextButton onClick={handleNext} disabled={currentIndex + itemsPerPage > books.length}/>
            </Container>




        </div>
    );
};

export default HorizontalScrollComponentBook;
