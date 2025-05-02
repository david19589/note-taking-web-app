import { Link } from "react-router-dom";
import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";
import Header from "../../components/header";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import Menu from "../../components/menu";
import { useState } from "react";

function ChangeFont() {
  const { darkMode, font, setFont } = useUIStore();

  const [selected, setSelected] = useState(font);

  return (
    <div className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}>
      <Header />
      <div className="mt-[1.25rem] px-[1rem]">
        <Link to="/settings" className="block w-max h-max group">
          <button className="flex items-center cursor-pointer outline-none mb-[1rem]">
            {darkMode ? (
              <ArrowLeftDetailsDarkMode />
            ) : (
              <img
                src={arrowLeftSvg}
                alt="arrowLeftSvg"
                className="select-none"
              />
            )}
            <h3
              className={clsx(
                darkMode
                  ? "text-[#CACFD8] group-hover:text-[#d3d3d3b0]"
                  : "text-[#0E121B] group-hover:text-[#0e121b71]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] transition-all duration-150"
              )}
            >
              Settings
            </h3>
          </button>
        </Link>
        <h1
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[0.5rem]"
          )}
        >
          Font Theme
        </h1>
        <p
          className={clsx(
            darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] mb-[1.5rem]"
          )}
        >
          Choose your font theme:
        </p>
        <div className="w-full">
          <button
            onClick={() => {
              setFont("sans");
              setSelected("sans");
            }}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B]"
                : "bg-[#F3F5F8] border-[#E0E4EA]",
              "flex items-center justify-between gap-[0.375rem] w-full outline-none cursor-pointer border-[0.0625rem] mb-[1rem] rounded-2xl p-[1rem]"
            )}
          >
            <div className="flex items-center gap-[0.375rem]">
              <h2
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl select-none"
                )}
              >
                Aa
              </h2>
              <div className="flex flex-col items-start gap-[0.125rem]">
                <h3
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                  )}
                >
                  Sans-serif
                </h3>
                <p
                  className={clsx(
                    darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                    "text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start"
                  )}
                >
                  Clean and modern, easy to read.
                </p>
              </div>
            </div>
            <span
              className={clsx(
                selected === "sans"
                  ? "border-[#335CFF] border-[0.25rem]"
                  : "border-[#E0E4EA] border-[0.125rem]",
                "flex w-[1rem] h-[1rem] rounded-full"
              )}
            />
          </button>
          <button
            onClick={() => {
              setFont("serif");
              setSelected("serif");
            }}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B]"
                : "bg-[#F3F5F8] border-[#E0E4EA]",
              "flex items-center justify-between gap-[0.375rem] w-full outline-none cursor-pointer border-[0.0625rem] mb-[1rem] rounded-2xl p-[1rem]"
            )}
          >
            <div className="flex items-center gap-[0.375rem]">
              <h2
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl select-none"
                )}
              >
                Aa
              </h2>
              <div className="flex flex-col items-start gap-[0.125rem]">
                <h3
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                  )}
                >
                  Serif
                </h3>
                <p
                  className={clsx(
                    darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                    "text-serif text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start"
                  )}
                >
                  Classic and elegant for a timeless feel.
                </p>
              </div>
            </div>
            <span
              className={clsx(
                selected === "serif"
                  ? "border-[#335CFF] border-[0.25rem]"
                  : "border-[#E0E4EA] border-[0.125rem]",
                "flex w-[1rem] h-[1rem] rounded-full"
              )}
            />
          </button>
          <button
            onClick={() => {
              setFont("monospace");
              setSelected("monospace");
            }}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B]"
                : "bg-[#F3F5F8] border-[#E0E4EA]",
              "flex items-center justify-between gap-[0.375rem] w-full outline-none cursor-pointer border-[0.0625rem] mb-[1rem] rounded-2xl p-[1rem]"
            )}
          >
            <div className="flex items-center gap-[0.375rem]">
              <h2
                className={clsx(
                  darkMode ? "bg-[#0E121B]" : "bg-[#FFF] border-[#E0E4EA]",
                  "p-[0.45rem] border-[0.0625rem] border-[#2B303B] rounded-xl select-none"
                )}
              >
                Aa
              </h2>
              <div className="flex flex-col items-start gap-[0.125rem]">
                <h3
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                  )}
                >
                  Monospace
                </h3>
                <p
                  className={clsx(
                    darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                    "text-serif text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start"
                  )}
                >
                  Code-like, great for a technical vibe.
                </p>
              </div>
            </div>
            <span
              className={clsx(
                selected === "monospace"
                  ? "border-[#335CFF] border-[0.25rem]"
                  : "border-[#E0E4EA] border-[0.125rem]",
                "flex w-[1rem] h-[1rem] rounded-full"
              )}
            />
          </button>
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default ChangeFont;
