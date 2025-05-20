import clsx from "clsx";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import deleteSvg from "../../assets/icon-delete.svg";
import archiveSvg from "../../assets/icon-archive.svg";
import clockSvg from "../../assets/icon-clock.svg";
import statusSvg from "../../assets/icon-status.svg";
import restoreSvg from "../../assets/icon-restore.svg";
import TagSvgDetails from "../../assets/icons/tag_svg_details";
import TagSvgDetailsDarkMode from "../../assets/icons/tag_svg_details_dark_mode";
import ClockSvgDetailsDarkMode from "../../assets/icons/clock_svg_details_dark_mode";
import DeleteSvgDetailsDarkMode from "../../assets/icons/delete_svg_details_dark_mode";
import ArchiveSvgDetailsDarkMode from "../../assets/icons/archive_svg_details_dark_mode";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";
import StatusSvgDetailsDarkMode from "../../assets/icons/status_svg_details_dark_mode";
import RestoreSvgDetailsDarkMode from "../../assets/icons/restore_svg_details_dark_mode";
import { noteDataTypes, updateNote } from "../../utils/api";
import { useEffect, useRef, useState } from "react";
import DeleteNoteModal from "../../components/modals/delete_note_modal";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";

function NoteDetailsDesktop(props: { note: noteDataTypes }) {
  const { setOpenDeleteModal, updateNoteInStore, fetchNotes } = useNotesStore();
  const { darkMode } = useUIStore();

  const [title, setTitle] = useState(props.note?.title || "");
  const [content, setContent] = useState(props.note?.content || "");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.note?.tags) {
      setTags(props.note.tags);
      setInitialTags(props.note.tags);
    }
  }, [props.note]);

  useEffect(() => {
    if (props.note) {
      setTitle(props.note.title);
      setContent(props.note.content);
    }
  }, [props.note, props.note._id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  if (!props.note) return;

  const updateSelectedNote = async (data: noteDataTypes) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (title.trim() === "" || content.trim() === "") {
        setError("Title and content are required.");
        return;
      }

      const updatedData = {
        ...data,
        title,
        content,
        tags,
        lastEdited: new Date(),
      };

      await updateNote(props.note._id, updatedData);
      updateNoteInStore(props.note._id, updatedData);

      setTitle(title);
      setContent(content);
    } catch (err) {
      console.error("note update failed", err);
    } finally {
      setTimeout(() => setError(null), 2000);
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const handleArchiveNote = async (data: noteDataTypes) => {
    const newArchiveState = !props.note.isArchived;

    try {
      await updateNote(props.note._id, {
        ...data,
        isArchived: newArchiveState,
      });
    } catch (err) {
      console.error(
        newArchiveState ? "archiving note failed" : "unArchiving note failed",
        err
      );
    }
    fetchNotes();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleCancelEdited = () => {
    setTitle(props.note.title);
    setContent(props.note.content);
    setTags(initialTags);
  };

  return (
    <div className="w-full h-full">
      <div
        className={clsx(
          darkMode ? "bg-[#0E121B]" : "bg-[#FFF]",
          "flex gap-[1rem] h-full px-[1rem]"
        )}
      >
        <div className="w-full mt-[1.25rem] h-[calc(100vh-10rem)]">
          <div>
            <textarea
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem] w-[calc(w-1rem)] resize-none cursor-text outline-none"
              )}
            />
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
                <div ref={dropdownRef} className="flex gap-[1rem] relative">
                  <div className="flex max-w-[7rem] overflow-x-scroll custom-scrollbar">
                    {tags.map((tag, index) => (
                      <h3
                        key={index}
                        className={clsx(
                          darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                          "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] text-nowrap"
                        )}
                      >
                        {tag}
                        {index < tags.length - 1 && ","}
                      </h3>
                    ))}
                  </div>
                  {openDropdown && (
                    <div
                      className={clsx(
                        darkMode
                          ? "bg-[#232530] border-[#2B303B]"
                          : "bg-[#F3F5F8] border-[#E0E4EA]",
                        "flex flex-col gap-[0.25rem] absolute right-0 top-6 px-[0.5rem] py-[0.25rem] border-[0.0625rem] rounded-lg"
                      )}
                    >
                      <div className="max-h-[5rem] overflow-y-scroll custom-scrollbar">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[0.75rem]"
                          >
                            <h3
                              className={clsx(
                                darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] max-w-[7rem] overflow-y-scroll custom-scrollbar"
                              )}
                            >
                              {tag}
                            </h3>
                            <button
                              onClick={() => {
                                setTags((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                              className={clsx(
                                darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[700] cursor-pointer outline-none"
                              )}
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex mt-[1rem]">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag"
                          className={clsx(
                            darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                            "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] w-[4rem] outline-none"
                          )}
                        />
                        <button
                          onClick={handleAddTag}
                          className={clsx(
                            darkMode
                              ? "text-[#CACFD8]"
                              : "text-[#2B303B] bg-[#FFF] border-[0.0625rem] border-[#E0E4EA]",
                            "text-[0.75rem] leading-[1rem] tracking-[-0.0125rem] font-[400] p-[0.15rem] rounded-md cursor-pointer outline-none"
                          )}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={toggleDropdown}
                    className="cursor-pointer outline-none"
                  >
                    <img
                      src={arrowLeftSvg}
                      alt="arrowLeftSvg"
                      className={clsx(
                        openDropdown ? "rotate-270" : "rotate-90",
                        "transition-all duration-200"
                      )}
                    />
                  </button>
                </div>
              </div>
              {props.note.isArchived === true && (
                <div className="flex items-center gap-[4.375rem]">
                  <div className="flex items-center gap-[0.375rem]">
                    {darkMode ? (
                      <StatusSvgDetailsDarkMode />
                    ) : (
                      <img
                        src={statusSvg}
                        alt="statusSvg"
                        className="select-none"
                      />
                    )}
                    <h3
                      className={clsx(
                        darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                        "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                      )}
                    >
                      Status
                    </h3>
                  </div>
                  <div>
                    <h3
                      className={clsx(
                        darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                        "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                      )}
                    >
                      Archived
                    </h3>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-[2.5rem]">
                <div className="flex items-center gap-[0.375rem]">
                  {darkMode ? (
                    <ClockSvgDetailsDarkMode />
                  ) : (
                    <img
                      src={clockSvg}
                      alt="clockSvg"
                      className="select-none"
                    />
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
                  <h3
                    className={clsx(
                      darkMode ? "text-[#CACFD8]" : "text-[#2B303B]",
                      "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                    )}
                  >
                    {new Date(props.note.lastEdited).toDateString()}
                  </h3>
                </div>
              </div>
            </div>
            <span
              className={clsx(
                darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                "flex h-[0.0625rem] w-full mt-[1rem]"
              )}
            />
            <textarea
              value={content}
              id="content"
              placeholder="Write your note here..."
              onChange={(e) => setContent(e.target.value)}
              className={clsx(
                darkMode ? "text-[#CACFD8]" : "text-[#232530]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] w-full h-[calc(100vh-30rem)]  resize-none mt-[0.75rem] transition-all duration-150 cursor-text outline-none"
              )}
            />
          </div>
          <span
            className={clsx(
              darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
              "flex h-[0.0625rem] w-full mt-[0.75rem]"
            )}
          />
          <button
            onClick={() => updateSelectedNote(props.note)}
            className="bg-[#335CFF] hover:bg-[#335cffc4] py-[0.75rem] px-[1rem] mt-[1rem] ml-[1rem] rounded-lg drop-shadow-md shadow-[#CACFD8B2] cursor-pointer transition-all duration-150"
          >
            <h2 className="text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500] text-[#FFF]">
              Save Note
            </h2>
          </button>
          <button
            onClick={handleCancelEdited}
            className={clsx(
              darkMode
                ? "bg-[#232530] hover:bg-[#232530cc]"
                : "bg-[#F3F5F8] hover:bg-[#f3f5f8b9]",
              "py-[0.75rem] px-[1rem] mt-[1rem] ml-[1rem] rounded-lg drop-shadow-md shadow-[#CACFD8B2] cursor-pointer transition-all duration-150"
            )}
          >
            <h2
              className={clsx(
                darkMode ? "text-[#99A0AE]" : "text-[#525866]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              Cancel
            </h2>
          </button>
          <DeleteNoteModal selectedNote={props.note} />
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
            "flex h-full w-[0.0625rem]"
          )}
        />
        <div className="flex flex-col gap-[0.5rem] w-[13rem] mt-[1.25rem]">
          <button
            onClick={() => handleArchiveNote(props.note)}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B]"
                : "bg-[#F3F5F8] border-[#E0E4EA]",
              "flex items-center gap-[0.35rem] p-[0.65rem] border-[0.0625rem] rounded-lg cursor-pointer outline-none w-full"
            )}
          >
            {darkMode ? (
              props.note.isArchived === true ? (
                <RestoreSvgDetailsDarkMode />
              ) : (
                <ArchiveSvgDetailsDarkMode />
              )
            ) : props.note.isArchived === true ? (
              <img src={restoreSvg} alt="restoreSvg" className="select-none" />
            ) : (
              <img src={archiveSvg} alt="archiveSvg" className="select-none" />
            )}
            <h2
              className={clsx(
                darkMode ? "text-[#99A0AE]" : "text-[#717784]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              {props.note.isArchived === true ? "Restore Note" : "Archive Note"}
            </h2>
          </button>
          <button
            onClick={() => setOpenDeleteModal(true)}
            className={clsx(
              darkMode
                ? "bg-[#232530] border-[#2B303B]"
                : "bg-[#F3F5F8] border-[#E0E4EA]",
              "flex items-center gap-[0.35rem] p-[0.65rem] border-[0.0625rem] rounded-lg cursor-pointer outline-none w-full"
            )}
          >
            {darkMode ? (
              <DeleteSvgDetailsDarkMode />
            ) : (
              <img src={deleteSvg} alt="deleteSvg" className="select-none" />
            )}
            <h2
              className={clsx(
                darkMode ? "text-[#99A0AE]" : "text-[#717784]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              Delete Note
            </h2>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div
          className={clsx(
            error
              ? "top-[2rem] opacity-[100%]"
              : "top-[-10rem] opacity-0 select-none",
            "absolute transition-all duration-200 gap-[0.25rem] flex items-center bg-[#FFF] p-[0.75rem] rounded-md shadow-md"
          )}
        >
          <img
            src={redInfoSvg}
            alt="redInfoSvg"
            className="w-[1.2rem] select-none"
          />
          <span className="text-[0.85rem] leading-[1rem] font-[500] text-[#000]">
            {error}
          </span>
        </div>
      </div>
    </div>
  );
}
export default NoteDetailsDesktop;
