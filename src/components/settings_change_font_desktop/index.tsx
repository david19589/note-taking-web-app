import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";
import { useState } from "react";

function ChangeFontDesktop() {
  const { darkMode, font, setFont } = useUIStore();

  const [selected, setSelected] = useState(font);

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
            selected === "sans"
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
            <h2
              className={clsx(
                darkMode
                  ? "bg-[#0E121B] text-[#FFF] border-[#2B303B]"
                  : "bg-[#FFF] border-[#E0E4EA]",
                "p-[0.45rem] border-[0.0625rem] rounded-xl select-none font-sans"
              )}
            >
              Aa
            </h2>
            <div className="flex flex-col items-start gap-[0.125rem]">
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] font-sans"
                )}
              >
                Sans-serif
              </h3>
              <p
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start font-sans"
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
            selected === "serif"
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
            <h2
              className={clsx(
                darkMode
                  ? "bg-[#0E121B] text-[#FFF] border-[#2B303B]"
                  : "bg-[#FFF] border-[#E0E4EA]",
                "p-[0.45rem] border-[0.0625rem] rounded-xl select-none font-serif"
              )}
            >
              Aa
            </h2>
            <div className="flex flex-col items-start gap-[0.125rem]">
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] font-serif"
                )}
              >
                Serif
              </h3>
              <p
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-serif text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start font-serif"
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
            selected === "monospace"
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
            <h2
              className={clsx(
                darkMode
                  ? "bg-[#0E121B] text-[#FFF] border-[#2B303B]"
                  : "bg-[#FFF] border-[#E0E4EA]",
                "p-[0.45rem] border-[0.0625rem] rounded-xl select-none font-mono"
              )}
            >
              Aa
            </h2>
            <div className="flex flex-col items-start gap-[0.125rem]">
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] font-mono"
                )}
              >
                Monospace
              </h3>
              <p
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-serif text-[0.75rem] leading-[0.875rem] tracking-[-0.0125rem] font-[400] text-start font-mono"
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
  );
}

export default ChangeFontDesktop;
