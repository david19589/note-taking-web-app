import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { getSelectedOptionFromPath } from "../../utils/selectedOptionFromPath";

function Layout() {
  const location = useLocation();
  const { setSelectedOption } = useNotesStore();

  useEffect(() => {
    const options = getSelectedOptionFromPath(location.pathname);
    setSelectedOption(options);
    localStorage.setItem("selectedOption", JSON.stringify(options));
  }, [location.pathname, setSelectedOption]);

  return <Outlet />;
}

export default Layout;
