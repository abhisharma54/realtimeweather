import { useSelector } from "react-redux";
import { SearchIcon, SearchDarkIcon } from "./assets";
import React from "react";

function InputField({ input, setInput, handleCitySearch }) {
  const theme = useSelector((state) => state.theme.mode);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCitySearch(input);
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

export default React.memo(InputField);
