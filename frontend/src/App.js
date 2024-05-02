// src/App.js
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import MainPage from "./pages/main/MainPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import IntroducePage from "./pages/introduce/IntroducePage";
import StorageNovelPage from "./pages/storageNovel/StorageNovelPage";
import StorageDrawBookPage from "./pages/storageDrawBook/StorageDrowBookPage";
import StorageDiaryPage from "./pages/storageDiary/StorageDiaryPage";
import StorageExchangeDiaryPage from './pages/storageExchangeDiary/StorageExchangeDiaryPage';
import StorageRecommendPage from './pages/storageRecommend/StorageRecommendPage';
import WriteNovelPage from "./pages/writeNovel/WriteNovelPage";
import WriteDrawBookPage from './pages/writeDrawBook/WriteDrawBookPage';

import {Helmet} from "react-helmet";
import CreateDiaryPage from "./pages/storageDiary/CreateDiaryPage";
import {StyleProvider} from "./pages/Context/Context";

function App() {

    return (
        <StyleProvider>
            <BrowserRouter>
                <Helmet
                    titleTemplate='%s - BlueMemories'
                    defaultTitle='BlueMemories'
                >
                    <meta name="description" content="A BlueMemories application"/>
                </Helmet>
                <Routes>
                    {/* main */}
                    <Route path="/" element={<MainPage />} />
                    {/* <SignIn /> */}
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <LogIn /> */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Introduce /> */}
                    <Route path="/introduce" element={<IntroducePage />} />
                    {/* <StorageNovel /> */}
                    <Route path="/storageNovel" element={<StorageNovelPage />} />
                    {/* <StorageDrawBook /> */}
                    <Route path="/storageDrawBook" element={<StorageDrawBookPage />} />
                    {/* <StorageDiary /> */}
                    <Route path="/storageDiary" element={<StorageDiaryPage />} />
                    {/* <StorageExchangeDiary /> */}
                    <Route path="/storageExchangeDiary" element={<StorageExchangeDiaryPage />} />
                    {/* <StorageRecommend /> */}
                    <Route path="/storageRecommend" element={<StorageRecommendPage />} />
                    {/* <WriteNovel /> */}
                    <Route path="/WriteNovel" element={<WriteNovelPage />} />
                    {/* <WriteDrawBook /> */}
                    <Route path="/WriteDrawBook" element={<WriteDrawBookPage />} />
                    {/* <DiaryTest /> */}
                    <Route path="/diaryWrite" element={<CreateDiaryPage />} />
                </Routes>
            </BrowserRouter>
        </StyleProvider>

    );
}

export default App;

