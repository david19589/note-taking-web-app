import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";
import sunSvg from "../../assets/icon-sun.svg";
import moonSvg from "../../assets/icon-moon.svg";
import SunSvgDarkMode from "../../assets/icons/sun_svg_dark_mode";
import { useState } from "react";
import MoonSvgDarkMode from "../../assets/icons/moon_svg_dark_mode";

function ChangeThemeDesktop() {
  const { darkMode, setDarkMode } = useUIStore();

  const [selected, setSelected] = useState(darkMode ? "dark" : "light");

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#0E121B]" : "bg-[#FFF]",
        "w-full max-w-[33rem] h-[calc(100vh-10rem)] ml-[1rem] mt-[1.25rem] px-[1rem]"
      )}
    >
      <h1
        className={clsx(
          darkMode ? "text-[#FFF]" : "text-[#0E121B]",
          "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[0.5rem]"
        )}
      >
        Color Theme
      </h1>
      <p
        className={clsx(
          darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
          "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] mb-[1.5rem]"
        )}
      >
        Choose your color theme:
      </p>
      <div className="w-full [21.5rem]">
        <button
          onClick={() => {
            setSelected("light");
            setDarkMode(false);
          }}
          className={clsx(
            selected === "light"
              ? darkMode
                ? "bg-[#232530] border-[#2B303B] cursor-default"
                : "bg-[#F3F5F8] border-[#E0E4EA] cursor-default"
              : darkMode
              ? "bg-[#232530] border-[#2B303B] hover:bg-[#2325309f] cursor-pointer"
              : "bg-[#F3F5F8] border-[#E0E4EA] hover:bg-[#d3d5d854] cursor-pointer",
            "flex items-center justify-between gap-[0.375rem] w-full outline-none border-[0.0625rem] mb-[1rem] rounded-2xl p-[1rem]"
          )}
        >
          <div className="flex items-center gap-[0.375rem]">
            {darkMode ? (
              <SunSvgDarkMode
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "w-[2.52375rem] h-[2.52375rem] p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl"
                )}
              />
            ) : (
              <img
                src={sunSvg}
                alt="sunSvg"
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl select-none"
                )}
              />
            )}
            <div className="flex flex-col items-start gap-[0.125rem]">
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Light Mode
              </h3>
              <p
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start"
                )}
              >
                Pick a clean and classic light theme
              </p>
            </div>
          </div>
          <span
            className={clsx(
              selected === "light"
                ? "border-[#335CFF] border-[0.25rem]"
                : "border-[#E0E4EA] border-[0.125rem]",
              "flex w-[1rem] h-[1rem] rounded-full"
            )}
          />
        </button>
        <button
          onClick={() => {
            setSelected("dark");
            setDarkMode(true);
          }}
          className={clsx(
            selected === "dark"
              ? darkMode
                ? "bg-[#232530] border-[#2B303B] cursor-default"
                : "bg-[#F3F5F8] border-[#E0E4EA] cursor-default"
              : darkMode
              ? "bg-[#232530] border-[#2B303B] hover:bg-[#2325309f] cursor-pointer"
              : "bg-[#F3F5F8] border-[#E0E4EA] hover:bg-[#d3d5d854] cursor-pointer",
            "flex items-center justify-between gap-[0.375rem] w-full outline-none border-[0.0625rem] mb-[1rem] rounded-2xl p-[1rem]"
          )}
        >
          <div className="flex items-center gap-[0.375rem]">
            {darkMode ? (
              <MoonSvgDarkMode
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl"
                )}
              />
            ) : (
              <img
                src={moonSvg}
                alt="moonSvg"
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl select-none"
                )}
              />
            )}
            <div className="flex flex-col items-start gap-[0.125rem]">
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Dark Mode
              </h3>
              <p
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start"
                )}
              >
                Select a sleek and modern dark theme
              </p>
            </div>
          </div>
          <span
            className={clsx(
              selected === "dark"
                ? "border-[#335CFF] border-[0.25rem]"
                : "border-[#E0E4EA] border-[0.125rem]",
              "flex w-[1rem] h-[1rem] rounded-full"
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default ChangeThemeDesktop;
