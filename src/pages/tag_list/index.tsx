import clsx from "clsx";
import plusSvg from "../../assets/icon-plus.svg";
import tagsSvg from "../../assets/icon-tag.svg";
import Menu from "../../components/menu";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";

function TagList() {
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
          Tags
        </h1>
        <div className="overflow-scroll custom-scrollbar h-[calc(100vh-15rem)]">
          {uniqueTags.map((tag, index) => (
            <div key={index}>
              <Link
                to={`/tags/${tag}`}
                className="flex my-[0.5rem] pl-[0.5rem] gap-[0.75rem] mb-[0.75rem] cursor-pointer overflow-y-scroll custom-scrollbar"
              >
                <img
                  src={tagsSvg}
                  alt="tagsSvg"
                  className="w-[1rem] select-none"
                />
                <h2
                  className={clsx(
                    darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                    "text-[1rem] leading-[1.25rem] tracking-[-0.01875rem] font-[600]"
                  )}
                >
                  {capitalize(tag)}
                </h2>
              </Link>
              <span
                className={clsx(
                  darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
                  "flex h-[0.0625rem] w-full"
                )}
              />
            </div>
          ))}
        </div>
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
export default TagList;
