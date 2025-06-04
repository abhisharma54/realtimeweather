import { useMemo } from "react";
import {
  ClearSkyDarkIcon,
  ClearSkyIcon,
  DrizzleDarkIcon,
  DrizzleIcon,
  MistDarkIcon,
  MistIcon,
  OvercastDarkIcon,
  OvercastIcon,
  RainDarkIcon,
  RainIcon,
  SunDarkIcon,
  SunIcon,
  ThunderDarkIcon,
  ThunderIcon,
  LocationIcon,
} from "./assets";
import { TempChangerButton } from "./index";
import { useSelector } from "react-redux";

function WeatherCard({ data, tempFahrenheit, setTempFahrenheit }) {
  const theme = useSelector((state) => state.theme.mode);

  const weatherIcons = {
    sunny: [SunIcon, SunDarkIcon],
    rain: [RainIcon, RainDarkIcon],
    mist: [MistIcon, MistDarkIcon],
    overcast: [OvercastIcon, OvercastDarkIcon],
    "light rain": [ThunderIcon, ThunderDarkIcon],
    drizzle: [DrizzleIcon, DrizzleDarkIcon],
    cloudy: [OvercastIcon, OvercastDarkIcon],
    clear: [ClearSkyIcon, ClearSkyDarkIcon],
  };

  const weatherIcon = useMemo(() => {
    const condition = data.condition?.toLowerCase();
    const iconKey = Object.keys(weatherIcons).find((weather) =>
      condition?.includes(weather)
    );
    return weatherIcons?.[iconKey]
      ? theme === "light"
        ? weatherIcons[iconKey][0]
        : weatherIcons[iconKey][1]
      : theme === "light"
      ? OvercastIcon
      : OvercastDarkIcon;
  }, [data.condition, theme]);

  return (
    <div className="card w-full max-w-[500px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <img
            className="w-[35px]"
            src={LocationIcon}
            alt="location-icon"
            loading="lazy"
          />
          <div>
            <h1 className="text-[1.4rem] font-medium leading-6 tracking-wider">
              {data.city || "City"}
            </h1>
            <p className="mt-0 tracking-wider text-md max-sm:text-sm">
              {data.country || "Country"}
            </p>
          </div>
        </div>
        <TempChangerButton
          tempFahrenheit={tempFahrenheit}
          setTempFahrenheit={setTempFahrenheit}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-7xl font-semibold">
          {data.temperature || 0}
          {tempFahrenheit ? "°F" : "°C"}
        </span>
        <span className="text-lg font-medium text-[#c3e6ff]">
          feels like {data.feelsTemp || 0}
          {tempFahrenheit ? "°F" : "°C"}
        </span>
      </div>
      <div className="flex justify-center">
        <img
          className="w-[150px]"
          src={weatherIcon}
          alt="weather-icon"
          loading="lazy"
        />
      </div>
      <p className="text-xl text-center font-normal">
        {data.condition || "Weather Condition"}
      </p>
      <h1 className="days -mt-4 text-4xl text-center font-bold">
        {data.day || "Weekday"}
      </h1>
    </div>
  );
}

export default WeatherCard;
