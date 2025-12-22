"use client";
import FeatureUpdateForm from "@/app/components/admin/page/Feature/FeatureUpdateForm";
import AdminBack from "@/app/components/ui/section/AdminBack";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const { id } = useParams();
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/feature"} />
        <h1 className="text-2xl font-bold">Update Feature</h1>
      </div>
      <div className="">
        <FeatureUpdateForm id={id} />
      </div>
    </div>
  );
}

export default page;
