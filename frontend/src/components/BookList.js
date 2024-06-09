import styled from "styled-components";
import React from 'react';
import HorizontalScrollComponent from "./HorizontalScrollComponent";
import NewAddHorizontalScrollComponent from "./NewAddHorizontalScrollComponent";

const ListContainer=styled.div`
    width:90%;
    height: 90%;
    margin-left: 3%;
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
    margin-left:8%;
    margin-top: 1%;
    /*밑줄 옵션*/
    text-decoration: underline;
    text-decoration-thickness: 4%;
    text-underline-position:under;
`;

//소설 보관함 작성한 책 list item
const BookListItemContainer=()=>{

    return (
    <ListContainer>
        <ListStateText>작성 중</ListStateText>
        <NewAddHorizontalScrollComponent/>
        <ListStateText>작성 완료</ListStateText>
        <HorizontalScrollComponent/>
    </ListContainer>
    );
};
export {BookListItemContainer};

