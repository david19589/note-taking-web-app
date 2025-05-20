import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import homeSvg from "../../assets/icon-home.svg";
import archiveSvg from "../../assets/icon-archive.svg";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import tagsSvg from "../../assets/icon-tag.svg";
import HomeSvgSelected from "../../assets/icons/home_svg_selected";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import ArchiveSvgSelected from "../../assets/icons/archive_svg_selected";
import TagSvgSelectedDesktop from "../../assets/icons/tag_svg_selected_desktop";
import { useUIStore } from "../../stores/useUIStore";
import { useNotesStore } from "../../stores/useNotesStore";
import clsx from "clsx";

function MainSidebarDesktop(props: {
  selected: string;
  setSelected: (status: string) => void;
  setOpenSettings: (status: boolean) => void;
  setTag: (status: string) => void;
}) {
  const { notes } = useNotesStore();
  const { darkMode } = useUIStore();

  const uniqueTags = Array.from(
    new Set(
      notes.flatMap((note) => note.tags || []).map((tag) => tag.toLowerCase())
    )
  );

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const handleTagClick = (tag: string) => {
    props.setSelected(tag);
    props.setTag(tag);
    localStorage.setItem("tag", tag);
    props.setOpenSettings(false);
  };

  return (
    <div className="max-w-[17rem] w-full px-[1rem] py-[1.5rem]">
      <img
        src={darkMode ? whiteLogoSvg : logoSvg}
        alt="logoSvg"
        className="select-none mb-[2rem]"
      />
      <div className="flex flex-col gap-[0.5rem]">
        <button
          onClick={() => {
            props.setSelected("allNotes");
            props.setOpenSettings(false);
          }}
          className={clsx(
            props.selected === "allNotes"
              ? darkMode
                ? "bg-[#bfc4d11e]"
                : "bg-[#2b303b15]"
              : darkMode
              ? "hover:bg-[#bfc4d113]"
              : "hover:bg-[#2b303b07]",
            "flex items-center justify-between px-[0.7rem] py-[0.5rem] w-full rounded-lg cursor-pointer group"
          )}
        >
          <div className="flex items-center gap-[0.5rem]">
            {props.selected === "allNotes" ? (
              <HomeSvgSelected />
            ) : (
              <img src={homeSvg} alt="homeSvg" className="select-none" />
            )}
            <h2
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              All Notes
            </h2>
          </div>
          <div
            className={clsx(
              props.selected === "allNotes" ? "flex" : "hidden group-hover:flex"
            )}
          >
            {darkMode ? (
              <ArrowLeftDetailsDarkMode className="rotate-180" />
            ) : (
              <img
                src={arrowLeftSvg}
                alt="arrowLeftSvg"
                className="select-none rotate-180"
              />
            )}
          </div>
        </button>
        <button
          onClick={() => {
            props.setSelected("archivedNotes");
            props.setOpenSettings(false);
          }}
          className={clsx(
            props.selected === "archivedNotes"
              ? darkMode
                ? "bg-[#bfc4d11e]"
                : "bg-[#2b303b15]"
              : darkMode
              ? "hover:bg-[#bfc4d113]"
              : "hover:bg-[#2b303b07]",
            "flex items-center justify-between px-[0.7rem] py-[0.5rem] w-full rounded-lg cursor-pointer group"
          )}
        >
          <div className="flex items-center gap-[0.5rem]">
            {props.selected === "archivedNotes" ? (
              <ArchiveSvgSelected />
            ) : (
              <img src={archiveSvg} alt="archiveSvg" className="select-none" />
            )}
            <h2
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              Archived Notes
            </h2>
          </div>
          <div
            className={clsx(
              props.selected === "archivedNotes"
                ? "flex"
                : "hidden group-hover:flex"
            )}
          >
            {darkMode ? (
              <ArrowLeftDetailsDarkMode className="rotate-180" />
            ) : (
              <img
                src={arrowLeftSvg}
                alt="arrowLeftSvg"
                className="select-none rotate-180"
              />
            )}
          </div>
        </button>
      </div>
      <span
        className={clsx(
          darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
          "flex h-[0.0625rem] w-full mt-[0.5rem]"
        )}
      />
      <div className="mt-[1.25rem]">
        <h2
          className={clsx(
            darkMode ? "text-[#717784]" : "text-[#717784]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
          )}
        >
          Tags
        </h2>
        <div className="h-[calc(100vh-15.5rem)] mt-[0.5rem]">
          {uniqueTags.map((tag, index) => (
            <button
              onClick={() => handleTagClick(tag)}
              key={index}
              className={clsx(
                props.selected === tag
                  ? darkMode
                    ? "bg-[#bfc4d11e]"
                    : "bg-[#2b303b15]"
                  : darkMode
                  ? "hover:bg-[#bfc4d113]"
                  : "hover:bg-[#2b303b07]",
                "flex items-center justify-between px-[0.7rem] py-[0.5rem] max-w-[10rem] w-full rounded-lg cursor-pointer outline-none group"
              )}
            >
              <div className="flex items-center gap-[0.5rem] w-[calc(100%-1rem)]">
                {props.selected === tag ? (
                  <TagSvgSelectedDesktop />
                ) : (
                  <img
                    src={tagsSvg}
                    alt="tagsSvg"
                    className="w-[1rem] select-none"
                  />
                )}

                <h2
                  className={clsx(
                    tag.length > 5 && "overflow-x-scroll custom-scrollbar2",
                    darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] text-nowrap w-[calc(100%-2rem)] text-start"
                  )}
                >
                  {capitalize(tag)}
                </h2>
              </div>
              <div
                className={clsx(
                  props.selected === tag ? "flex" : "hidden group-hover:flex"
                )}
              >
                {darkMode ? (
                  <ArrowLeftDetailsDarkMode className="rotate-180" />
                ) : (
                  <img
                    src={arrowLeftSvg}
                    alt="arrowLeftSvg"
                    className="select-none rotate-180"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainSidebarDesktop;
