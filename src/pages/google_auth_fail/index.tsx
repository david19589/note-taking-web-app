import clsx from "clsx";
import { Link } from "react-router";
import { useUIStore } from "../../stores/useUIStore";

const GoogleAuthFail = () => {
  const { darkMode } = useUIStore();

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#2B303B]" : "bg-[#F3F5F8]",
        "flex flex-col items-center justify-center px-[1rem] h-full w-full"
      )}
    >
      <h1 className="text-[1.5rem] font-[700] text-red-600">Login Failed</h1>
      <p className="text-gray-500 mt-[0.5rem]">
        Something went wrong with Google.
      </p>
      <Link to="/auth/login" className="flex">
        <button className="text-[1rem] leading-[1.2rem] font-[600] text-[#FFF] bg-[#335CFF] hover:bg-[#2547D0] transition-all duration-150 p-[0.75rem] mt-[0.75rem] rounded-lg cursor-pointer w-full outline-none">
          Try Again
        </button>
      </Link>
    </div>
  );
};
export default GoogleAuthFail;
