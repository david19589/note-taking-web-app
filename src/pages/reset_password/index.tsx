import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";
import checkmarkSvg from "../../assets/icon-checkmark.svg";
import showPassSvg from "../../assets/icon-show-password.svg";
import hidePassSvg from "../../assets/icon-hide-password.svg";
import whiteHidePassSvg from "../../assets/icon-hide-password-white.svg";
import infoSvg from "../../assets/icon-info.svg";
import whiteInfoSvg from "../../assets/icon-info-white.svg";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import clsx from "clsx";
import { useNavigate, useSearchParams } from "react-router";
import { resetPassword } from "../../utils/api";
import { useUIStore } from "../../stores/useUIStore";

type FormData = {
  password: string;
  confirmPassword: string;
};

const schema: ZodType<FormData> = z
  .object({
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

function ResetPassword() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { darkMode } = useUIStore();

  const [searchParams] = useSearchParams();

  const handleShowPassword = (filed: "password" | "confirmPassword") => {
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
    if (isSubmitting) return;

    setIsSubmitting(true);

    const token = searchParams.get("token");

    if (!token) {
      setServerError("Invalid or missing reset token.");
      return;
    }

    try {
      const result = await resetPassword(token, data.password);

      if (result.status === 200) {
        setServerError("Password reset successful.");
      } else {
        setServerError(
          result.data?.message || "Something went wrong. Please try again."
        );
      }

      navigate("/auth/login");
    } catch (err) {
      console.error("Error resetting password:", err);
    } finally {
      setTimeout(() => setServerError(null), 2000);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#2B303B]" : "bg-[#F3F5F8]",
        "flex items-center justify-center px-[1rem] h-full w-full"
      )}
    >
      <div
        className={clsx(
          darkMode
            ? "bg-[#0E121B] border-[#232530]"
            : "bg-[#FFF] border-[#E0E4EA]",
          "lg:max-w-[33.75rem] md:max-w-[32.625rem] flex flex-col items-center border-[0.0625rem] px-[1rem] py-[3rem] rounded-2xl shadow-sm max-w-[21.5rem] w-full"
        )}
      >
        <div className="flex flex-col items-center mb-[2.5rem]">
          <img
            src={darkMode ? whiteLogoSvg : logoSvg}
            alt="logoSvg"
            className="mb-[1.5rem] select-none"
          />
          <h1
            className={clsx(
              darkMode ? "text-[#FFF]" : "text-[#0E121B]",
              "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[0.5rem] text-center"
            )}
          >
            Reset Your Password
          </h1>
          <p
            className={clsx(
              darkMode ? "text-[#CACFD8]" : "text-[#525866]",
              "text-[0.9375rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] text-center max-w-[21rem]"
            )}
          >
            Choose a new password to secure your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[27.75rem] w-full"
        >
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
            <button
              type="submit"
              className="text-[1rem] leading-[1.2rem] font-[600] text-[#FFF] bg-[#335CFF] hover:bg-[#2547D0] transition-all duration-150 p-[0.75rem] rounded-lg cursor-pointer w-full outline-none mt-[0.5rem]"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <div
        className={clsx(
          serverError
            ? "top-[2rem] opacity-[100%]"
            : "top-[-10rem] opacity-0 select-none",
          "absolute transition-all duration-200 gap-[0.25rem] flex items-center bg-[#FFF] p-[0.75rem] rounded-md shadow-md"
        )}
      >
        <img
          src={checkmarkSvg}
          alt="checkmarkSvg"
          className="w-[1.2rem] select-none"
        />
        <span className="text-[0.85rem] leading-[1rem] font-[500] text-[#000]">
          {serverError}
        </span>
      </div>
    </div>
  );
}
export default ResetPassword;
