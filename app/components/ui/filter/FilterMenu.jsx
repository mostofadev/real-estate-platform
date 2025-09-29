"use client";
import { useState } from "react";
import PrimaryButton from "../button/Primary";
import { IoIosColorFilter } from "react-icons/io";
import Link from "next/link";

export default function FilterMenu() {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[var(--bg-one)] rounded-lg  border border-gray-50 p-4 shadow-sm mt-[37px] lg:mt-[70px] z-100 ">
      <ul className="flex items-center justify-center gap-4 flex-wrap ">
        <li className="mx-3">
          {/* <label
            htmlFor="all"
            className="cursor-pointer px-4 py-2  text-sm "
          >
            Location
          </label> */}
          <input
            type="search"
            name="location"
            id="all"
            className="peer outline-none  bg-[var(--bg-one)] px-6 py-3  border-none lg:border-r border-gray-200 w-full"
            placeholder="Search location"
            checked={active === 1}
            onChange={() => setActive(1)}
          />
        </li>
        <li className="mx-3">
          <select name="type" id="" className="peer outline-none  bg-[var(--bg-one)] px-12 py-3 w-full border-none lg:border-r border-gray-200">
            <option value="apartment" className="disabled">Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="office">Office</option>
          </select>
        </li>
        <li className="mx-3">
          <input
            type="date"
            name="date"
            id=""
            className="peer outline-none  bg-[var(--bg-one)] px-5 py-3  border-none lg:border-r border-gray-200 "
          />
        </li>
        <li className="border border-[0.5px] border-gray-200 mx-3 px-3 py-3 rounded-lg">
          <IoIosColorFilter className="inline mr-2 text-2xl text-[#9d4edd]" />
          <Link href="/filter" className="text-sm font-medium hover:underline">
            Filter
          </Link>
        </li>
        <li className="mx-3">
          <PrimaryButton>Search</PrimaryButton>
        </li>
      </ul>
    </div>
  );
}
