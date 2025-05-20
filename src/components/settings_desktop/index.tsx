import clsx from "clsx";
import sunSvg from "../../assets/icon-sun.svg";
import fontSvg from "../../assets/icon-font.svg";
import lockSvg from "../../assets/icon-lock.svg";
import logOutSvg from "../../assets/icon-logout.svg";
import { useUIStore } from "../../stores/useUIStore";
import SunSvgDarkMode from "../../assets/icons/sun_svg_dark_mode";
import FontSvgDarkMode from "../../assets/icons/font_svg_dark_mode";
import LockSvgDarkMode from "../../assets/icons/lock_svg_dark_,mode";
import LogoutSvgDarkMode from "../../assets/icons/logout_svg_dark_mode";
import { logout } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ChangeThemeDesktop from "../settings_change_theme_desktop";
import { useState } from "react";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import ChangeFontDesktop from "../settings_change_font_desktop";
import ChangePasswordDesktop from "../settings_change_password_desktop";

function SettingsDesktop() {
  const { darkMode } = useUIStore();
  const [selected, setSelected] = useState("");

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
    <div className="flex w-full">
      <div
        className={clsx(
          darkMode ? "bg-[#0E121B]" : "bg-[#FFF]",
          "h-[calc(100vh-10rem)] max-w-[15rem] w-full mt-[1.25rem] px-[1rem]"
        )}
      >
        <div className="flex flex-col gap-[1rem]">
          <button
            onClick={() => {
              setSelected("colorTheme");
            }}
            className={clsx(
              selected === "colorTheme"
                ? darkMode
                  ? "bg-[#bfc4d11e]"
                  : "bg-[#2b303b15]"
                : darkMode
                ? "hover:bg-[#bfc4d113]"
                : "hover:bg-[#2b303b07]",
              "flex items-center justify-between px-[0.7rem] py-[0.5rem] w-full rounded-lg cursor-pointer group"
            )}
          >
            <div className="flex items-center gap-[0.5rem]">
              {darkMode ? (
                <SunSvgDarkMode />
              ) : (
                <img src={sunSvg} alt="sunSvg" className="select-none" />
              )}

              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Color Theme
              </h2>
            </div>
            <div
              className={clsx(
                selected === "colorTheme" ? "flex" : "hidden group-hover:flex"
              )}
            >
              {darkMode ? (
                <ArrowLeftDetailsDarkMode className="rotate-180" />
              ) : (
                <img
                  src={arrowLeftSvg}
                  alt="arrowLeftSvg"
                  className="select-none rotate-180"
                />
              )}
            </div>
          </button>
          <button
            onClick={() => {
              setSelected("fontTheme");
            }}
            className={clsx(
              selected === "fontTheme"
                ? darkMode
                  ? "bg-[#bfc4d11e]"
                  : "bg-[#2b303b15]"
                : darkMode
                ? "hover:bg-[#bfc4d113]"
                : "hover:bg-[#2b303b07]",
              "flex items-center justify-between px-[0.7rem] py-[0.5rem] w-full rounded-lg cursor-pointer group"
            )}
          >
            <div className="flex items-center gap-[0.5rem]">
              {darkMode ? (
                <FontSvgDarkMode />
              ) : (
                <img src={fontSvg} alt="fontSvg" className="select-none" />
              )}
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Font Theme
              </h2>
            </div>
            <div
              className={clsx(
                selected === "fontTheme" ? "flex" : "hidden group-hover:flex"
              )}
            >
              {darkMode ? (
                <ArrowLeftDetailsDarkMode className="rotate-180" />
              ) : (
                <img
                  src={arrowLeftSvg}
                  alt="arrowLeftSvg"
                  className="select-none rotate-180"
                />
              )}
            </div>
          </button>
          <button
            onClick={() => {
              setSelected("changePassword");
            }}
            className={clsx(
              selected === "changePassword"
                ? darkMode
                  ? "bg-[#bfc4d11e]"
                  : "bg-[#2b303b15]"
                : darkMode
                ? "hover:bg-[#bfc4d113]"
                : "hover:bg-[#2b303b07]",
              "flex items-center justify-between px-[0.7rem] py-[0.5rem] w-full rounded-lg cursor-pointer group"
            )}
          >
            <div className="flex items-center gap-[0.5rem]">
              {darkMode ? (
                <LockSvgDarkMode />
              ) : (
                <img src={lockSvg} alt="lockSvg" className="select-none" />
              )}
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                  "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Change Password
              </h2>
            </div>
            <div
              className={clsx(
                selected === "changePassword"
                  ? "flex"
                  : "hidden group-hover:flex"
              )}
            >
              {darkMode ? (
                <ArrowLeftDetailsDarkMode className="rotate-180" />
              ) : (
                <img
                  src={arrowLeftSvg}
                  alt="arrowLeftSvg"
                  className="select-none rotate-180"
                />
              )}
            </div>
          </button>
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]",
            "flex h-[0.0625rem] w-full mt-[0.75rem]"
          )}
        />
        <button
          onClick={handleLogout}
          className={clsx(
            darkMode ? "hover:bg-[#bfc4d113]" : "hover:bg-[#2b303b07]",
            "flex items-center justify-between px-[0.7rem] py-[0.5rem] mt-[0.5rem] w-full rounded-lg cursor-pointer group"
          )}
        >
          <div className="flex items-center gap-[0.5rem]">
            {darkMode ? (
              <LogoutSvgDarkMode />
            ) : (
              <img src={logOutSvg} alt="logOutSvg" className="select-none" />
            )}
            <h2
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#2B303B]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[500]"
              )}
            >
              Logout
            </h2>
          </div>
          <div className="hidden group-hover:flex">
            {darkMode ? (
              <ArrowLeftDetailsDarkMode className="rotate-180" />
            ) : (
              <img
                src={arrowLeftSvg}
                alt="arrowLeftSvg"
                className="select-none rotate-180"
              />
            )}
          </div>
        </button>
      </div>
      <span
        className={clsx(
          darkMode ? "bg-[#232530]" : "bg-[#E0E4EA]",
          "flex h-full w-[0.0625rem]"
        )}
      />
      {selected === "colorTheme" ? (
        <ChangeThemeDesktop />
      ) : selected === "fontTheme" ? (
        <ChangeFontDesktop />
      ) : selected === "changePassword" ? (
        <ChangePasswordDesktop />
      ) : (
        ""
      )}
    </div>
  );
}
export default SettingsDesktop;
