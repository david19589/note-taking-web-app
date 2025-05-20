import { useEffect, useState } from "react";
import Main from "../../components/main";
import MainDesktop from "../../components/main_desktop";

function ResponsiveMain() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? <MainDesktop /> : <Main />;
}
export default ResponsiveMain;
