"use client";
import React from "react";
import Input from "@/app/components/ui/formAction/Input";
import FormButton from "@/app/components/ui/button/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserAuthContext } from "@/app/Context/UserAuthContext";
import { forgotPasswordSchema } from "@/app/Schema/forgotPasswordSchema";
import TextInput from "@/app/components/ui/formAction/TextInput";

function ForgotPasswordForm() {
  const router = useRouter();

  const { forgotPassword } = useUserAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.email);

    if (response) {
      router.push("/change-password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10  p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Forgot Password
      </h2>

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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <FormButton
          type="submit"
          IsValid={isValid}
          loading={isSubmitting}
          ClassName="w-full"
        >
          Send Reset Link
        </FormButton>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Remembered your password?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
