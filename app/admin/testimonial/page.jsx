"use client";
import React from "react";
import DynamicTable from "@/app/components/admin/table/DynamicTable";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import { useAdminTestimonialDelete, useGetAdminTestimonial } from "@/app/hooks/useAdminTestimonial";
import PageLoading from "@/app/components/ui/loader/PageLoading";

export default function AdminTestimonialPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, page, setPage } = useGetAdminTestimonial();
  const { mutate: deleteTestimonial } = useAdminTestimonialDelete();

  console.log("Testimonial data:", data);

  const Testimonials = Array.isArray(data?.data?.data) ? data.data.data : [];

  const pagination = data?.data
    ? {
        current_page: Number(data.data.current_page || 1),
        per_page: Number(data.data.per_page || 10),
        last_page: Number(data.data.last_page || 1),
        total: Number(data.data.total || 0),
      }
    : null;

  const handlePageChange = (newPage) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.last_page) return;
    setPage(newPage);
  };

  const handleUpdate = (id) => {
    router.push(`/admin/testimonial/update/${id}`);
  };


  const handleDelete = (id) => {
    deleteTestimonial(id, {
      onSuccess: () => {
        const remainingItems = Testimonials.length - 1;
        if (remainingItems === 0 && page > 1) {
          setPage(page - 1);
        } else {
          queryClient.invalidateQueries(["admin-testimonial", page]);
        }
      },
    });
  };

  // Table columns for blog
  const columns = [
    { header: "Name", field: "name" },
    { header: "Passion", field: "passion" },
    { header: "Image", field: "image" },
  ];

  return (
    <div className="p-6">
      <div className="my-3">
        <AdminCreateTItle
          Title={"All Testimonial Posts"}
          To={"/admin/testimonial/create"}
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
          data={Testimonials}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          imageField={"image"}
        />
      )}
    </div>
  );
}
