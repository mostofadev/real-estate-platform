"use client";
import React from "react";
import PropertieCard from "../../ui/card/PropertieCard";
import Link from "next/link";
import { useHomePageProperty } from "@/app/hooks/useHomePage";
import PageLoading from "../../ui/loader/PageLoading";
function ProperticesItems() {
  const { data, isLoading, isError, error } = useHomePageProperty();
  const propertiess = data?.data || [];
  if (isLoading) {
    return <PageLoading />;
  }

  if (!propertiess || propertiess.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No Properties Date</p>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {propertiess.map((property) => (
          <PropertieCard key={property.id} properties={property} />
        ))}
      </div>

      <div className="my-12  text-right  ">
        <Link
          className="text-gray-700 py-2 px-6 border border-[0.5px] border-gray-200"
          href="/find"
        >
          Load more
        </Link>
      </div>
    </div>
  );
}

export default ProperticesItems;
