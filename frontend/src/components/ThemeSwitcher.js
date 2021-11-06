import "../components/ThemeSwitcher.css"
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs'
import { ThemeStateContext } from '../contexts/ThemeState'
import { useContext } from 'react'

export default function ThemeSwitcher() {
    const themeState = useContext(ThemeStateContext);

    function toggleTheme() {
        themeState.setDark(!themeState.light);

        let currentTheme = document.documentElement.getAttribute("data-theme");
        let switchToTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", switchToTheme);
    }

    return (
        <div className="theme-switcher">
            <p onClick={toggleTheme}>
            {themeState.light ? <BsSunFill className="button"/> : <BsFillMoonFill className="button"/>}
            </p>
        </div>
    )
}