"use client";
import React from "react";
import DynamicTable from "@/app/components/admin/table/DynamicTable";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PageLoading from "@/app/components/ui/loader/PageLoading";
import {
  useAdminRequestApproved,
  useAdminRequestIndex,
  useAdminRequestRejected,
  useAdminRequestUpdateStatus,
} from "@/app/hooks/useAdminRequest";
import { useAdminPropertyDelete } from "@/app/hooks/useAdminProperty";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, page, setPage } =
    useAdminRequestRejected();
  const { mutate: DeleteProperty } = useAdminPropertyDelete();
  const { mutate: UpdateStatus } = useAdminRequestUpdateStatus();
  const properties =
    data?.data?.data?.map((item) => ({
      id: item.id,
      name: item.user?.name,
      email: item.user?.email,
      number: item.number,
      title: item.property?.title,
      message: item.message,
      status: item.status || "pending",
    })) || [];

  const pagination = data?.data
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

  const handleOnView = (id) => {
    router.push(`/admin/request/${id}`);
  };

  const handleDelete = (id) => {
    DeleteProperty(id, {
      onSuccess: () => {
        const remainingItems = data?.data.length - 1;
        if (remainingItems === 0 && page > 1) {
          setPage(page - 1);
        } else {
          queryClient.invalidateQueries(["admin-property", page]);
        }
      },
    });
  };

  const handleUpdateStatus = (id, status) => {
    UpdateStatus({ id, status });
  };

  const columns = [
    { header: "Name", field: "name" },
    { header: "Email", field: "email" },
    { header: "Number", field: "number" },
    { header: "Title", field: "title" },
    { header: "Message", field: "message" },
    { header: "Status", field: "status" },
  ];

  return (
    <div className="p-6">
      <div className="my-3">
        <AdminCreateTItle
          Title={"All Properties Request"}
          Approved={"Approved"}
          Pending={"Pending"}
          pTo="/admin/request"
          aTo="/admin/request/approved"
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
          data={properties}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onView={handleOnView}
        />
      )}
    </div>
  );
}
