"use client";
import React from "react";
import DynamicTable from "@/app/components/admin/table/DynamicTable";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import { useAdminBlogDelete, useGetAdminBlog } from "@/app/hooks/useAdminBlog";
import PageLoading from "@/app/components/ui/loader/PageLoading";

export default function AdminBlogPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Blog data fetch
  const { data, isLoading, isError, error, page, setPage } = useGetAdminBlog();
  const { mutate: deleteBlog } = useAdminBlogDelete();

  // Safe way to get blog items array
  const blogs = Array.isArray(data?.data?.data) ? data.data.data : [];

  // Pagination object
  const pagination = data?.data
    ? {
        current_page: Number(data.data.current_page || 1),
        per_page: Number(data.data.per_page || 10),
        last_page: Number(data.data.last_page || 1),
        total: Number(data.data.total || 0),
      }
    : null;

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.last_page) return;
    setPage(newPage);
  };

  // Handle blog update
  const handleUpdate = (id) => {
    router.push(`/admin/blog/update/${id}`);
  };

  // Handle blog delete
  const handleDelete = (id) => {
    deleteBlog(id, {
      onSuccess: () => {
        const remainingItems = blogs.length - 1;
        if (remainingItems === 0 && page > 1) {
          setPage(page - 1);
        } else {
          queryClient.invalidateQueries(["admin-blog", page]);
        }
      },
    });
  };

  // Table columns for blog
  const columns = [
    { header: "Title", field: "title" },
    { header: "Slug", field: "slug" },
    { header: "Image", field: "featured_image" },
    { header: "Created At", field: "created_at" },
  ];

  return (
    <div className="p-6">
      <div className="my-3">
        <AdminCreateTItle
          Title={"All Blog Posts"}
          To={"/admin/blog/create"}
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
          data={blogs}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          imageField={"featured_image"}
        />
      )}
    </div>
  );
}
