import clsx from "clsx";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import clockSvg from "../../assets/icon-clock.svg";
import Menu from "../../components/menu";
import Header from "../../components/header";
import TagSvgDetails from "../../assets/icons/tag_svg_details";
import TagSvgDetailsDarkMode from "../../assets/icons/tag_svg_details_dark_mode";
import ClockSvgDetailsDarkMode from "../../assets/icons/clock_svg_details_dark_mode";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";
import { noteDataTypes, postNote } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";

function AddNote() {
  const { fetchNotes } = useNotesStore();
  const { darkMode } = useUIStore();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const handleAddNote = async (data: noteDataTypes) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (title.trim() === "" || content.trim() === "") {
        setError("Title and content are required.");
        return;
      }

      await postNote({
        ...data,
        lastEdited: new Date(),
        isArchived: false,
      });

      navigate("/");
      fetchNotes();
    } catch (err) {
      console.error("error adding note", err);
    } finally {
      setTimeout(() => setError(null), 2000);
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const handleSaveNote = () => {
    handleAddNote({
      title,
      content,
      tags,
      lastEdited: new Date(),
      isArchived: false,
      _id: "",
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleCancelEdited = () => {
    setTitle("");
    setContent("");
    setTags([]);
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
              onClick={handleCancelEdited}
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
              onClick={handleSaveNote}
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
          id="title"
          placeholder="Enter a title…"
          onChange={(e) => setTitle(e.target.value)}
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1rem] w-full resize-none cursor-text outline-none"
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
                            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
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
              <h3
                className={clsx(
                  darkMode ? "text-[#CACFD8]" : "text-[#99A0AE]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400]"
                )}
              >
                Not yet saved
              </h3>
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
          id="content"
          placeholder="Start typing your note here…"
          onChange={(e) => setContent(e.target.value)}
          className={clsx(
            darkMode ? "text-[#CACFD8]" : "text-[#232530]",
            "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] w-full h-[25rem] resize-none mt-[0.75rem] transition-all duration-150 cursor-text outline-none"
          )}
        />
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
      <Menu />
    </div>
  );
}
export default AddNote;
