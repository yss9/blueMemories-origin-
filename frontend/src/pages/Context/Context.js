import React, { createContext, useState } from 'react';

export const Context = createContext(undefined);

export const StyleProvider = ({ children }) => {
    const [stableStyle, setStableStyle] = useState('fantasy-art'); //기본 style:fantasy
    const [stablePrompt, setStablePrompt]=useState('');
    const [novelOverlayState, setNovelOverlayState]=useState(false);

    return (
        <Context.Provider value={{ stableStyle, setStableStyle, stablePrompt, setStablePrompt,novelOverlayState, setNovelOverlayState}}>
            {children}
        </Context.Provider>
    );
};