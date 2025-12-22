"use client";
import React, { useState } from "react";
import PropertiesItems from "@/app/components/page/find/PropertiesItems";
import PropertySidebarFilter from "@/app/components/page/find/FilterProperties";
import LeafletMapInput from "@/app/components/page/find/LeafletMapInput";

export default function Page() {
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [filters, setFilters] = useState({
    lat: 23.8103, 
    lng: 90.4125,
  });

  // Map marker click handler
  const handleMapSelect = (lat, lng) => {
    setFilters((prev) => ({ ...prev, lat, lng }));
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Filter */}
      <div className="flex-shrink-0">
        <PropertySidebarFilter
          onApply={(data) => setFilteredProperties(data.data)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-2 gap-3 p-4 bg-gray-100 overflow-y-auto">
        {/* Leaflet Map */}
        <div className="h-full">
          <LeafletMapInput
            register={{
              latitude: { value: filters.lat },
              longitude: { value: filters.lng },
            }}
            setValue={(name, value) => {
              if (name === "latitude") handleMapSelect(value, filters.lng);
              if (name === "longitude") handleMapSelect(filters.lat, value);
            }}
            errors={{}}
          />
        </div>

        {/* Property List */}
        <div className="overflow-y-auto">
          <PropertiesItems properties={filteredProperties} />
        </div>
      </div>
    </div>
  );
}
