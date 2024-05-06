import React, { createContext, useState } from 'react';

export const Context = createContext(undefined);

export const StyleProvider = ({ children }) => {
    const [stableStyle, setStableStyle] = useState('fantasy-art'); //기본 style:fantasy
    const [stableImage, setStableImage]=useState('/resourcesPng/writeNovelPage/imageShowPanel.png');
    const [stablePrompt, setStablePrompt]=useState('');
    const [novelOverlayState, setNovelOverlayState]=useState(false);
    return (
        <Context.Provider value={{ stableStyle, setStableStyle,stableImage, setStableImage, stablePrompt, setStablePrompt,novelOverlayState, setNovelOverlayState}}>
            {children}
        </Context.Provider>
    );
};