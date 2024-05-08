import styled from "styled-components";
import {useContext} from "react";
import {Context} from "../../../Context/Context";

const ImagePromptTextContainer= styled.div`
    width:99%;
    height: 10vw;
    left:0;
    margin-top:1%;
    /*도형 모양*/
    background-color: #3E6B57;
    border:1px solid #356650;
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
    text-underline-offset: 2px;
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
    width: 85%;
    height: 50%;
    margin-left: 7%;
    margin-top:7%;
    /*스타일*/
    background-color: transparent;
    border: none;
    outline:none;
    resize: none;
    /*텍스트 설정*/
    font-size: 1.5vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #80A691;
    overflow: hidden; /* 스크롤바 숨김 */
    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        /*텍스트 설정*/
        font-size: 1.5vw;
        font-family: gangwonedusaeeum, sans-serif; //대체폰트
        overflow: hidden; /* 스크롤바 숨김 */
    }
    &::placeholder{
        color: #80A691;
        opacity: 0.5;
    }
`;
const TitlePrompt=({onChange})=>{
    const {setCoverTitle}=useContext(Context);
   const handleChange = (event) => {
       const title=event.target.value;
       onChange(title); // 입력된 값으로 콜백 함수 호출
       setCoverTitle(title);
   };
   const handleKeyDown=(event)=>{
       if(event.key ==='Enter'){
           //기본 엔터키 동작 막음
           // event.preventDefault()
           onChange(event.target.value+'\n'); // 입력된 값으로 콜백 함수 호출
       }
   };
    return(
        <ImagePromptTextContainer>
            <PromptTitle>Title</PromptTitle>
            <PromptTextarea
                placeholder="제목을 입력하고 마우스로 위치를 조절하세요"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </ImagePromptTextContainer>
    );

}
export default TitlePrompt;