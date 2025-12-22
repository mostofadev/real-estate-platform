import Link from "next/link";
import React from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";

function AdminBack({ To }) {
  return (
    <div>
      <Link
        href={To}
        className="flex items-center inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-sm shadow-md  transform transition-all duration-300 "
      >
        <IoReturnDownBackOutline className="text-lg " />
      </Link>
    </div>
  );
}

export default AdminBack;
