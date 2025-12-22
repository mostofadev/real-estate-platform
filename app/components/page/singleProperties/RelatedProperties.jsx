 import React from "react";
import { useRelatedHomePageProperty } from "@/app/hooks/useHomePage";
import PropertieCard from "../../ui/card/PropertieCard";
import PageLoading from "../../ui/loader/PageLoading";

function RelatedProperties({ id }) {
  const { data, isLoading, isError } = useRelatedHomePageProperty(id);

  console.log("related property", data);

  if (isLoading) {
    return (
     <PageLoading />
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load related properties.
      </p>
    );
  }


  const related = data?.data ?? [];

  if (related.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        No related properties found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1  gap-6">
      {related.map((property) => (
        <PropertieCard key={property.id} properties={property} />
      ))}
    </div>
  );
}

export default RelatedProperties;
