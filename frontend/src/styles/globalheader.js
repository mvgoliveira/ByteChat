import Sun from "illustrations/Sun.svg";
import Moon from "illustrations/Moon.svg";
import React, { useContext } from 'react';
import { ThemeStateContext } from 'components/ThemeState.js'

function Global_header() {
    const themeState = useContext(ThemeStateContext);
    function toggleTheme() {
        themeState.setDark(!themeState.light);
    }

    return (
        <div className="header">
            <img className="themebutton" src={themeState.light ? Sun : Moon} onClick={toggleTheme}></img>
        </div>
    )
}
export default Global_header;