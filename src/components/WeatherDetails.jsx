import React, { useEffect, useState } from "react";
import { InputField } from "./index";
import {
  ArrowIcon,
  DateIcon,
  HumidityIcon,
  TimeIcon,
  WindIcon,
} from "./assets";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/weatherDataSlice";

function WeatherDetails({
  data,
  input,
  setInput,
  handleCitySearch,
  error,
  inputError,
  setInputError,
}) {
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearch, setShowRecentSearch] = useState(false);
  const [clearMessage, setClearMessage] = useState("");

  const storedWeatherData = useSelector((state) => state.weatherData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setWeatherDetails([
      {
        label: "Humidity",
        value: data?.humidity ? `${data?.humidity} %` : "",
        icon: HumidityIcon,
      },
      {
        label: "Date",
        value: data?.date || "",
        icon: DateIcon,
      },
      {
        label: "Time",
        value: data?.time || "",
        icon: TimeIcon,
      },
      {
        label: "Wind Speed",
        value: data.windSpeed ? `${data.windSpeed} kmph` : "",
        icon: WindIcon,
      },
    ]);
    setRecentSearches(storedWeatherData);
  }, [data]);

  const handleRecentSearch = () => {
    const cached = storedWeatherData;

    if (cached.length > 0) {
      dispatch(setData([]));
      setRecentSearches([]);
      setClearMessage("Recent searches have been cleared");
    } else {
      setClearMessage("Recent search city is already empty");
    }

    setTimeout(() => setClearMessage(""), 3000);
  };

  return (
    <div className="details w-full max-w-[500px] min-h-[400px] flex flex-col gap-2 bg-[var(--bg-details-card)] rounded-2xl border-2 border-blue-300 dark:bg-[var(--bg-details-dark-card)] dark:border-zinc-300 p-3 shadow-lg overflow-hidden">
      <InputField
        input={input}
        setInput={setInput}
        handleCitySearch={handleCitySearch}
        setInputError={setInputError}
      />
      {inputError ? (
        <p className="text-center text-[#c3d6ff] dark:text-[#d2d2d2]">
          Enter a city name
        </p>
      ) : error ? (
        <p className="text-center text-[#c3d6ff] dark:text-[#d2d2d2]">
          {error}
        </p>
      ) : null}
      <div className="recent-search w-full min-h-[50px] max-h-[200px] flex flex-col gap-2 justify-center p-2 bg-[var(--bg-input)] dark:bg-[var(--bg-dark-input)] rounded-md overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[#c3e6ff] dark:text-[#b2b2b2]">
            Recent Search
          </span>
          <button onClick={() => setShowRecentSearch((prev) => !prev)}>
            <img
              className={`w-[30px] ${
                showRecentSearch ? "rotate-x-180" : "rotate-x-0"
              } transition duration-150 ease-in hover:scale-110 cursor-pointer`}
              src={ArrowIcon}
              alt="arrow-icon"
              loading="lazy"
            />
          </button>
        </div>
        {showRecentSearch && (
          <div className="recent-cities-list flex flex-col gap-1 pb-5 overflow-auto">
            {recentSearches.length > 0 ? (
              recentSearches.map((search) => (
                <div
                  key={search.city}
                  className="flex flex-col gap-2 transition duration-100 ease-in hover:text-[#c3e6ff] dark:hover:text-[#bebebe] cursor-pointer"
                >
                  <button
                    className="flex cursor-pointer"
                    onClick={() => handleCitySearch(search.city)}
                  >
                    <span>{search.city}</span>
                  </button>
                  <span className="block w-full h-[2px] bg-[#94d6ff] dark:bg-[#b2b2b2]"></span>
                </div>
              ))
            ) : (
              <span className="text-sm text-[#94d6ff] dark:text-[#909090] text-center py-2">
                No cities in recent searches
              </span>
            )}
          </div>
        )}
      </div>
      <button
        onClick={handleRecentSearch}
        className="w-max px-3 py-2 bg-[#3fb5ff] dark:bg-[#606060] rounded-md hover:bg-[#21a2ff] dark:hover:bg-[#505050] cursor-pointer"
      >
        Clear Recent Search
      </button>
      {clearMessage && (
        <span className="text-center text-[#c3e6ff] dark:text-[#909090]">
          {clearMessage}
        </span>
      )}
      <div className="flex flex-col gap-3 mt-6">
        {/* Humidity */}
        {weatherDetails.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-3 py-2 rounded-md bg-[var(--bg-input)] dark:bg-[var(--bg-dark-input)]"
          >
            <div className="flex gap-1 items-center">
              <span>
                <img
                  className="w-[30px]"
                  src={item.icon}
                  alt={`${item.label}-icon`}
                  loading="lazy"
                />
              </span>
              <h1 className="text-xl font-medium">{item.label}</h1>
            </div>
            <span className="text-xl font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;
