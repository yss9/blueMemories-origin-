import React, { createContext, useState } from 'react';

export const Context = createContext(undefined);

export const StyleProvider = ({ children }) => {
    const [stableStyle, setStableStyle] = useState('fantasy-art'); //기본 style:fantasy
    const [stableImage, setStableImage]=useState('/resourcesPng/writeNovelPage/imageShowPanel.png');
    const [stablePrompt, setStablePrompt]=useState('');
    const [stableCoverStyle, setStableCoverStyle] = useState('fantasy-art'); //기본 style:fantasy
    const [stableCoverImage, setStableCoverImage]=useState('/resourcesPng/writeNovelPage/imageShowPanel.png');
    const [stableCoverPrompt, setStableCoverPrompt]=useState('');
    const [coverTitle, setCoverTitle] = useState('');
    const [coverTitlePxSize, setCoverTitlePxSize]=useState('50px');
    const [coverTitleStartPosition, setCoverTitleStartPosition] = useState({ x: 0, y: 0 });
    const [novelOverlayState, setNovelOverlayState]=useState(false);
    return (
        <Context.Provider value={{
            stableStyle, setStableStyle,
            stableImage, setStableImage,
            stablePrompt, setStablePrompt,
            stableCoverStyle, setStableCoverStyle,
            stableCoverImage, setStableCoverImage,
            stableCoverPrompt, setStableCoverPrompt,
            coverTitle, setCoverTitle,
            coverTitlePxSize, setCoverTitlePxSize,
            coverTitleStartPosition, setCoverTitleStartPosition,
            novelOverlayState, setNovelOverlayState}}>
            {children}
        </Context.Provider>
    );
};