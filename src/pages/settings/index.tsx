import clsx from "clsx";
import sunSvg from "../../assets/icon-sun.svg";
import fontSvg from "../../assets/icon-font.svg";
import lockSvg from "../../assets/icon-lock.svg";
import logOutSvg from "../../assets/icon-logout.svg";
import Menu from "../../components/menu";
import Header from "../../components/header";
import { useUIStore } from "../../stores/useUIStore";
import SunSvgDarkMode from "../../assets/icons/sun_svg_dark_mode";
import FontSvgDarkMode from "../../assets/icons/font_svg_dark_mode";
import LockSvgDarkMode from "../../assets/icons/lock_svg_dark_,mode";
import LogoutSvgDarkMode from "../../assets/icons/logout_svg_dark_mode";
import { Link } from "react-router-dom";
import { logout } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Settings() {
  const { darkMode } = useUIStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("token");
      Cookies.remove("authToken");
      Cookies.remove("userEmail");

      navigate("/auth/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
          Settings
        </h1>
        <div className="flex flex-col gap-[1rem]">
          <Link to="/settings/change-theme" className="w-max">
            <button className="flex items-center gap-[0.375rem] w-max outline-none cursor-pointer">
              {darkMode ? (
                <SunSvgDarkMode />
              ) : (
                <img src={sunSvg} alt="sunSvg" className="select-none" />
              )}
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Color Theme
              </h3>
            </button>
          </Link>
          <Link to="/settings/change-font" className="w-max">
            <button className="flex items-center gap-[0.375rem] w-max outline-none cursor-pointer">
              {darkMode ? (
                <FontSvgDarkMode />
              ) : (
                <img src={fontSvg} alt="fontSvg" className="select-none" />
              )}
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Font Theme
              </h3>
            </button>
          </Link>
          <Link to="/settings/change-password" className="w-max">
            <button className="flex items-center gap-[0.375rem] w-max outline-none cursor-pointer">
              {darkMode ? (
                <LockSvgDarkMode />
              ) : (
                <img src={lockSvg} alt="lockSvg" className="select-none" />
              )}
              <h3
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Change Password
              </h3>
            </button>
          </Link>
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]",
            "flex h-[0.0625rem] w-full mt-[0.75rem]"
          )}
        />
        <button
          onClick={handleLogout}
          className="flex items-center gap-[0.375rem] w-max mt-[1rem] outline-none cursor-pointer"
        >
          {darkMode ? (
            <LogoutSvgDarkMode />
          ) : (
            <img src={logOutSvg} alt="logOutSvg" className="select-none" />
          )}
          <h3
            className={clsx(
              darkMode ? "text-[#FFF]" : "text-[#2B303B]",
              "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
            )}
          >
            Logout
          </h3>
        </button>
      </div>
      <Menu />
    </div>
  );
}
export default Settings;
