"use client";
import CategoryUpdateForm from "@/app/components/admin/page/category/CategoryUpdateForm";
import PropertyUpdateForm from "@/app/components/admin/page/propertyType/PropertyUpdateForm";
import AdminBack from "@/app/components/ui/section/AdminBack";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const { id } = useParams();
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/property-type"} />
        <h1 className="text-2xl font-bold">Update Property</h1>
      </div>
      <div className="">
        <PropertyUpdateForm id={id} />
      </div>
    </div>
  );
}

export default page;
