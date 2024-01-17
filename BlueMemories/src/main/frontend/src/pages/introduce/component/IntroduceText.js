import styled from "styled-components";

const TitleContainer=styled.div`
    width: auto;
    height: auto;
    margin-top: 4.5%;
    margin-left:10%;
    margin-right:${(props)=>props.align || 'left'};
    /*item 정렬*/
    display: flex;
    flex-direction: column;
    gap:2.5%;
    text-align:${(props)=>props.align || 'left'};
`;
const Text=styled.div`
    font-size: ${(props) => props.fontsize || '1.2rem'};
    font-family: ${(props)=> props.fontfamily || 'bokklight' };
    line-height:2;
`;
const MovePageBtn=styled.button`
    background-color: ${(props)=>props.btncolor || '#359D39'};
    width: ${(props)=>props.width || '30%'};
    height:${(props)=>props.height || '8%'};
    border: none;
    border-radius: 30px;
    margin-top: 5%;
    /*텍스트*/
    color:white;
    font-family:bokkbold;
    font-size: 1.2rem;
    align-self: ${(props)=>props.btnalign || 'start'};
`;

export {TitleContainer,Text,MovePageBtn};