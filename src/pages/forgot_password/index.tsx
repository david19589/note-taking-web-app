import logoSvg from "../../assets/logo.svg";
import whiteLogoSvg from "../../assets/whiteLogo.svg";
import redInfoSvg from "../../assets/icon-info-red-circle.svg";
import checkmarkSvg from "../../assets/icon-checkmark.svg";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import clsx from "clsx";
import { forgotPassword } from "../../utils/api";

type FormData = {
  email: string;
};

const schema: ZodType<FormData> = z.object({
  email: z
    .string()
    .nonempty({ message: "Can't be empty" })
    .email({ message: "Please enter a valid email address." }),
});

function ForgotPassword(props: {
  darkMode: boolean;
  setDarkMode: (status: boolean) => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setServerError("Sending reset link...");
    try {
      const result = await forgotPassword(data.email);

      if (result.status === 200) {
        setServerError("link sent successfully. Check your email.");
      } else {
        setServerError(
          result.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Error sending link:", err);
      setServerError("Failed to send reset link. Please try again.");
    } finally {
      setTimeout(() => setServerError(null), 2000);
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div
      className={clsx(
        props.darkMode ? "bg-[#2B303B]" : "bg-[#F3F5F8]",
        "flex items-center justify-center px-[1rem] h-full w-full"
      )}
    >
      <div
        className={clsx(
          props.darkMode
            ? "bg-[#0E121B] border-[#232530]"
            : "bg-[#FFF] border-[#E0E4EA]",
          "lg:max-w-[33.75rem] md:max-w-[32.625rem] flex flex-col items-center border-[0.0625rem] px-[1rem] py-[3rem] rounded-2xl shadow-sm max-w-[21.5rem] w-full"
        )}
      >
        <div className="flex flex-col items-center mb-[2.5rem]">
          <img
            src={props.darkMode ? whiteLogoSvg : logoSvg}
            alt="logoSvg"
            className="mb-[1.5rem] select-none"
          />
          <h1
            className={clsx(
              props.darkMode ? "text-[#FFF]" : "text-[#0E121B]",
              "text-[1.5rem] leading-[1.75rem] tracking-[-0.03125rem] font-[700] mb-[0.5rem] text-center"
            )}
          >
            Forgotten your password?
          </h1>
          <p
            className={clsx(
              props.darkMode ? "text-[#CACFD8]" : "text-[#525866]",
              "text-[0.9375rem] leading-[1.15rem] tracking-[-0.0125rem] font-[400] text-center max-w-[21rem]"
            )}
          >
            Enter your email below, and we`ll send you a link to reset it.
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
                  props.darkMode ? "text-[#FFF]" : "text-[#0E121B]",
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
                    : props.darkMode
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
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] ">
                  {errors.email?.message}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="text-[1rem] leading-[1.2rem] font-[600] text-[#FFF] bg-[#335CFF] hover:bg-[#2547D0] transition-all duration-150 p-[0.75rem] rounded-lg cursor-pointer w-full outline-none"
            >
              Send Reset Link
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
export default ForgotPassword;
