import styled from "styled-components";
import React, {useState} from "react";

const TitleSizeContainer= styled.div`
    width:99%;
    height: 7vw;
    left:0;
    margin-top:2%;
    /*도형 모양*/
    background-color: #80A691;
    border-radius: 6px;
    /*item 설정*/
    display: flex;
    flex-direction: column;
    position: relative;
`;
const TitleSizeText =styled.div`
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
const TitleSizeSlideBarContainer=styled.div`
    width: 90%;
    height:4.5vw;
    /*위치*/
    position: absolute;
    z-index: 1;
    margin-top:12%;
    margin-left:7%;
    /*item*/
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const TitleSizeNumber=styled.textarea`
    width: 15%;
    height: 45%;
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color:#163F2B;
    padding:2%;
    overflow:hidden;
    resize:none;
    /*네모칸*/
    background-color: #678C78;
    border-radius: 10%;
    border: none;
    outline: none;
`;
const SizePx=styled.div`
    margin-left: 3%;
    margin-right: 10%;
    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    user-select: none;
    color:#163F2B;
    
`;
const StyledSlider = styled.input`
  -webkit-appearance: none; /* 크롬, 사파리 등 */
  width: 60%;
  height: 30%;
  background: transparent;
  border-radius: 5px;
  outline: none;
    
  /* 슬라이더 핸들(Thumb) 스타일(동그라미) - Webkit(크롬, 사파리) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.2vw;
    height: 1.2vw;
    background: #1C4E37;
    cursor: pointer;
    border-radius: 50%;
      position: relative;
      top:-0.5vw;
      border: solid transparent 0.2vw;
  }
  /* 슬라이더 트랙(Track) 스타일 - Webkit(크롬, 사파리) */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 12%;
    background: #486E5C;
    border-radius: 5px;
  }
`;
const TextPxRangeContainer=styled.div`
    width: 56%;
    height: 20%;
    /*위치*/
    display: flex;
    justify-content: space-between;
    margin-top:26%;
    margin-left: 38%;
    position: absolute;
    z-index: 2;
`;
const TextPxRange = styled.div`
    /*텍스트 스타일*/
    font-size: 1.1vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    user-select: none;
    color:#4F7563;
`;

const TitleSize=({onChange})=>{
// 스크롤 값 상태
    const [scrollValue, setScrollValue] = useState(5);
    // textarea 값 상태
    const [textareaValue, setTextareaValue] = useState('5');

    // textarea 값 변경 시 호출되는 함수
    const handleTextareaChange = (event) => {
        const newValue = event.target.value;
        // 입력된 값이 숫자 && 글자수 3자 이하
        if (!isNaN(newValue)&& event.target.value.length<=3) {
            setScrollValue(parseInt(newValue)); // 스크롤 값 업데이트
            setTextareaValue(newValue); // textarea 값 업데이트
            handleTitleSizeChange(newValue);
        }

    };
    // 스크롤 값 변경 시 호출되는 함수 => onChange_사용자가 입력을 완료하고 벗어날 때 실행
    const handleScrollChange = (event) => {
        const newValue = parseInt(event.target.value);
        setScrollValue(newValue); // 스크롤 값 업데이트
        setTextareaValue(String(newValue)); // textarea 값 업데이트

    };
    // 스크롤바가 멈췄을때 함수 호출 => onInput_값이 변경될때 즉시 이벤트 발생(값이 실시간으로 변경되어야 하는 경우)
    const handleScrollStop=(event)=>{
        const newValue=parseInt(event.target.value);
        handleTitleSizeChange(newValue);
    }
    //제목 크기 전달
    const handleTitleSizeChange = (newValue)=>{
        onChange(newValue);
    }
    return(
        <TitleSizeContainer>
            <TitleSizeText>Title Size</TitleSizeText>
            <TitleSizeSlideBarContainer>
                <TitleSizeNumber
                    value={textareaValue}
                    onChange={handleTextareaChange}
                /><SizePx>px</SizePx>
                <StyledSlider
                    type="range"
                    min="2"
                    max="10"
                    value={scrollValue}
                    onChange={handleScrollChange}
                    onInput={handleScrollStop}
                />
            </TitleSizeSlideBarContainer>
            <TextPxRangeContainer>
                <TextPxRange>2</TextPxRange>
                <TextPxRange>10</TextPxRange>
            </TextPxRangeContainer>
        </TitleSizeContainer>
    )

}
export default TitleSize;