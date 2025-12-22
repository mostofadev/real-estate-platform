"use client";
import React, { useState } from "react";
import Input from "@/app/components/ui/formAction/Input";
import FormButton from "@/app/components/ui/button/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserAuthContext } from "@/app/Context/UserAuthContext";
import { z } from "zod";
import TextInput from "@/app/components/ui/formAction/TextInput";

const verifyOtpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().min(4, { message: "Enter valid OTP" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function VerifyOtpForm() {
  const router = useRouter();
  const { verifyOtp } = useUserAuthContext();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const appData = new FormData();
    appData.append("email", data.email);
    appData.append("otp", data.otp);
    appData.append("password", data.newPassword);
    appData.append("confirmPassword", data.confirmPassword);
    const response = await verifyOtp(appData);
    if (response) {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Verify OTP & Change Password
      </h2>

      {!success && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextInput
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              label="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <TextInput
              name="otp"
              type="text"
              placeholder="Enter OTP"
              {...register("otp")}
              label="OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <TextInput
              name="newPassword"
              type="password"
              placeholder="Enter New Password"
              {...register("newPassword")}
              label="New Password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <TextInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
              label="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <FormButton
            type="submit"
            IsValid={isValid}
            loading={isSubmitting}
            ClassName="w-full"
          >
            Reset Password
          </FormButton>
        </form>
      )}
    </div>
  );
}

export default VerifyOtpForm;
