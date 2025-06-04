import React from "react";
import { ThemeModeButton } from "./index";

function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-3 py-4">
      <div className="logo text-3xl text-shadow-lg">
        RealTime
        <span className="text-[var(--logoColor)] dark:text-[#909090]">
          Weather
        </span>
      </div>
      <ThemeModeButton />
    </div>
  );
}

export default Navbar;
