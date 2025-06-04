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

function LoadingPage() {
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
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentIndex, icons.length]);

  const currentIcon = icons[currentIndex];

  return (
    <div className="w-full pb-5 flex justify-center">
      <div className="flex flex-col justify-center items-center gap-10">
        <img
          className="w-[250px]"
          src={theme === "light" ? currentIcon.lightIcon : currentIcon.darkIcon}
          alt=""
          loading="lazy"
        />
        <div className="logo text-5xl text-shadow-lg">
          RealTime
          <span className="text-[var(--logoColor)] dark:text-[#909090]">
            Weather
          </span>
        </div>
        <button>
          <span className="block w-[200px] py-2 text-2xl font-semibold tracking-wide bg-[image:var(--bg-loading-btn)] dark:bg-[image:var(--bg-dark-loading-btn)] text-[#fff] rounded-full">
            Loading
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoadingPage;
