"use client";
import SubmitButton from "@/app/components/ui/button/SubmitButton";
import Link from "next/link";
import React, { useEffect } from "react";
import GoogleLoginButton from "./GoogleLogin";
import { loginSchema } from "@/app/Schema/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserAuthContext } from "@/app/Context/UserAuthContext";
import { useRouter } from "next/navigation";
import FormButton from "@/app/components/ui/button/SubmitButton";
import TextInput from "@/app/components/ui/formAction/TextInput";
import Checkbox from "@/app/components/ui/formAction/Checkbox";

function LoginForm() {
  const { login } = useUserAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const remember = watch("remember", false);

  const handleRememberChange = (e) => {
    setValue("remember", e.target.checked);
  };

  useEffect(() => {
    setValue("remember", remember || false);
  }, [remember, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 200) {
        router.push("/user/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
        <div className="my-4">
          <TextInput
            name="email"
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            label="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="my-4">
          <TextInput
            name="password"
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            label="Enter Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Checkbox
              id="remember"
              label="Remember Me"
              checked={remember}
              onChange={handleRememberChange}
              {...register("remember")}
              error={
                errors.remember?.message ||
                (Array.isArray(errors.remember) ? errors.remember[0] : "")
              }
            />
          </div>

          <Link className="text-[12px] text-gray-400" href={"/forgot-password"}>
            Forgot Password?
          </Link>
        </div>

        <div className="my-6">
          <FormButton
            type="submit"
            IsValid={isValid}
            loading={isSubmitting}
            ClassName="w-full"
          >
            Login
          </FormButton>
        </div>

        <div className="relative text-center text-sm text-gray-400">
          <span className="bg-white px-4 z-10 relative">or continue with</span>
          <div className="absolute inset-0 top-2 border-t border-gray-300"></div>
        </div>

        <div className="my-4">
          <GoogleLoginButton />
        </div>

        <div className="my-6">
          <p className="text-center text-[12px]">
            Don't have any Account?
            <Link className="text-blue-500" href={"/register"}>
              {" "}
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
