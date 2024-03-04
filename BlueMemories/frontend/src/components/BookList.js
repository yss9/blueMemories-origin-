import styled from "styled-components";
import React from 'react';

const ListContainer=styled.div`
    width:90%;
    height: 90%;
    margin-left: 5%;
    margin-top: 4%;
   //background-color: blue;
    /*item정렬*/
    display: flex;
    flex-direction: column;
`;

const ListStateText=styled.text`
    font-size: 1.7vw;
    color: #436052;
    font-family: gangwonedusaeeum;
    margin-left:2%;
    margin-top: 1%;
    /*밑줄 옵션*/
    text-decoration: underline;
    text-decoration-thickness: 4%;
    text-underline-position:under;
`;
const BookListContainer=styled.div`
    width: ${(props)=>props.width||'100%'};
    height: ${(props)=>props.height||'30%'};
    margin-top: ${(props)=>props.margin_top||'3%'};
    display: flex;
    justify-content:space-around;
    align-items: center;
`;
const AddBookItem=styled.button`
    width: 14%;
    height: 100%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/add_novel_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
`;

const BookItemTitle=styled.text`
    width: 13%;
    height: 100%;
    font-size: 1.1vw;
    color: #436052;
    font-family: gangwonedusaeeum;
    text-align: center;
`;
const BookListNextBtn=styled.button`
    width: 4%;
    height: 35%;
    background-image: url("/resourcesPng/storagePage/storageNovelPage/book_list_next_btn.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
`;

//소설 보관함 작성한 책 list item
const BookListItemContainer=()=>{

    return (
    <ListContainer>
        <ListStateText>작성 중</ListStateText>
        <BookListContainer>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <BookListNextBtn></BookListNextBtn>
        </BookListContainer>
        <BookListContainer width='92%' height='15%' margin_top='0%'>
            <BookItemTitle></BookItemTitle>
            <BookItemTitle>비밀의 정원</BookItemTitle>
            <BookItemTitle>노르웨이숲의 비밀 사건</BookItemTitle>
            <BookItemTitle></BookItemTitle>
            <BookItemTitle></BookItemTitle>
        </BookListContainer>
        <ListStateText>작성 완료</ListStateText>
        <BookListContainer>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <AddBookItem></AddBookItem>
            <BookListNextBtn></BookListNextBtn>
        </BookListContainer>
        <BookListContainer width='92%' height='15%' margin_top='0%'>
            <BookItemTitle></BookItemTitle>
            <BookItemTitle>비밀의 정원</BookItemTitle>
            <BookItemTitle>노르웨이숲의 비밀 사건</BookItemTitle>
            <BookItemTitle></BookItemTitle>
            <BookItemTitle></BookItemTitle>
        </BookListContainer>
    </ListContainer>
    );
};
export {BookListItemContainer};

