import React, { useEffect, useState } from "react";
import { Navbar, WeatherCard, WeatherDetails, LoadingPage } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/weatherDataSlice";

let api_key = import.meta.env.VITE_API_KEY;

function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [input, setInput] = useState("");
  const [tempFahrenheit, setTempFahrenheit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const storedWeatherData = useSelector((state) => state.weatherData.data);
  const dispatch = useDispatch();

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        const currentDay = new Intl.DateTimeFormat("en-US", {
          timeZone: data?.location.tz_id,
          weekday: "long",
        })
          .format(new Date())
          .toUpperCase();

        const currentDate = new Intl.DateTimeFormat("en-US", {
          timeZone: data.location.tz_id,
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date());

        const currentTime = new Intl.DateTimeFormat("en-US", {
          timeZone: data.location.tz_id,
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date());

        const weatherDetails = {
          city: data.location.name,
          country: data.location.country.toUpperCase(),
          windSpeed: data.current.wind_kph,
          humidity: data.current.humidity,
          temperature: tempFahrenheit
            ? Math.floor(data.current.temp_f)
            : Math.floor(data.current.temp_c),
          feelsTemp: tempFahrenheit
            ? Math.floor(data.current.feelslike_f)
            : Math.floor(data.current.feelslike_c),
          date: currentDate,
          condition: data.current.condition.text,
          day: currentDay,
          time: currentTime,
        };

        const existing = storedWeatherData;
        const alreadyExists = existing.some(
          (item) => item.city === weatherDetails.city
        );

        if (!alreadyExists) {
          const updated = [...existing, weatherDetails];
          dispatch(setData(updated));
        }
        setWeatherData(weatherDetails);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (city) => {
    setInput("");
    const formattedCity = city.trim().toLowerCase();

    fetchWeatherData(formattedCity);
  };

  useEffect(() => {
    handleCitySearch("New Delhi");
  }, [tempFahrenheit]);

  return (
    <div className="max-w-[1280px] w-full min-h-full px-5">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-3 pb-10 min-xl:flex-row min-xl:items-center min-xl:gap-30">
        <>
          {loading ? (
            <LoadingPage />
          ) : (
            <WeatherCard
              data={weatherData}
              tempFahrenheit={tempFahrenheit}
              setTempFahrenheit={setTempFahrenheit}
            />
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
