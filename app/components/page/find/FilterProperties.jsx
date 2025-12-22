"use client";

import { useState, useEffect } from "react";
import FilterInput from "../../ui/filter/ui/FilterInput";
import FilterSelect from "../../ui/filter/ui/FilterSelect";
import LeafletMapInput from "./LeafletMapInput";

export default function PropertySidebarFilter({ filters, setFilters,setSidebarOpen }) {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMapSelect = (lat, lng) => {
    setFilters((prev) => ({
      ...prev,
      lat,
      lng,
    }));
  };

  return (
    <div className="md:w-90  w-60  max-h-[90vh]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        🏠 Filter Properties
      </h2>
       <div className="" onClick={()=> setSidebarOpen(false)}>
        x
       </div>
      <div className="space-y-4">
        {/* 🔍 Search Location */}
        <FilterInput
          placeholder="Search Location"
          name="location"
          value={filters.location}
          onChange={handleChange}
        />

        {/* 📍 Division */}
        <FilterSelect
          Label="Division"
          name="division_id"
          Options={[
            { value: "1", label: "Dhaka" },
            { value: "2", label: "Chittagong" },
            { value: "3", label: "Rajshahi" },
            { value: "4", label: "Khulna" },
          ]}
          DefaultOption="Select Division"
          value={filters.division_id}
          onChange={handleChange}
        />

        {/* 🏙️ District */}
        <FilterSelect
          Label="District"
          name="district_id"
          Options={[
            { value: "1", label: "Dhaka" },
            { value: "2", label: "Gazipur" },
            { value: "3", label: "Narayanganj" },
          ]}
          DefaultOption="Select District"
          value={filters.district_id}
          onChange={handleChange}
        />

        {/* 🏢 Property Type */}
        <FilterSelect
          Label="Property Type"
          name="property_type_id"
          Options={[
            { value: "1", label: "Apartment" },
            { value: "2", label: "House" },
            { value: "3", label: "Condo" },
            { value: "4", label: "Office" },
          ]}
          DefaultOption="Select Type"
          value={filters.property_type_id}
          onChange={handleChange}
        />

        {/* 💰 Price Range */}
        <div className="grid grid-cols-2 gap-2">
          <FilterInput
            placeholder="Min Price"
            name="price_min"
            value={filters.price_min}
            onChange={handleChange}
          />
          <FilterInput
            placeholder="Max Price"
            name="price_max"
            value={filters.price_max}
            onChange={handleChange}
          />
        </div>

        {/* 📐 Area Range */}
        <div className="grid grid-cols-2 gap-2">
          <FilterInput
            placeholder="Min Area (sqft)"
            name="area_min"
            value={filters.area_min}
            onChange={handleChange}
          />
          <FilterInput
            placeholder="Max Area (sqft)"
            name="area_max"
            value={filters.area_max}
            onChange={handleChange}
          />
        </div>

        {/* 🛏️ Bedrooms */}
        <FilterSelect
          Label="Bedrooms"
          name="bedrooms"
          Options={[
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
          ]}
          DefaultOption="Select Bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
        />

        {/* 🚿 Bathrooms */}
        <FilterSelect
          Label="Bathrooms"
          name="bathrooms"
          Options={[
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
          ]}
          DefaultOption="Select Bathrooms"
          value={filters.bathrooms}
          onChange={handleChange}
        />

        {/* 🏷️ Property Status */}
        <FilterSelect
          Label="Status"
          name="status"
          Options={[
            { value: "for_sale", label: "For Sale" },
            { value: "for_rent", label: "For Rent" },
            { value: "sold", label: "Sold" },
          ]}
          DefaultOption="Select Status"
          value={filters.status}
          onChange={handleChange}
        />

        {/* 🗓️ Available From */}
        <FilterInput
          type="date"
          name="available_from"
          value={filters.available_from}
          onChange={handleChange}
        />

        {/* ⚙️ Sort By */}
        <FilterSelect
          Label="Sort By"
          name="sort"
          Options={[
            { value: "price_asc", label: "Price (Low to High)" },
            { value: "price_desc", label: "Price (High to Low)" },
            { value: "newest", label: "Newest" },
          ]}
          DefaultOption="Sort By"
          value={filters.sort}
          onChange={handleChange}
        />

        {/* 🗺️ Map Input */}
       
      </div>
    </div>
  );
}
