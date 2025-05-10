import { Link, useNavigate } from "react-router-dom";
import { useUIStore } from "../../stores/useUIStore";
import clsx from "clsx";
import Header from "../../components/header";
import ArrowLeftDetailsDarkMode from "../../assets/icons/arrow_left_details_dark_mode";
import arrowLeftSvg from "../../assets/icon-arrow-left.svg";
import Menu from "../../components/menu";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";
import showPassSvg from "../../assets/icon-show-password.svg";
import hidePassSvg from "../../assets/icon-hide-password.svg";
import whiteHidePassSvg from "../../assets/icon-hide-password-white.svg";
import infoSvg from "../../assets/icon-info.svg";
import whiteInfoSvg from "../../assets/icon-info-white.svg";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { changePassword } from "../../utils/api";
import { AxiosError } from "axios";

type FormData = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const schema: ZodType<FormData> = z
  .object({
    oldPassword: z.string().nonempty({ message: "Can't be empty" }),
    password: z
      .string()
      .nonempty({ message: "Can't be empty" })
      .min(8, { message: "min 8 char." }),
    confirmPassword: z.string().nonempty({ message: "Can't be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "doesn`t match",
    path: ["confirmPassword"],
  });

function ChangePassword() {
  const { darkMode } = useUIStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = (
    filed: "oldPassword" | "password" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [filed]: !prev[filed],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);

      await changePassword(data.oldPassword, data.password);

      navigate("/settings");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setServerError("Incorrect current password.");
        }
      }
      console.log(serverError);
      console.error("Error changing password:", err);
    }
  };

  return (
    <div className={clsx(darkMode ? "bg-[#0E121B]" : "bg-[#FFF]", "h-full")}>
      <Header />
      <div className="mt-[1.25rem] px-[1rem]">
        <Link to="/settings" className="block w-max h-max group">
          <button className="flex items-center cursor-pointer outline-none mb-[1rem]">
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
                  ? "text-[#CACFD8] group-hover:text-[#d3d3d3b0]"
                  : "text-[#0E121B] group-hover:text-[#0e121b71]",
                "text-[0.875rem] leading-[1rem] tracking-[-0.0125rem] font-[400] transition-all duration-150"
              )}
            >
              Settings
            </h3>
          </button>
        </Link>
        <h1
          className={clsx(
            darkMode ? "text-[#FFF]" : "text-[#0E121B]",
            "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[1.5rem]"
          )}
        >
          Change Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-[0.375rem] mb-[1rem] w-full relative">
            <div className="flex items-center justify-between">
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1.05rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Old Password
              </h2>
            </div>
            <input
              {...register("oldPassword")}
              type={showPassword.oldPassword ? "tel" : "password"}
              id="oldPassword-register"
              autoComplete="current-oldPassword"
              className={clsx(
                errors.oldPassword
                  ? "border-[#FF3939] focus:outline-[#FF3939] focus:border-[#FF3939] text-[#717784]"
                  : darkMode
                  ? "border-[#525866] focus:outline-[#525866] focus:border-[#525866] hover:bg-[#232530] focus:bg-[#0E121B] text-[#717784]"
                  : "border-[#D9D9D9] focus:outline-[#0E121B] focus:border-[#0E121B] hover:bg-[#F5F7FA] focus:bg-[#FFF] text-[#0E121B]",
                "text-[0.875rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] border-[0.0625rem] w-full rounded-lg px-[1rem] py-[0.75rem] pr-[4rem] transition-all duration-150 focus:outline-1 focus:outline-offset-2"
              )}
            />
            {showPassword.oldPassword ? (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("oldPassword");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={darkMode ? whiteHidePassSvg : hidePassSvg}
                  alt="hidePassSvg"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("oldPassword");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={showPassSvg}
                  alt="showPassSvg"
                />
              </button>
            )}
            <div
              className={clsx(
                errors.oldPassword || serverError
                  ? "opacity-100%"
                  : "opacity-0",
                "flex gap-[0.25rem]"
              )}
            >
              <img
                src={redInfoSvg}
                alt="redInfoSvg"
                className="w-[0.75rem] select-none"
              />
              <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939]">
                {errors.oldPassword?.message || serverError}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[0.375rem] mb-[1rem] w-full relative">
            <div className="flex items-center justify-between">
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1.05rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                New Password
              </h2>
            </div>
            <input
              {...register("password")}
              type={showPassword.password ? "tel" : "password"}
              id="password-register"
              autoComplete="current-password"
              className={clsx(
                errors.password
                  ? "border-[#FF3939] focus:outline-[#FF3939] focus:border-[#FF3939] text-[#717784]"
                  : darkMode
                  ? "border-[#525866] focus:outline-[#525866] focus:border-[#525866] hover:bg-[#232530] focus:bg-[#0E121B] text-[#717784]"
                  : "border-[#D9D9D9] focus:outline-[#0E121B] focus:border-[#0E121B] hover:bg-[#F5F7FA] focus:bg-[#FFF] text-[#0E121B]",
                "text-[0.875rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] border-[0.0625rem] w-full rounded-lg px-[1rem] py-[0.75rem] pr-[4rem] transition-all duration-150 focus:outline-1 focus:outline-offset-2"
              )}
            />
            {showPassword.password ? (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("password");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={darkMode ? whiteHidePassSvg : hidePassSvg}
                  alt="hidePassSvg"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("password");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={showPassSvg}
                  alt="showPassSvg"
                />
              </button>
            )}
            <div className="flex gap-[0.5rem]">
              <img
                src={darkMode ? whiteInfoSvg : infoSvg}
                alt="infoSvg"
                className="w-[0.75rem] select-none"
              />
              <h3
                className={clsx(
                  darkMode ? "text-[#99A0AE]" : "text-[#525866]",
                  "text-[0.75rem] leading-[1rem] fon-[400]"
                )}
              >
                At least 8 characters
              </h3>
              <div
                className={clsx(
                  errors.password ? "opacity-100%" : "opacity-0",
                  "flex gap-[0.25rem]"
                )}
              >
                <img
                  src={redInfoSvg}
                  alt="redInfoSvg"
                  className="w-[0.75rem] select-none"
                />
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939]">
                  {errors.password?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.375rem] w-full relative">
            <div className="flex items-center justify-between">
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1.05rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Confirm New Password
              </h2>
            </div>
            <input
              {...register("confirmPassword")}
              type={showPassword.confirmPassword ? "tel" : "password"}
              id="password-confirm"
              autoComplete="current-confirmPassword"
              className={clsx(
                errors.confirmPassword
                  ? "border-[#FF3939] focus:outline-[#FF3939] focus:border-[#FF3939] text-[#717784]"
                  : darkMode
                  ? "border-[#525866] focus:outline-[#525866] focus:border-[#525866] hover:bg-[#232530] focus:bg-[#0E121B] text-[#717784]"
                  : "border-[#D9D9D9] focus:outline-[#0E121B] focus:border-[#0E121B] hover:bg-[#F5F7FA] focus:bg-[#FFF] text-[#0E121B]",
                "text-[0.875rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] border-[0.0625rem] w-full rounded-lg px-[1rem] py-[0.75rem] pr-[4rem] transition-all duration-150 focus:outline-1 focus:outline-offset-2"
              )}
            />
            {showPassword.confirmPassword ? (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("confirmPassword");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={darkMode ? whiteHidePassSvg : hidePassSvg}
                  alt="hidePassSvg"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleShowPassword("confirmPassword");
                }}
                className="w-max absolute top-[2rem] right-[1rem] outline-none cursor-pointer select-none"
              >
                <img
                  className="w-[1.25rem]"
                  src={showPassSvg}
                  alt="showPassSvg"
                />
              </button>
            )}
            <div
              className={clsx(
                errors.confirmPassword ? "opacity-100%" : "opacity-0",
                "flex gap-[0.25rem]"
              )}
            >
              <img
                src={redInfoSvg}
                alt="redInfoSvg"
                className="w-[0.75rem] select-none"
              />
              <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939]">
                {errors.confirmPassword?.message}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-[1rem] leading-[1.2rem] font-[600] text-[#FFF] bg-[#335CFF] hover:bg-[#2547D0] transition-all duration-150 p-[0.75rem] rounded-lg cursor-pointer w-full max-w-[12rem] outline-none mt-[0.5rem]"
              >
                Save Password
              </button>
            </div>
          </div>
        </form>
      </div>
      <Menu />
    </div>
  );
}

export default ChangePassword;
