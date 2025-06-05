import React, { useEffect, useState } from "react";
import { Navbar, WeatherCard, WeatherDetails, PreFetchUI } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/weatherDataSlice";

let api_key = import.meta.env.VITE_API_KEY;

function WeatherPage() {
  const [weatherData, setWeatherData] = useState({});
  const [input, setInput] = useState("");
  const [tempFahrenheit, setTempFahrenheit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState("");

  const storedWeatherData = useSelector((state) => state.weatherData.data);
  const dispatch = useDispatch();

  const fetchWeatherData = async (city) => {
    setError("");
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        return;
      }
      const { tz_id, name, country } = data.location;
      const {
        temp_c,
        temp_f,
        wind_kph,
        humidity,
        feelslike_f,
        feelslike_c,
        condition,
      } = data.current;

      const currentDay = new Intl.DateTimeFormat("en-US", {
        timeZone: tz_id,
        weekday: "long",
      })
        .format(new Date())
        .toUpperCase();

      const currentDate = new Intl.DateTimeFormat("en-US", {
        timeZone: tz_id,
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date());

      const currentTime = new Intl.DateTimeFormat("en-US", {
        timeZone: tz_id,
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());

      const weatherDetails = {
        city: name,
        country: country.toUpperCase(),
        windSpeed: wind_kph,
        humidity: humidity,
        temperature: tempFahrenheit ? Math.floor(temp_f) : Math.floor(temp_c),
        feelsTemp: tempFahrenheit
          ? Math.floor(feelslike_f)
          : Math.floor(feelslike_c),
        date: currentDate,
        condition: condition.text,
        day: currentDay,
        time: currentTime,
      };

      const removeExistingData = storedWeatherData.filter(
        (item) => item.city !== weatherDetails.city
      );
      const updatedData = [...removeExistingData, weatherDetails];

      dispatch(setData(updatedData));
      setWeatherData(weatherDetails);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching weather:", error);
    }
  };

  const handleCitySearch = (city) => {
    const formattedCity = city.trim().toLowerCase();
    if (!formattedCity) {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
      return;
    }
    setInput("");
    fetchWeatherData(formattedCity);
  };

  useEffect(() => {
    if (input.trim() !== "" || storedWeatherData.length > 0) {
      const lastSearchCity =
        storedWeatherData[storedWeatherData.length - 1]?.city;
      handleCitySearch(input || lastSearchCity);
    }
  }, [tempFahrenheit]);

  return (
    <div className="max-w-[1280px] w-full min-h-full px-5">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-3 pb-10 min-xl:flex-row min-xl:items-center min-xl:gap-30">
        <>
          {Object.keys(weatherData).length ? (
            <WeatherCard
              data={weatherData}
              tempFahrenheit={tempFahrenheit}
              setTempFahrenheit={setTempFahrenheit}
            />
          ) : (
            <PreFetchUI />
          )}
          <WeatherDetails
            data={weatherData}
            input={input}
            setInput={setInput}
            handleCitySearch={handleCitySearch}
            error={error}
            inputError={inputError}
            setInputError={setInputError}
          />
        </>
      </div>
    </div>
  );
}

export default WeatherPage;
