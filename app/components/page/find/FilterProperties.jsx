"use client";
import { useState } from "react";
import { IoIosColorFilter } from "react-icons/io";
import Link from "next/link";
import PrimaryButton from "../../ui/button/Primary";
import FilterInput from "../../ui/filter/ui/FilterInput";
import FilterSelect from "../../ui/filter/ui/FilterSelect";

export default function FilterProperties() {
  const [active, setActive] = useState(1);

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "office", label: "Office" },
  ];

  const bedrooms = [
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  const bathrooms = [
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  const statusOptions = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "new", label: "New Project" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "lowToHigh", label: "Price: Low to High" },
    { value: "highToLow", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  return (
    <div className="bg-[var(--bg-one)] rounded-xl border border-gray-200 p-4 shadow-md  my-20">
      <div className="">
        <ul className="">
          <div className="flex gap-4 my-6 justify-between px-20">
            {/* Keyword */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Enter Keyword..."
                id="keyword"
                name="keyword"
                active={active}
                setActive={setActive}
                index={1}
              />
            </li>

            {/* Location */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Search Location"
                id="location"
                name="location"
                active={active}
                setActive={setActive}
                index={2}
              />
            </li>

            {/* Min Price */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Min Price"
                id="min"
                name="min"
                active={active}
                setActive={setActive}
                index={3}
              />
            </li>

            {/* Max Price */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Max Price"
                id="max"
                name="max"
                active={active}
                setActive={setActive}
                index={4}
              />
            </li>
            {/* Min Area */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Min Area (sqft)"
                id="minArea"
                name="minArea"
                active={active}
                setActive={setActive}
                index={9}
              />
            </li>

            {/* Max Area */}
            <li className="flex-shrink-0">
              <FilterInput
                placeholder="Max Area (sqft)"
                id="maxArea"
                name="maxArea"
                active={active}
                setActive={setActive}
                index={10}
              />
            </li>
            
          </div>

          <div className="flex gap-4 my-6 justify-between px-20">
            {/* Bathrooms */}
            <li className="flex-shrink-0">
              <FilterSelect
                Label="Bathrooms"
                id="bathrooms"
                name="bathrooms"
                Options={bathrooms}
                DefaultOption="Select Bathrooms"
                active={active}
                setActive={setActive}
                index={7}
              />
            </li>

            {/* Status */}
            <li className="flex-shrink-0">
              <FilterSelect
                Label="Status"
                id="status"
                name="status"
                Options={statusOptions}
                DefaultOption="Select Status"
                active={active}
                setActive={setActive}
                index={8}
              />
            </li>

{/* Property Type */}
            <li className="flex-shrink-0">
              <FilterSelect
                Label="Property Type"
                id="type"
                name="type"
                Options={propertyTypes}
                DefaultOption="Select Type"
                active={active}
                setActive={setActive}
                index={5}
              />
            </li>

            {/* Bedrooms */}
            <li className="flex-shrink-0">
              <FilterSelect
                Label="Bedrooms"
                id="bedrooms"
                name="bedrooms"
                Options={bedrooms}
                DefaultOption="Select Bedrooms"
                active={active}
                setActive={setActive}
                index={6}
              />
            </li>





            {/* Date */}
            <li className="flex-shrink-0">
              <input
                type="date"
                name="date"
                id="date"
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent"
              />
            </li>

            {/* Sort By */}
            <li className="flex-shrink-0">
              <FilterSelect
                Label="Sort By"
                id="sort"
                name="sort"
                Options={sortOptions}
                DefaultOption="Sort By"
                active={active}
                setActive={setActive}
                index={11}
              />
            </li>
          </div>

          <div className="flex justify-center gap-4">
            {/* Filter Button */}
            <li className="flex-shrink-0 border border-gray-300 rounded-lg px-3 py-2 flex items-center hover:shadow-md transition">
              <IoIosColorFilter className="text-2xl text-[#9d4edd] mr-2" />
              <Link
                href="/filter"
                className="text-sm font-medium hover:underline"
              >
                Filter
              </Link>
            </li>

            {/* Search Button */}
            <li className="flex-shrink-0">
              <PrimaryButton>Search</PrimaryButton>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
