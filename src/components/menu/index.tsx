import clsx from "clsx";
import homeSvg from "../../assets/icon-home.svg";
import searchSvg from "../../assets/icon-search.svg";
import archiveSvg from "../../assets/icon-archive.svg";
import tagsSvg from "../../assets/icon-tag.svg";
import settingsSvg from "../../assets/icon-settings.svg";
import HomeSvgSelected from "../../assets/icons/home_svg_selected";
import SearchSvgSelected from "../../assets/icons/search_svg_selected";
import ArchiveSvgSelected from "../../assets/icons/archive_svg_selected";
import TagSvgSelected from "../../assets/icons/tag_svg_selected";
import SettingSvgSelected from "../../assets/icons/setting_svg_selected";
import { useUIStore } from "../../stores/useUIStore";
import { useNavigate } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";

function Menu() {
  const { darkMode } = useUIStore();
  const { selectedOption, handleSelectedOption } = useNotesStore();

  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#0E121B]" : "bg-[#FFF]",
        "lg:hidden flex"
      )}
    >
      <div
        className={clsx(
          darkMode
            ? "bg-[#0E121B] border-[#232530]"
            : "bg-[#FFF] border-[#E0E4EA]",
          "flex justify-between px-[1rem] py-[0.75rem] w-full absolute bottom-0 border-t-[0.1rem] drop-shadow-lg"
        )}
      >
        <button
          onClick={() => {
            handleSelectedOption("home");
            navigate("/");
          }}
          className={clsx(
            selectedOption.home
              ? darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selectedOption.home ? (
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
              selectedOption.home
                ? "text-[#335CFF]"
                : darkMode
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
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelectedOption("search");
            navigate("/search");
          }}
          className={clsx(
            selectedOption.search
              ? darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selectedOption.search ? (
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
              selectedOption.search
                ? "text-[#335CFF]"
                : darkMode
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
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelectedOption("archive");
            navigate("/archived-notes");
          }}
          className={clsx(
            selectedOption.archive
              ? darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selectedOption.archive ? (
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
              selectedOption.archive
                ? "text-[#335CFF]"
                : darkMode
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
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelectedOption("tags");
            navigate("/tags");
          }}
          className={clsx(
            selectedOption.tags
              ? darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selectedOption.tags ? (
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
              selectedOption.tags
                ? "text-[#335CFF]"
                : darkMode
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
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "md:flex hidden h-[3.45rem] w-[0.0625rem]"
          )}
        />
        <button
          onClick={() => {
            handleSelectedOption("settings");
            navigate("/settings");
          }}
          className={clsx(
            selectedOption.settings
              ? darkMode
                ? "bg-[#2B303B]"
                : "bg-[#EBF1FF]"
              : darkMode
              ? "hover:bg-[#bfc4d11e]"
              : "hover:bg-[#2b303b15]",
            "md:py-[0.35rem] md:px-[1.5rem] flex flex-col items-center px-[0.7rem] py-[0.75rem] rounded-md cursor-pointer"
          )}
        >
          {selectedOption.settings ? (
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
              selectedOption.settings
                ? "text-[#335CFF]"
                : darkMode
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
