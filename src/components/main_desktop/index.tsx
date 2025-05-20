import clsx from "clsx";
import NoteDetailsDesktop from "../note_details_desktop";
import SettingsDesktop from "../settings_desktop";
import AddNoteDesktop from "../add_note_desktop";
import MainSidebarDesktop from "../main_sidebar_desktop";
import MainHeaderDesktop from "../main_header_desktop";
import NoteListDesktop from "../note_list_desktop";
import { useUIStore } from "../../stores/useUIStore";
import { useEffect, useState } from "react";
import { noteDataTypes } from "../../utils/api";

function MainDesktop() {
  const { darkMode } = useUIStore();

  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selected") || "allNotes";
  });

  const [tag, setTag] = useState(() => {
    return localStorage.getItem("tag") || "";
  });

  const [activeNote, setActiveNote] = useState<noteDataTypes>();
  const [openSettings, setOpenSettings] = useState(false);
  const [openCreateNote, setOpenCreateNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("selected", selected);
  }, [selected]);

  return (
    <div
      className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "flex h-full")}
    >
      <MainSidebarDesktop
        selected={selected}
        setSelected={setSelected}
        setOpenSettings={setOpenSettings}
        setTag={setTag}
      />
      <span
        className={clsx(
          darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
          "flex h-full w-[0.0625rem]"
        )}
      />
      <div className="flex flex-col w-full">
        <div>
          <MainHeaderDesktop
            selected={selected}
            setSelected={setSelected}
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            setTag={setTag}
            setActiveNote={setActiveNote}
            setOpenCreateNote={setOpenCreateNote}
          />
          <span
            className={clsx(
              darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
              "flex h-[0.0625rem] w-full mt-[0.5rem]"
            )}
          />
        </div>
        <div className="flex h-full">
          {!openSettings && (
            <div className="flex flex-col p-[1.5rem] h-[calc(100vh-8rem)] min-w-[17.25rem] max-w-[17.25rem]">
              <button
                onClick={() => {
                  setOpenCreateNote(true);
                  setActiveNote(undefined);
                }}
                className="bg-[#335CFF] hover:bg-[#335cffc4] py-[0.75rem] px-[3.25rem] rounded-lg drop-shadow-md shadow-[#CACFD8B2] cursor-pointer mb-[1.5rem] transition-all duration-150"
              >
                <h2 className="text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] text-[#FFF]">
                  + create new note
                </h2>
              </button>
              {selected === "archivedNotes" && (
                <p
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                    "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] mb-[1rem]"
                  )}
                >
                  All your archived notes are stored here. You can restore or
                  delete them anytime.
                </p>
              )}
              <NoteListDesktop
                selected={selected}
                setSelected={setSelected}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                setOpenSettings={setOpenSettings}
                setOpenCreateNote={setOpenCreateNote}
                tag={tag}
                setTag={setTag}
              />
            </div>
          )}
          {openSettings && <SettingsDesktop />}
          {!openSettings && (
            <span
              className={clsx(
                darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "flex h-full w-[0.0625rem]"
              )}
            />
          )}
          {activeNote && <NoteDetailsDesktop note={activeNote} />}
          {openCreateNote && <AddNoteDesktop />}
        </div>
      </div>
    </div>
  );
}
export default MainDesktop;
