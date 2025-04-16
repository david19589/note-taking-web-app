import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import showPassSvg from "../../assets/icon-show-password.svg";
import hidePassSvg from "../../assets/icon-hide-password.svg";
import whiteHidePassSvg from "../../assets/icon-hide-password-white.svg";
import googleSvg from "../../assets/icon-google.svg";
import WhiteGoogleSvg from "../../assets/icon-google-white.svg";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { authWithGoogle } from "../../utils/google_auth";
import { useUIStore } from "../../stores/useUIStore";

type FormData = {
  email: string;
  password: string;
};

const schema: ZodType<FormData> = z.object({
  email: z
    .string()
    .nonempty({ message: "Can't be empty" })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().nonempty({ message: "Can't be empty" }),
});

function Login() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { darkMode } = useUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      setServerError(null);
      const response = await login({
        userEmail: data.email,
        userPassword: data.password,
      });

      if (response.data?.token) {
        Cookies.set("authToken", response.data?.token, { expires: 7 });
        Cookies.set("userEmail", data.email, { expires: 7 });
        console.log("Login successful, token stored in cookies.");
        navigate("/");
      }
    } catch (err) {
      console.error("Error logging in:", err);

      if (err instanceof AxiosError) {
        if (err.response && err.response.data) {
          setServerError(
            err.response.data.message || "Invalid email or password"
          );
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      } else {
        console.error("Unknown error:", err);
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setTimeout(() => setServerError(null), 2000);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

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
            Welcome to Note
          </h1>
          <p
            className={clsx(
              darkMode ? "text-[#CACFD8]" : "text-[#525866]",
              "text-[0.9375rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] text-center max-w-[21rem]"
            )}
          >
            Please log in to continue
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[27.75rem] w-full"
        >
          <div className="flex flex-col gap-[1rem] max-w-[28.625rem] w-full">
            <div className="flex flex-col gap-[0.375rem]">
              <h2
                className={clsx(
                  darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                  "text-[0.875rem] leading-[1.05rem] tracking-[-0.0125rem] font-[500]"
                )}
              >
                Email Address
              </h2>
              <input
                {...register("email")}
                type="tel"
                id="email-register"
                autoComplete="email-register"
                placeholder="email@example.com"
                className={clsx(
                  errors.email
                    ? "border-[#FF3939] focus:outline-[#FF3939] focus:border-[#FF3939] text-[#717784]"
                    : darkMode
                    ? "border-[#525866] focus:outline-[#525866] focus:border-[#525866] hover:bg-[#232530] focus:bg-[#0E121B] text-[#717784]"
                    : "border-[#D9D9D9] focus:outline-[#0E121B] focus:border-[#0E121B] hover:bg-[#F5F7FA] focus:bg-[#FFF] text-[#0E121B]",
                  "text-[0.875rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] border-[0.0625rem] w-full rounded-lg px-[1rem] py-[0.75rem] transition-all duration-150 focus:outline-1 focus:outline-offset-2"
                )}
              />
              <div
                className={clsx(
                  errors.email ? "opacity-100%" : "opacity-0",
                  "flex gap-[0.25rem] transition-opacity duration-100"
                )}
              >
                <img
                  src={redInfoSvg}
                  alt="redInfoSvg"
                  className="w-[0.75rem] select-none"
                />
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939]">
                  {errors.email?.message}
                </span>
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
                  Password
                </h2>
                <Link className="flex" to="/auth/forgot-password">
                  <button
                    type="button"
                    className={clsx(
                      darkMode ? "text-[#99A0AE]" : "text-[#525866]",
                      "text-[0.75rem] leading-[1rem] font-[400] cursor-pointer outline-none hover:text-[#335CFF] transition-all duration-150 underline"
                    )}
                  >
                    Forgot
                  </button>
                </Link>
              </div>
              <input
                {...register("password")}
                type={showPassword ? "tel" : "password"}
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
              {showPassword ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(false);
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
                    setShowPassword(true);
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
            <button
              type="submit"
              className="text-[1rem] leading-[1.2rem] font-[600] text-[#FFF] bg-[#335CFF] hover:bg-[#2547D0] transition-all duration-150 p-[0.75rem] rounded-lg cursor-pointer w-full outline-none"
            >
              Login
            </button>
            <div className="flex flex-col gap-[1rem]">
              <span
                className={clsx(
                  darkMode ? "bg-[#474a5a]" : "bg-[#E0E4EA]",
                  "flex w-full h-[0.0625rem] mb-[1.5rem]"
                )}
              />
              <div className="flex flex-col items-center gap-[1rem]">
                <h2
                  className={clsx(
                    darkMode ? "text-[#CACFD8]" : "text-[#525866]",
                    "text-[0.875rem] leading-[1.125rem] tracking-[-0.0125rem] font-[400]"
                  )}
                >
                  Or log in with:
                </h2>
                <button
                  type="button"
                  onClick={authWithGoogle}
                  className={clsx(
                    darkMode
                      ? "text-[#FFFFFF] border-[#525866] hover:bg-[#232530]"
                      : "text-[#172036] border-[#CACFD8] hover:bg-[#e0e4ea42]",
                    "flex items-center justify-center gap-[1rem] text-[1rem] leading-[1rem] tracking-[0.03125rem] font-[500] p-[0.85rem] rounded-xl border-[0.0625rem] cursor-pointer w-full outline-none transition-all duration-150"
                  )}
                >
                  <img
                    src={darkMode ? WhiteGoogleSvg : googleSvg}
                    alt="googleSvg"
                    className="select-none"
                  />
                  Google
                </button>
              </div>
              <span
                className={clsx(
                  darkMode ? "bg-[#474a5a]" : "bg-[#E0E4EA]",
                  "flex w-full h-[0.0625rem] mb-[1.5rem]"
                )}
              />
              <div className="flex justify-center items-center gap-[0.2rem]">
                <h3
                  className={clsx(
                    darkMode ? "text-[#CACFD8]" : "text-[#525866]",
                    "text-[0.875rem] leading-[1.125rem] tracking-[-0.0125rem] font-[400]"
                  )}
                >
                  No account yet?
                </h3>
                <Link to="/auth/signup" className="flex">
                  <button
                    type="button"
                    className={clsx(
                      darkMode ? "text-[#FFF]" : "text-[#0a1f50]",
                      "text-[0.875rem] leading-[1.125rem] tracking-[-0.0125rem] font-[400] cursor-pointer outline-none hover:text-[#708ccf] transition-all duration-150"
                    )}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
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
          src={redInfoSvg}
          alt="redInfoSvg"
          className="w-[1.2rem] select-none"
        />
        <span className="text-[0.85rem] leading-[1rem] font-[500] text-[#000]">
          {serverError}
        </span>
      </div>
    </div>
  );
}
export default Login;
