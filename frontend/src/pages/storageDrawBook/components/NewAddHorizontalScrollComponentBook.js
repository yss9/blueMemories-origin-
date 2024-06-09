import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/AuthContext";

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
    width: 24%;
    height: 85%;
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

const NewAddHorizontalScrollComponentBook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;//한번에 보여질 item 개수
    const {user} = useAuth();// userID

    const navigate = useNavigate();
    const userID = user.id;
    const [books, setBooks] = useState([]);

    //writeBookPage로 화면 전환
    const navigateToWriteBook=(bookId)=>{
        navigate('/writeBook', {state: {bookId:bookId } }); // 소설 작성 페이지로 리디렉션 (생성된 book id 넘겨줌)
    }

    //새로운 book 생성
    const handleCreateBook = async () => {
        try {
            console.log("user:" + userID);
            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({member: {id: userID}})
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Book created with ID:', data.id);
                navigateToWriteBook(data.id);
            } else {
                console.error('Failed to create book:', data);
            }
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    //기존 book db 불러오기 -> status가 'IN_COMPLETED' 인것들
    const fetchIncompleteBooks = async (userID) => {
        console.log("userid: " + userID);
        try {
            const response = await axios.get(`http://localhost:8080/api/books/storageBook/incomplete?memberId=${userID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching incomplete books:', error);
            return [];
        }
    };
    useEffect(() => {
        const FetchInCompleteBooks = async () => {
            try {
                const book = await fetchIncompleteBooks(userID); // 2. 작성 중인 소설 가져오기
                setBooks(book);

            } catch (error) {
                console.error('Error deleting temporary books:', error);
            }
        };

        FetchInCompleteBooks();
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

    //스크롤 4개씩 넘어가는 효과
    const translateX = -(currentIndex * (581 / itemsPerPage));

    return (
        <div>
            <Container>
                <ScrollBeforeButton onClick={handlePrev} disabled={currentIndex < 3}/>
                <NewItemBtn onClick={handleCreateBook}></NewItemBtn>
                <ScrollContainer>
                    <Wrapper translateX={translateX}>
                        {books.map((book, index) => (
                            <Item key={index}
                                  coverImage={book.coverImage}
                                  onClick={()=>navigateToWriteBook(book.id)}
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

export default NewAddHorizontalScrollComponentBook;