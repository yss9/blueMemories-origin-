import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// styled-components 정의 (ModalOverlay, ModalContent, SearchBox, Input, Button, SearchButton 등을 정의합니다.)
const Button = styled.button`
    margin: 20px;
    padding: 10px 20px;
    font-size: 1.5vh;
    cursor: pointer;
    border: none;
    font-family: GangwonEduSaeeum;
    z-index: 1001;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
    z-index: 1001;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1001;
`;

const Input = styled.input`
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    width: 80%;
    z-index: 1001;
`;

const SearchBox = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    z-index: 1001;
`

const SearchButton = styled.button`
    width: 1.5vh;
    height: 1.5vh;
    background-image: url("/resourcesPng/storagePage/searchButton.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-color:transparent;
    border: none;
    z-index: 1001;
`
const Modal = ({ onClose }) => {
    const [memberId, setMemberId] = useState('');
    const [nickname, setNickname] = useState('');
    const [title, setTitle]=useState('');
    const [sender, setSender]=useState('');
    const [receiver, setReceiver] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleMemberInputChange = (event) => {
        setMemberId(event.target.value);
    }

    const handleTitleInputChange = (e) =>{
        setTitle(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/request-exDiary', {
                title: title,
                sender: sender,
                receiver: receiver
            });
            console.log('Response:', response.data);
            alert('요청이 완료되었습니다.');
            onClose();

        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    const searchMember = () => {
        axios.get('http://localhost:8080/api/search-member', {
            params: {
                memberId: memberId
            }
        })
            .then(response => {
                if (response.data) {
                    setNickname(response.data);
                    setReceiver(memberId);
                    setSender("kim123");
                } else {
                    setNickname('친구가 존재하지 않습니다');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <label>친구 아이디 검색</label>
                <SearchBox>
                    <Input
                        value={memberId}
                        onChange={handleMemberInputChange}
                    />
                    <SearchButton onClick={searchMember}></SearchButton>
                </SearchBox>
                <div style={{ paddingBottom: "1vh" }}>유저 닉네임 : {nickname}</div>
                <label>일기 표지 제목</label>
                <Input
                    value={title}
                    onChange={handleTitleInputChange}
                />
                <div>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={handleSubmit}>교환 일기 신청
                    </Button>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
