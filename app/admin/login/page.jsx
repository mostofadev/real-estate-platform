"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoShieldCheckmark, IoHardwareChipSharp } from "react-icons/io5";
import { useAdminAuthContext } from "@/app/Context/AdminAuthContext";
import { useRouter } from "next/navigation";
import NonAdminProtectedRouteUser from "@/app/route/NonAdminProtestedRouteUser";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Page() {
  const route = useRouter();
  const { login } = useAdminAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Admin Login Data:", data);
    const res = await login(data);
    console.log("log", res.token);

    if (res) {
      return route.push("/admin/dashboard");
    }
  };

  return (
    <NonAdminProtectedRouteUser>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
        {/* Background circuit effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0,transparent_60%)]"></div>
        <div className="absolute top-20 left-10 text-cyan-500 opacity-20 animate-pulse">
          <IoHardwareChipSharp size={120} />
        </div>
        <div className="absolute bottom-20 right-10 text-cyan-500 opacity-20 animate-pulse">
          <IoShieldCheckmark size={120} />
        </div>

        {/* Login card */}
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-cyan-500/40 rounded-2xl shadow-xl shadow-cyan-500/20 p-8 z-10">
          {/* Logo / Title */}
          <div className="flex flex-col items-center mb-6">
            <IoHardwareChipSharp className="text-cyan-400 mb-2" size={48} />
            <h2 className="text-2xl font-bold text-cyan-400 tracking-wide">
              Robotics Admin
            </h2>
            <p className="text-gray-400 text-sm">Secure Login Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="admin@robotics.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} Robotics Control System
          </p>
        </div>
      </div>
    </NonAdminProtectedRouteUser>
  );
}

export default Page;
