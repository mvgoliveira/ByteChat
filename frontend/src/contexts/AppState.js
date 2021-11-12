import React, { useState, createContext } from "react";

export const AppStateContext = createContext(); 



export default function AppState(props){
    const [mute, setMute] = useState(true);
    const [cam, setVisible] = useState(true);
    const appState = {
        mute, setMute,
        cam, setVisible,
        peopleconnected: 0,
    };
    
    return (
        <AppStateContext.Provider value={appState}>
            {props.children}
        </AppStateContext.Provider>
    );
}