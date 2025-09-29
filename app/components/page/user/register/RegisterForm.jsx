import SubmitButton from "@/app/components/ui/button/SubmitButton";
import Input from "@/app/components/ui/formAction/Input";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "../login/GoogleLogin";
import Select from "@/app/components/ui/formAction/Select";

function RegisterForm() {
  return (
    <div className="w-full">
      <form action="" method="post">
        <div className="my-4">
          <Input
            Name="name"
            Type="text"
            Placeholder="Enter name"
            id="name"
            Label="Enter name"
          />
        </div>
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
            Type="password"
            Placeholder="Enter Password"
            id="password"
            Label="Enter Password"
          />
        </div>
        <div className="my-4">
             <Select
        Label="Choose Country"
        Name="country"
        Options={[
          { value: "Buyer", label: "Buyer" },
          { value: "agent", label: "agent" },
          { value: "owner", label: "owner" },
        ]}
      />
        </div>
        <div className="my-4">
          <Input
            Name="phone"
            Type="number"
            Placeholder="Enter Phone"
            id="phone"
            Label="Enter Phone"
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
          <SubmitButton>Register</SubmitButton>
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
          have you any Account?<Link className="text-blue-500" href={"/login"}> Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
