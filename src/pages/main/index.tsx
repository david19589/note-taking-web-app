import clsx from "clsx";
import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import plusSvg from "../../assets/icon-plus.svg";
import Menu from "../../components/menu";
import { useEffect, useState } from "react";
import { getNotes, noteDataTypes } from "../../utils/api";

function Main(props: { darkMode: boolean }) {
  const [notes, setNotes] = useState<noteDataTypes[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = getNotes();
        setNotes((await response).data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div
      className={clsx(props.darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}
    >
      <div
        className={clsx(
          props.darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]",
          "w-full  px-[1rem] py-[0.75rem]"
        )}
      >
        <img
          src={props.darkMode ? whiteLogoSvg : logoSvg}
          alt="logoSvg"
          className="select-none"
        />
      </div>
      <div className="mt-[1.25rem] px-[1rem]">
        <h1
          className={clsx(
            props.darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem]"
          )}
        >
          ALL NOTES
        </h1>
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex flex-col my-[0.5rem] pl-[0.5rem] gap-[0.75rem] mb-[0.75rem] cursor-pointer"
          >
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600]"
              )}
            >
              {note.title}
            </h2>
            <div>
              <h3
                className={clsx(
                  props.darkMode
                    ? "text-[#FFF] bg-[#525866]"
                    : "text-[#0E121B] bg-[#E0E4EA]",
                  "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] rounded-md w-max px-[0.375rem] py-[0.2rem] mr-[0.25rem]"
                )}
              >
                {note.tags}
              </h3>
            </div>
            <h3
              className={clsx(
                props.darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
              )}
            >
              {new Date(note.lastEdited).toDateString()}
            </h3>
            <span
              className={clsx(
                props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "flex h-[0.0625rem] w-full"
              )}
            />
          </div>
        ))}
        {notes.length < 1 && (
          <>
            <div
              className={clsx(
                props.darkMode
                  ? "bg-[#232530] border-[#2B303B]"
                  : "bg-[#F3F5F8] border-[#E0E4EA]",
                "w-full p-[0.75rem] border-[0.0625rem] rounded-lg"
              )}
            >
              <p
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                )}
              >
                You don`t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            </div>
            <span
              className={clsx(
                props.darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "lg:hidden md:flex hidden h-[0.0625rem] w-full mt-[1rem]"
              )}
            />
          </>
        )}
      </div>
      <button className="bg-[#335CFF] p-[0.5rem] absolute bottom-[8rem] right-[1rem] z-20 rounded-full drop-shadow-md shadow-[#CACFD8B2] cursor-pointer">
        <img src={plusSvg} alt="plusSvg" className="w-[2.25rem] select-none" />
      </button>
      <Menu darkMode={props.darkMode} />
    </div>
  );
}
export default Main;
