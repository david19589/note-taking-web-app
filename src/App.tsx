import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routing/routes";
import { useEffect } from "react";
import { useNotesStore } from "./stores/useNotesStore";
import { useUIStore } from "./stores/useUIStore";
import clsx from "clsx";

const router = createBrowserRouter(routes());

function App() {
  const { loading, fetchNotes } = useNotesStore();
  const { darkMode, font } = useUIStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    document.documentElement.classList.remove("sans", "serif", "monospace");
    document.documentElement.classList.add(font);
  }, [font]);

  if (loading)
    return (
      <div
        className={clsx(
          darkMode ? "bg-[#0E121B] text-[#FFF]" : "bg-[#FFF] text-[#000]",
          "h-screen w-screen flex items-center justify-center gap-[0.5rem]"
        )}
      >
        <h1 className="text-[1.25rem]">Loading...</h1>
        <span className="w-[2.5rem] h-[2.5rem] border-[0.25rem] border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return <RouterProvider router={router} />;
}

export default App;
