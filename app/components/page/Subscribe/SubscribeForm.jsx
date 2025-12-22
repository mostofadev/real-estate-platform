"use client";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSubscribe from "@/app/hooks/useSubscribe";
import BtnSpinner from "../../loader/BtnSniper";

export const subscribeSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});
function SubscribeForm() {
  const { mutate: subscribe, isPending } = useSubscribe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = (data) => {
    subscribe(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Your e-mail"
            {...register("email")}
            className={`py-5 px-5 outline-none border text-sm w-[260px]
              rounded-tl-full rounded-bl-full
              ${errors.email ? "border-red-400" : "border-gray-200"}`}
          />

          <button
            type="submit"
            disabled={isPending}
            className="relative flex gap-2 py-5 px-5 bg-[var(--primary-color)] 
             text-md text-white items-center 
             rounded-tr-full rounded-br-full 
             min-w-[120px] justify-center"
          >
            {/* Normal Content */}
            <span
              className={`flex items-center gap-2 transition-opacity
      ${isPending ? "opacity-0" : "opacity-100"}`}
            >
              Send
              <IoIosArrowRoundForward className="text-md text-white" />
            </span>

            {/* Spinner */}
            {isPending && (
              <span className="absolute inset-0 flex items-center justify-center">
                <BtnSpinner size={5} />
              </span>
            )}
          </button>
        </div>

        {errors.email && (
          <p className="text-red-500 text-xs mt-2 text-center">
            {errors.email.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SubscribeForm;
