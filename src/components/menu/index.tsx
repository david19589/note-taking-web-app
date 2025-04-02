import clsx from "clsx";
import homeSvg from "../../assets/icon-home.svg";
import searchSvg from "../../assets/icon-search.svg";
import archiveSvg from "../../assets/icon-archive.svg";
import tagsSvg from "../../assets/icon-tag.svg";
import settingsSvg from "../../assets/icon-settings.svg";
import { useEffect, useState } from "react";
import HomeSvgSelected from "../../assets/icons/home_svg_selected";
import SearchSvgSelected from "../../assets/icons/search_svg_selected";
import ArchiveSvgSelected from "../../assets/icons/archive_svg_selected";
import TagSvgSelected from "../../assets/icons/tag_svg_selected";
import SettingSvgSelected from "../../assets/icons/setting_svg_selected";

function Menu(props: { darkMode: boolean }) {
  const defaultState = {
    home: true,
    search: false,
    archive: false,
    tags: false,
    settings: false,
  };

  const [selected, setSelected] = useState(() => {
    const stored = localStorage.getItem("selectedMenu");
    return stored ? JSON.parse(stored) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem("selectedMenu", JSON.stringify(selected));
  }, [selected]);

  const handleSelect = (menu: keyof typeof selected) => {
    setSelected({
      home: false,
      search: false,
      archive: false,
      tags: false,
      settings: false,
      [menu]: true,
    });
  };

  return (
    <div
      className={clsx(
        props.darkMode ? "bg-[#0E121B]" : "bg-[#FFF]",
        "lg:hidden flex"
      )}
    >
      <div
        className={clsx(
          props.darkMode
            ? "bg-[#0E121B] border-[#232530]"
            : "bg-[#FFF] border-[#E0E4EA]",
          "flex justify-between px-[1rem] py-[0.75rem] w-full absolute bottom-0 border-t-[0.1rem] drop-shadow-lg"
        )}
      >
        <button
          onClick={() => {
            handleSelect("home");
          }}
          className={clsx(
            selected.home
              ? props.darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : props.darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selected.home ? (
            <HomeSvgSelected />
          ) : (
            <img
              src={homeSvg}
              alt="homeSvg"
              className="md:mb-[0.25rem] select-none"
            />
          )}
          <h3
            className={clsx(
              selected.home
                ? "text-[#335CFF]"
                : props.darkMode
                ? "text-[#99A0AE]"
                : "text-[#717784]",
              "md:flex hidden text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
            )}
          >
            Home
          </h3>
        </button>
        <span
          className={clsx(
            props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelect("search");
          }}
          className={clsx(
            selected.search
              ? props.darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : props.darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selected.search ? (
            <SearchSvgSelected />
          ) : (
            <img
              src={searchSvg}
              alt="searchSvg"
              className="md:mb-[0.25rem] select-none"
            />
          )}
          <h3
            className={clsx(
              selected.search
                ? "text-[#335CFF]"
                : props.darkMode
                ? "text-[#99A0AE]"
                : "text-[#717784]",
              "md:flex hidden text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
            )}
          >
            Search
          </h3>
        </button>
        <span
          className={clsx(
            props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelect("archive");
          }}
          className={clsx(
            selected.archive
              ? props.darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : props.darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selected.archive ? (
            <ArchiveSvgSelected />
          ) : (
            <img
              src={archiveSvg}
              alt="archiveSvg"
              className="md:mb-[0.25rem] select-none"
            />
          )}
          <h3
            className={clsx(
              selected.archive
                ? "text-[#335CFF]"
                : props.darkMode
                ? "text-[#99A0AE]"
                : "text-[#717784]",
              "md:flex hidden text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
            )}
          >
            Archived
          </h3>
        </button>
        <span
          className={clsx(
            props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelect("tags");
          }}
          className={clsx(
            selected.tags
              ? props.darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : props.darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selected.tags ? (
            <TagSvgSelected />
          ) : (
            <img
              src={tagsSvg}
              alt="tagsSvg"
              className="md:mb-[0.25rem] select-none"
            />
          )}
          <h3
            className={clsx(
              selected.tags
                ? "text-[#335CFF]"
                : props.darkMode
                ? "text-[#99A0AE]"
                : "text-[#717784]",
              "md:flex hidden text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
            )}
          >
            Tags
          </h3>
        </button>
        <span
          className={clsx(
            props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelect("settings");
          }}
          className={clsx(
            selected.settings
              ? props.darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : props.darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selected.settings ? (
            <SettingSvgSelected />
          ) : (
            <img
              src={settingsSvg}
              alt="settingsSvg"
              className="md:mb-[0.25rem] select-none"
            />
          )}
          <h3
            className={clsx(
              selected.settings
                ? "text-[#335CFF]"
                : props.darkMode
                ? "text-[#99A0AE]"
                : "text-[#717784]",
              "md:flex hidden text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
            )}
          >
            Settings
          </h3>
        </button>
      </div>
    </div>
  );
}

export default Menu;
