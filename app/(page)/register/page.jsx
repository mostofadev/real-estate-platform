import Layout from "@/app/components/layout/Layout";
import MarginSection from "@/app/components/sections/MarginSection";
import Image from "next/image";
import React from "react";
import ImageLogin from "../../../public/Image/login-one.jpg";
import RegisterForm from "@/app/components/page/user/register/RegisterForm";
function page() {
  return (
    <div>
      <Layout>
        <MarginSection>
          <div className="lg:mx-50 mx-3 my-42 lg:my-0  ">
            <div className="p-6  rounded-lg my-8 bg-[var(--bg-one)] border border-[0.5px] border-gray-200">
              <div className="flex gap-4 items-center">

                <div className="w-full lg:block hidden">
                  <Image
                    src={ImageLogin}
                    alt="Property Image"
                    width={620}
                    height={200}
                    className="rounded-lg w-full"
                  />

                  
                </div>

                <div className="w-full px-12 ">
                  <h2 className="text-2xl my-3 font-bold">Welcome Back to Real Nest!</h2>
                  {/* <p className="text-[12px] my-3">SIng In Your Account</p> */}
                  <RegisterForm />
                </div>

              </div>
            </div>
          </div>
        </MarginSection>
      </Layout>
    </div>
  );
}

export default page;
