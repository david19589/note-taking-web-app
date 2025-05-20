import searchSvg from "../../assets/icon-search.svg";
import settingsSvg from "../../assets/icon-settings.svg";
import clsx from "clsx";
import { useUIStore } from "../../stores/useUIStore";
import { noteDataTypes } from "../../utils/api";

function MainHeaderDesktop(props: {
  selected: string;
  setSelected: (status: string) => void;
  openSettings: boolean;
  setOpenSettings: (status: boolean) => void;
  setTag: (status: string) => void;
  setActiveNote: (status: noteDataTypes | undefined) => void;
  setOpenCreateNote: (status: boolean) => void;
}) {
  const { darkMode } = useUIStore();

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const handleOpenSettings = () => {
    props.setOpenSettings(true);
    props.setSelected("");
    props.setActiveNote(undefined);
    props.setOpenCreateNote(false);
  };

  return (
    <div className="flex items-center justify-between w-full px-[1rem] py-[1.5rem]">
      <div className="flex items-center gap-[0.5rem]">
        {props.openSettings ? (
          <h1
            className={clsx(
              darkMode ? "text-[#FFF]" : "text-[#0E121B]",
              "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700]"
            )}
          >
            Settings
          </h1>
        ) : (
          <h1
            className={clsx(
              darkMode ? "text-[#FFF]" : "text-[#0E121B]",
              "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700]"
            )}
          >
            {props.selected === "allNotes"
              ? "All Notes"
              : props.selected === "archivedNotes"
              ? "Archived Notes"
              : "Notes Tagged:"}
          </h1>
        )}
        {props.selected !== "allNotes" &&
          props.selected !== "archivedNotes" && (
            <h1
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] overflow-x-scroll custom-scrollbar2 max-w-[30rem]"
              )}
            >
              {capitalize(props.selected)}
            </h1>
          )}
      </div>
      <div className="flex items-center gap-[2rem] mr-[2rem]">
        <div className="relative max-w-[18.75rem] w-full">
          <img
            src={searchSvg}
            alt="searchSvg"
            className="absolute top-[0.75rem] left-[0.75rem]"
          />
          <input
            type="text"
            id="search"
            placeholder="Search by title, content, or tags…"
            onChange={(e) => {
              props.setSelected(e.target.value);
              props.setTag(e.target.value);
            }}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B] placeholder:text-[#99A0AE]"
                : "bg-[#F3F5F8] border-[#E0E4EA] placeholder:text-[#717784]",
              "text-[0.875rem] p-[0.75rem] border-[0.0625rem] rounded-lg outline-none pl-[2.5rem] w-full"
            )}
          />
        </div>
        <button
          onClick={handleOpenSettings}
          className="cursor-pointer w-[2rem] h-[2rem]"
        >
          <img
            src={settingsSvg}
            alt="settingsSvg"
            className={clsx(
              props.openSettings
                ? darkMode
                  ? "bg-[#bfc4d11e]"
                  : "bg-[#2b303b15]"
                : darkMode
                ? "hover:bg-[#bfc4d113]"
                : "hover:bg-[#2b303b07]",
              "select-none w-[2rem] h-[2rem] rounded-full"
            )}
          />
        </button>
      </div>
    </div>
  );
}
export default MainHeaderDesktop;
