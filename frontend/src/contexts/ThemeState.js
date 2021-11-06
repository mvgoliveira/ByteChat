import React, { useState, createContext } from "react";

export const ThemeStateContext = createContext(); 

export default function ThemeState(props){
    const [light, setDark] = useState(true);
    const themeState = {
        light, setDark,
    };
    
    return (
        <ThemeStateContext.Provider value={themeState}>
            {props.children}
        </ThemeStateContext.Provider>
    );
}