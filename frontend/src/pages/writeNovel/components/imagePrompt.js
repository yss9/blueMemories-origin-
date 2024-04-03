import styled from "styled-components";

const ImagePromptTextContainer= styled.div`
    width:99%;
    height: 15vw;
    left:0;
    margin-top:1%;
    /*도형 모양*/
    background-color: #80A691;
    border-radius: 6px;
    /*item 설정*/
    display: flex;
    flex-direction: column;
`;
const PromptTitle =styled.div`
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    text-decoration:underline;
    text-decoration-color: #1C4E37;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
    user-select: none;
    /*크기*/
    height: auto;
    width: auto;
    /*색상*/
    color: #1C4E37;
    opacity: 0.74;
    /*위치*/
    margin-left:1.5vw;
    margin-top:0.5vw;
`;
const PromptTextarea = styled.textarea`
    width: 92%;
    height: 70%;
    margin-left: 4%;
    margin-top:3%;
    /*스타일*/
    background-color: transparent;
    border: none;
    outline:none;
    resize: none;
    /*텍스트 설정*/
    font-size: 1.5vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #163F2B;

    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        /*텍스트 설정*/
        font-size: 1.5vw;
        font-family: gangwonedusaeeum, sans-serif; //대체폰트
    }
`;
const ImagePrompt=()=>{
    return(
        <ImagePromptTextContainer>
            <PromptTitle>Prompt</PromptTitle>
            <PromptTextarea></PromptTextarea>
        </ImagePromptTextContainer>
    )

}
export default ImagePrompt;