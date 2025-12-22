"use client";
import React from "react";
import DynamicTable from "@/app/components/admin/table/DynamicTable";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import { useAdminFeatures, useAdminFeaturesDelete } from "@/app/hooks/useAdminFeature";
import PageLoading from "@/app/components/ui/loader/PageLoading";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, page, setPage } = useAdminFeatures();
  const { mutate: DeleteFeature, error: DeleteError } =
    useAdminFeaturesDelete();

  const categories = data?.data || [];
  const pagination = data
    ? {
        current_page: Number(data.current_page || 1),
        per_page: Number(data.per_page || 10),
        last_page: Number(data.last_page || 1),
        total: Number(data.total || 0),
      }
    : null;

  const handlePageChange = (newPage) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.last_page) return;
    setPage(newPage);
  };

 
  const handleUpdate = (id) => {
    router.push(`/admin/feature/update/${id}`);
  };
  const handleDelete = (id) => {
    DeleteFeature(id, {
      onSuccess: () => {
        const remainingItems = data?.data.length - 1;
        if (remainingItems === 0 && page > 1) {
          setPage(page - 1);
        } else {
          queryClient.invalidateQueries(["admin-features", page]);
        }
      },
    });
  };

  const columns = [
    { header: "Feature Name", field: "name" },
    { header: "Slug", field: "slug" },
  ];

  return (
    <div className="p-6">
      <div className="my-3">
        <AdminCreateTItle
          Title={"All Features"}
          To={"/admin/feature/create"}
          Text={"Create"}
        />
      </div>

      {isLoading ? (
       <PageLoading />
      ) : isError ? (
        <p className="text-red-500">
          Error: {error?.message || "Failed to load"}
        </p>
      ) : (
        <DynamicTable
          columns={columns}
          data={categories}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
