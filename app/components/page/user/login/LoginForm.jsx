import SubmitButton from "@/app/components/ui/button/SubmitButton";
import Input from "@/app/components/ui/formAction/Input";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "./GoogleLogin";

function LoginForm() {
  return (
    <div className="w-full">
      <form action="" method="post">
        <div className="my-4">
          <Input
            Name="email"
            Type="email"
            Placeholder="Enter Email"
            id="id"
            Label="Enter Email"
          />
        </div>
        <div className="my-4">
          <Input
            Name="password"
            Type="Password"
            Placeholder="Enter Password"
            id="password"
            Label="Enter Password"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <input name="remember" type="checkbox" />
            <label htmlFor="box" className="text-[12px]">
              Remember Me
            </label>
          </div>

          <Link className="text-[12px] text-gray-400" href={"/"}>
            Forgot Password?
          </Link>
        </div>

        <div className="my-6">
          <SubmitButton>Log In</SubmitButton>
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
            Don't have any Account?<Link className="text-blue-500" href={"/register"}> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
