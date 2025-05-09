import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { getSelectedOptionFromPath } from "../../utils/selectedOptionFromPath";
import Cookies from "js-cookie";
import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";

function Layout() {
  const location = useLocation();
  const { setSelectedOption, fetchNotes, loading } = useNotesStore();
  const { darkMode } = useUIStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    const options = getSelectedOptionFromPath(location.pathname);
    setSelectedOption(options);
    localStorage.setItem("selectedOption", JSON.stringify(options));
  }, [location.pathname, setSelectedOption]);

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

  const token = Cookies.get("authToken");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default Layout;
