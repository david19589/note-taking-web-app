import clsx from "clsx";
import plusSvg from "../../assets/icon-plus.svg";
import searchSvg from "../../assets/icon-search.svg";
import Menu from "../../components/menu";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";
import { useState } from "react";

function Search() {
  const { notes } = useNotesStore();
  const { darkMode } = useUIStore();

  const [tag, setTag] = useState("");

  const filteredNotes =
    tag.trim() === ""
      ? []
      : notes.filter((note) =>
          note.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );

  return (
    <div className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}>
      <Header />
      <div className="mt-[1.25rem] px-[1rem]">
        <h1
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem]"
          )}
        >
          Search
        </h1>
        <div className="relative w-full">
          <img
            src={searchSvg}
            alt="searchSvg"
            className="absolute top-[0.75rem] left-[0.75rem]"
          />
          <input
            type="text"
            placeholder="Type here..."
            onChange={(e) => setTag(e.target.value)}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B] placeholder:text-[#CACFD8]"
                : "bg-[#F3F5F8] border-[#E0E4EA] placeholder:text-[#2B303B]",
              "p-[0.75rem] border-[0.0625rem] rounded-lg outline-none pl-[2.5rem] w-full"
            )}
          />
        </div>
        <h3
          className={clsx(
            darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] my-[1rem]"
          )}
        >
          All notes matching ”{tag}” are displayed below.
        </h3>
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
        {tag.trim() !== "" && filteredNotes.length < 1 && (
          <>
            <div
              className={clsx(
                darkMode
                  ? "bg-[#232530] border-[#2B303B]"
                  : "bg-[#F3F5F8] border-[#E0E4EA]",
                "flex w-full p-[0.75rem] border-[0.0625rem] rounded-lg"
              )}
            >
              <p
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                )}
              >
                No notes match your search. Try a different keyword or
                <Link
                  to="/add-note"
                  className="underline cursor-pointer pl-[0.35rem]"
                >
                  create a new note.
                </Link>
              </p>
            </div>
            <span
              className={clsx(
                darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "lg:hidden md:flex hidden h-[0.0625rem] w-full mt-[1rem]"
              )}
            />
          </>
        )}
      </div>
      <Link to="/add-note">
        <button className="bg-[#335CFF] p-[0.5rem] absolute bottom-[8rem] right-[1rem] z-20 rounded-full drop-shadow-md shadow-[#CACFD8B2] cursor-pointer">
          <img
            src={plusSvg}
            alt="plusSvg"
            className="w-[2.25rem] select-none"
          />
        </button>
      </Link>
      <Menu />
    </div>
  );
}
export default Search;
