import clsx from "clsx";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import deleteSvg from "../../assets/icon-delete.svg";
import archiveSvg from "../../assets/icon-archive.svg";
import clockSvg from "../../assets/icon-clock.svg";
import Menu from "../../components/menu";
import Header from "../../components/header";
import TagSvgDetails from "../../assets/icons/tag_svg_details";
import TagSvgDetailsDarkMode from "../../assets/icons/tag_svg_details_dark_mode";
import ClockSvgDetailsDarkMode from "../../assets/icons/clock_svg_details_dark_mode";
import DeleteSvgDetailsDarkMode from "../../assets/icons/delete_svg_details_dark_mode";
import ArchiveSvgDetailsDarkMode from "../../assets/icons/archive_svg_details_dark_mode";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import { noteDataTypes, updateNote } from "../../utils/api";
import { Link, useParams } from "react-router";
import { useState } from "react";
import DeleteNoteModal from "../../components/modals/delete_note_modal";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";

function NoteDetails() {
  const { setOpenDeleteModal, notes, updateNoteInStore } = useNotesStore();
  const { darkMode } = useUIStore();

  const { id } = useParams<{ id: string }>();
  const selectedNote = notes.find((note) => note._id === id);

  const [title, setTitle] = useState(selectedNote?.title || "");
  const [content, setContent] = useState(selectedNote?.content || "");

  if (!selectedNote) return;
  
  const updateSelectedNote = async (data: noteDataTypes) => {
    try {
      const updatedData = {
        ...data,
        title,
        content,
        lastEdited: new Date(),
      };

      await updateNote(selectedNote._id, updatedData);
      updateNoteInStore(selectedNote._id, updatedData);
    } catch (err) {
      console.error("note update failed", err);
    }
  };

  return (
    <div className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}>
      <Header />
      <div className="mt-[1.25rem] px-[1rem]">
        <div className="flex items-center justify-between">
          <Link to="/">
            <button className="flex items-center cursor-pointer outline-none">
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
                    ? "text-[#CACFD8] hover:text-[#d3d3d3b0]"
                    : "text-[#0E121B] hover:text-[#0e121b71]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] transition-all duration-150"
                )}
              >
                Go Back
              </h3>
            </button>
          </Link>
          <div className="flex items-center gap-[1rem]">
            <button
              onClick={() => setOpenDeleteModal(true)}
              className="cursor-pointer outline-none"
            >
              {darkMode ? (
                <DeleteSvgDetailsDarkMode />
              ) : (
                <img src={deleteSvg} alt="deleteSvg" className="select-none" />
              )}
            </button>
            <button className="cursor-pointer outline-none">
              {darkMode ? (
                <ArchiveSvgDetailsDarkMode />
              ) : (
                <img
                  src={archiveSvg}
                  alt="archiveSvg"
                  className="select-none"
                />
              )}
            </button>
            <button
              onClick={() => setContent(selectedNote.content)}
              className={clsx(
                darkMode
                  ? "text-[#CACFD8] hover:text-[#cacacabb]"
                  : "text-[#0E121B] hover:text-[#0e121ba1]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] transition-all duration-150 cursor-pointer outline-none"
              )}
            >
              Cancel
            </button>
            <button
              onClick={() => updateSelectedNote(selectedNote)}
              className="text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] text-[#335CFF] hover:text-[#335cffb2] transition-all duration-150 cursor-pointer outline-none"
            >
              Save Note
            </button>
          </div>
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "flex h-[0.0625rem] w-full mt-[0.75rem]"
          )}
        />
      </div>
      <div className="mt-[1.25rem] px-[1rem]">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem] w-full resize-none cursor-text outline-none"
          )}
        >
          {selectedNote.title}
        </textarea>
        <div className="flex flex-col gap-[0.75rem]">
          <div className="flex items-center gap-[5rem]">
            <div className="flex items-center gap-[0.375rem]">
              {darkMode ? <TagSvgDetailsDarkMode /> : <TagSvgDetails />}
              <h3
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                )}
              >
                Tags
              </h3>
            </div>
            <div className="flex">
              {selectedNote.tags.map((tag, index) => (
                <h3 key={index}>
                  {tag}
                  {index < selectedNote.tags.length - 1 && ","}
                </h3>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-[2.5rem]">
            <div className="flex items-center gap-[0.375rem]">
              {darkMode ? (
                <ClockSvgDetailsDarkMode />
              ) : (
                <img src={clockSvg} alt="clockSvg" className="select-none" />
              )}
              <h3
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                )}
              >
                Last edited
              </h3>
            </div>
            <div>
              <h3> {new Date(selectedNote.lastEdited).toDateString()}</h3>
            </div>
          </div>
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#F3F5F8]" : "bg-[#232530]",
            "flex h-[0.0625rem] w-full mt-[0.75rem]"
          )}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={clsx(
            darkMode ? "text-[#CACFD8]" : "text-[#232530]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] w-full h-[25rem] resize-none mt-[0.75rem] transition-all duration-150 cursor-text outline-none"
          )}
        >
          {selectedNote.content}
        </textarea>
      </div>
      <Menu />
      <DeleteNoteModal selectedNote={selectedNote} />
    </div>
  );
}
export default NoteDetails;
