"use client";
import CategoryUpdateForm from "@/app/components/admin/page/category/CategoryUpdateForm";
import AdminBack from "@/app/components/ui/section/AdminBack";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const { id } = useParams();
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/category"} />
        <h1 className="text-2xl font-bold">Update Category</h1>
      </div>
      <div className="">
        <CategoryUpdateForm id={id} />
      </div>
    </div>
  );
}

export default page;
