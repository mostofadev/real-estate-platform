import Image from "next/image";
import React from "react";
import { IoIosSend } from "react-icons/io";

function SubscribeIcons() {
  return (
    <div className="flex items-center justify-center ">
      <IoIosSend   className="w-16 h-16 bg-[var(--primary-color)] p-3 rounded-full text-white"/>
    </div>
  );
}

export default SubscribeIcons;
