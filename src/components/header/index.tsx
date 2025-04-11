import clsx from "clsx";
import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import { useUIStore } from "../../stores/useUIStore";

function Header() {
  const { darkMode } = useUIStore();

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#232530]" : "bg-[#F3F5F8]",
        "w-full  px-[1rem] py-[0.75rem]"
      )}
    >
      <img
        src={darkMode ? whiteLogoSvg : logoSvg}
        alt="logoSvg"
        className="select-none"
      />
    </div>
  );
}
export default Header;
