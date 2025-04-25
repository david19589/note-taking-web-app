import { Link, useParams } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";
import Header from "../../components/header";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import Menu from "../../components/menu";

function TagSelected() {
  const { tag } = useParams();
  const { notes } = useNotesStore();
  const { darkMode } = useUIStore();

  const filteredNotes = notes.filter((note) =>
    note.tags?.some((t) => t.toLowerCase() === tag?.toLowerCase())
  );

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}>
      <Header />
      <div className="mt-[1.25rem] px-[1rem]">
        <Link to="/tags" className="block w-max h-max group">
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
              Go Back
            </h3>
          </button>
        </Link>
        <h1
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem]"
          )}
        >
          Notes Tagged: {capitalize(tag || "")}
        </h1>
        <p
          className={clsx(
            darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] mb-[1rem]"
          )}
        >
          All notes with the “{capitalize(tag || "")}” tag are shown here.
        </p>
        {filteredNotes.map((note, index) => (
          <Link
            to={`/note/${note._id}`}
            key={index}
            className="flex flex-col my-[0.5rem] pl-[0.5rem] gap-[0.75rem] mb-[0.75rem] cursor-pointer"
          >
            <h2
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600]"
              )}
            >
              {note.title}
            </h2>
            <div className="flex">
              {note.tags.map((tag, index) => (
                <h3
                  key={index}
                  className={clsx(
                    darkMode
                      ? "text-[#FFF] bg-[#525866]"
                      : "text-[#0E121B] bg-[#E0E4EA]",
                    "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] rounded-md w-max px-[0.375rem] py-[0.2rem] mr-[0.25rem]"
                  )}
                >
                  {tag}
                </h3>
              ))}
            </div>
            <h3
              className={clsx(
                darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
              )}
            >
              {new Date(note.lastEdited).toDateString()}
            </h3>
            <span
              className={clsx(
                darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "flex h-[0.0625rem] w-full"
              )}
            />
          </Link>
        ))}
      </div>
      <Menu />
    </div>
  );
}

export default TagSelected;
