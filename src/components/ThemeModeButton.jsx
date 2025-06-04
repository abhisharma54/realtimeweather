import "./css/themeButton.css";
import { LightIcon, LightActiveIcon, DarkIcon, DarkActiveIcon } from "./assets";
import { useSelector, useDispatch } from "react-redux";
import { lightMode, darkMode } from "../store/themeSlice";
import { useEffect } from "react";

function ThemeModeButton() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = () => {
    if (theme === "dark") {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
    }
  };

  return (
    <>
      <input
        onChange={handleTheme}
        type="checkbox"
        className="theme"
        id="thememode-toggle"
        checked={theme === "dark"}
      />
      <label id="theme_label" htmlFor="thememode-toggle">
        <img
          className="thememode darkmode"
          src={theme === "dark" ? DarkActiveIcon : DarkIcon}
          alt="dark-theme-icon"
          loading="lazy"
        />
        <img
          className="thememode lightmode"
          src={theme === "light" ? LightActiveIcon : LightIcon}
          alt="light-theme-icon"
          loading="lazy"
        />
      </label>
    </>
  );
}

export default ThemeModeButton;
