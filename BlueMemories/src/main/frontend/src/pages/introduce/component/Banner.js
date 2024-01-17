import styled from "styled-components";

////////////////////배너//////////////////////
const BannerContainer=styled.div`
    width: 47%;
    height: 60%;
    margin-top: 12%;
    margin-left:5%;
    /*item 정렬*/
    display: flex;
    flex-direction: column;
    
`;    
const BannerTop=styled.div`
    width: auto;
    height: 80%;
    display:flex;
    justify-content: space-around;
    align-items: center;
`;
const BannerBtn=styled.button`
    width:3%;
    height:20%;
    background-image: ${(props)=>props.img};
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    object-fit: cover;
    background-color:transparent;
`;
const BannerImage=styled.image`
    width:95%;
    height:100%;
    margin-left: 4%;
    margin-right: 4%;
    background-image: url("/resourcesPng/introducePage/diary_image1.png");
    background-size: contain;
    background-repeat: no-repeat;
`;
const BannerBottom=styled.div`
    width: auto;
    height: 10%;
    display:flex;
    justify-content: center;
    align-items: center;
    gap:5%;
    justify-content:center;
`;
const BannerRound=styled.image`
    width:2.5%;
    height:50%;
    background-image: url("/resourcesPng/introducePage/round_fill.png");
    background-size: contain;
    background-repeat: no-repeat;
`;

const BannerEvent = () => {
    return (
        <BannerContainer>
                            <BannerTop>
                                <BannerBtn img='url("/resourcesPng/introducePage/before_btn.png")'></BannerBtn>
                                <BannerImage></BannerImage>
                                <BannerBtn img='url("/resourcesPng/introducePage/next_btn.png")'></BannerBtn>
                            </BannerTop>
                            <BannerBottom>
                                <BannerRound></BannerRound>
                                <BannerRound></BannerRound>
                                <BannerRound></BannerRound>
                            </BannerBottom>
                        </BannerContainer>
    );
};
                
export {BannerEvent};