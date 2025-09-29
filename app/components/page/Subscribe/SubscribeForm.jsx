import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function SubscribeForm() {
  return (
    <div>
      <form action="" method="post">
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Your e-mail"
            name="email"
            className="py-5 w-100 px-5 outline-none border border-[0.5px] border-gray-200  rounded-tl-full rounded-bl-full text-sm"
          />
          <button className="flex gap-2 py-5 px-5 bg-[var(--primary-color)] text-md text-white items-center  rounded-tr-full rounded-br-full">
            Send <IoIosArrowRoundForward className="text-md text-white"/>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubscribeForm;
