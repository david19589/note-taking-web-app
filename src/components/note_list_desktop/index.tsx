import clsx from "clsx";
import { useUIStore } from "../../stores/useUIStore";
import { useNotesStore } from "../../stores/useNotesStore";
import { noteDataTypes } from "../../utils/api";

function NoteListDesktop(props: {
  selected: string;
  setSelected: (status: string) => void;
  activeNote: noteDataTypes | undefined;
  setActiveNote: (status: noteDataTypes) => void;
  setOpenSettings: (status: boolean) => void;
  setOpenCreateNote: (status: boolean) => void;
  tag: string;
  setTag: (status: string) => void;
}) {
  const { notes } = useNotesStore();
  const { darkMode } = useUIStore();

  const filterArchived = notes.filter((note) => note.isArchived === false);
  const filterIsArchived = notes.filter((note) => note.isArchived === true);
  const filterNotesByTag =
    props.tag.trim() === ""
      ? []
      : notes.filter((note) =>
          note.tags.some((t) =>
            t.toLowerCase().includes(props.tag.toLowerCase())
          )
        );

  return (
    <>
      {props.selected === "allNotes" ? (
        <div className="flex flex-col overflow-y-scroll custom-scrollbar">
          {filterArchived.map((note, index) => (
            <div
              key={index}
              onClick={() => {
                props.setActiveNote(note);
                props.setOpenCreateNote(false);
              }}
              className={clsx(
                props.activeNote?._id === note._id &&
                  (darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]"),
                "flex flex-col gap-[0.75rem] mb-[0.75rem] px-[0.5rem] pt-[0.5rem] cursor-pointer rounded-lg"
              )}
            >
              <h2
                className={clsx(
                  note.title.length > 14 &&
                    "overflow-x-scroll custom-scrollbar",
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600] w-[12.75rem]"
                )}
              >
                {note.title}
              </h2>
              <div className="flex overflow-y-scroll custom-scrollbar">
                {note.tags.map((tag, index) => (
                  <h3
                    key={index}
                    className={clsx(
                      darkMode
                        ? "text-[#FFF] bg-[#525866]"
                        : "text-[#0E121B] bg-[#E0E4EA]",
                      "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] rounded-md w-max px-[0.375rem] py-[0.2rem] mr-[0.25rem] text-nowrap"
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
            </div>
          ))}
          {filterArchived.length < 1 && (
            <>
              <div
                className={clsx(
                  darkMode
                    ? "bg-[#232530] border-[#2B303B]"
                    : "bg-[#F3F5F8] border-[#E0E4EA]",
                  "w-full p-[0.75rem] border-[0.0625rem] rounded-lg"
                )}
              >
                <p
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                  )}
                >
                  You don`t have any notes yet. Start a new note to capture your
                  thoughts and ideas.
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
      ) : props.selected === "archivedNotes" ? (
        <div className="flex flex-col overflow-y-scroll custom-scrollbar">
          {filterIsArchived.map((note, index) => (
            <div
              key={index}
              onClick={() => {
                props.setActiveNote(note);
                props.setOpenCreateNote(false);
              }}
              className={clsx(
                props.activeNote?._id === note._id &&
                  (darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]"),
                "flex flex-col gap-[0.75rem] mb-[0.75rem] px-[0.5rem] pt-[0.5rem] cursor-pointer rounded-lg"
              )}
            >
              <h2
                className={clsx(
                  note.title.length > 14 &&
                    "overflow-x-scroll custom-scrollbar",
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600] w-[12.75rem]"
                )}
              >
                {note.title}
              </h2>
              <div className="flex overflow-y-scroll custom-scrollbar">
                {note.tags.map((tag, index) => (
                  <h3
                    key={index}
                    className={clsx(
                      darkMode
                        ? "text-[#FFF] bg-[#525866]"
                        : "text-[#0E121B] bg-[#E0E4EA]",
                      "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] rounded-md w-max px-[0.375rem] py-[0.2rem] mr-[0.25rem] text-nowrap"
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
            </div>
          ))}
          {filterArchived.length < 1 && (
            <>
              <div
                className={clsx(
                  darkMode
                    ? "bg-[#232530] border-[#2B303B]"
                    : "bg-[#F3F5F8] border-[#E0E4EA]",
                  "w-full p-[0.75rem] border-[0.0625rem] rounded-lg"
                )}
              >
                <p
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                  )}
                >
                  You don`t have any notes yet. Start a new note to capture your
                  thoughts and ideas.
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
      ) : (
        <div className="flex flex-col overflow-y-scroll custom-scrollbar">
          <p
            className={clsx(
              darkMode ? "text-[#FFF]" : "text-[#0E121B]",
              "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] mb-[1rem] overflow-y-scroll custom-scrollbar2 max-w-[12rem]"
            )}
          >
            {`All notes with the "${props.selected}" tag are shown here.`}
          </p>
          {filterNotesByTag.map((note, index) => (
            <div
              key={index}
              onClick={() => {
                props.setActiveNote(note);
                props.setOpenCreateNote(false);
              }}
              className={clsx(
                props.activeNote?._id === note._id &&
                  (darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]"),
                "flex flex-col gap-[0.75rem] mb-[0.75rem] px-[0.5rem] pt-[0.5rem] cursor-pointer rounded-lg"
              )}
            >
              <h2
                className={clsx(
                  note.title.length > 14 &&
                    "overflow-x-scroll custom-scrollbar",
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600] w-[12.75rem]"
                )}
              >
                {note.title}
              </h2>
              <div className="flex overflow-y-scroll custom-scrollbar">
                {note.tags.map((tag, index) => (
                  <h3
                    key={index}
                    className={clsx(
                      darkMode
                        ? "text-[#FFF] bg-[#525866]"
                        : "text-[#0E121B] bg-[#E0E4EA]",
                      "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] rounded-md w-max px-[0.375rem] py-[0.2rem] mr-[0.25rem] text-nowrap"
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default NoteListDesktop;
