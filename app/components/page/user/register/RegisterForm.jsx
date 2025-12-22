"use client";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "../login/GoogleLogin";
import { registerSchema } from "@/app/Schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserAuthContext } from "@/app/Context/UserAuthContext";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/ui/formAction/TextInput";
import FormButton from "@/app/components/ui/button/SubmitButton";
function RegisterForm() {
  const router = useRouter();
  const { registerUser, loading } = useUserAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode:"onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {

 
      const AppData = new FormData();
      AppData.append("name", data.name);
      AppData.append("email", data.email);
      AppData.append("password", data.password);
      AppData.append("phone", data.phone);

      const user = await registerUser(AppData);
      if (user) {
        router.push("/user/profile");
      }
    
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <TextInput
            name="name"
            type="text"
            placeholder="Enter name"
            {...register("name")}
            label="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
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

        <div className="my-4">
          <TextInput
            name="phone"
            type="number"
            placeholder="Enter Phone"
            {...register("phone")}
            label="Enter Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="my-6">
          <FormButton
            type="submit"
            IsValid={isValid}
            loading={isSubmitting}
            ClassName="w-full"
          >
            Register
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
            have you any Account?
            <Link className="text-blue-500" href={"/login"}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
