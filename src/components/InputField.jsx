import React from "react";
import { useSelector } from "react-redux";
import { SearchIcon, SearchDarkIcon } from "./assets";

function InputField({ input, setInput, handleCitySearch, setInputError }) {
  const theme = useSelector((state) => state.theme.mode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      handleCitySearch(input);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        type="text"
        className="w-full px-3 py-2 bg-[#2eafff] dark:bg-[#606060] text-white rounded-md outline-none border border-transparent focus:border-white"
        placeholder="search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <img
          className="w-[40px] transition duration-100 ease-in hover:scale-110 cursor-pointer"
          src={theme === "light" ? SearchIcon : SearchDarkIcon}
          alt=""
          loading="lazy"
        />
      </button>
    </form>
  );
}

export default InputField;
