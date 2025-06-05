import React, { useState } from "react";
import { LoadingCloudyIcon } from "./assets";
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
} from "./assets";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PreFetchUI() {
  const theme = useSelector((state) => state.theme.mode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const icons = [
    {
      lightIcon: LoadingCloudyIcon,
      darkIcon: LoadingCloudyIcon,
    },
    {
      lightIcon: ClearSkyIcon,
      darkIcon: ClearSkyDarkIcon,
    },
    {
      lightIcon: DrizzleIcon,
      darkIcon: DrizzleDarkIcon,
    },
    {
      lightIcon: OvercastIcon,
      darkIcon: OvercastDarkIcon,
    },
    {
      lightIcon: MistIcon,
      darkIcon: MistDarkIcon,
    },
    {
      lightIcon: RainIcon,
      darkIcon: RainDarkIcon,
    },
    {
      lightIcon: ThunderIcon,
      darkIcon: ThunderDarkIcon,
    },
    {
      lightIcon: SunIcon,
      darkIcon: SunDarkIcon,
    },
  ];

  useEffect(() => {
    if (currentIndex < icons.length - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [currentIndex, icons.length]);

  const currentIcon = icons[currentIndex];

  return (
    <div className="w-full pb-5 flex justify-center">
      <div className="flex flex-col justify-center items-center gap-10 max-sm:gap-6">
        <img
          className="w-[250px]"
          src={theme === "light" ? currentIcon.lightIcon : currentIcon.darkIcon}
          alt=""
          loading="lazy"
        />
        <div className="logo text-5xl text-shadow-lg max-sm:text-4xl">
          RealTime
          <span className="text-[var(--logoColor)] dark:text-[#909090]">
            Weather
          </span>
        </div>
        <button>
          <span className="block px-6 py-2 text-2xl font-semibold tracking-wide bg-[image:var(--bg-loading-btn)] dark:bg-[image:var(--bg-dark-loading-btn)] text-white rounded-full max-sm:text-xl max-sm:font-medium">
            Search City Name
          </span>
        </button>
      </div>
    </div>
  );
}

export default PreFetchUI;
