"use client";
import React from "react";
import DynamicTable from "@/app/components/admin/table/DynamicTable";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PageLoading from "@/app/components/ui/loader/PageLoading";

import { useAdminUser } from "@/app/hooks/useAdminUser";

export default function RejectedRequestsPage() {

  const { data, isLoading, isError, error, page, setPage } =
    useAdminUser();

  const requests =
    data?.data?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone || "N/A",
      address: item.address || "N/A",
      status: "rejected",
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

 





  const columns = [
    // { header: "ID", field: "id" },
    { header: "Name", field: "name" },
    { header: "Email", field: "email" },
    { header: "Phone", field: "phone" },
    { header: "Address", field: "address" },
  ];

  return (
    <div className="p-6">
      <div className="my-3">
        <AdminCreateTItle
          Title={"Rejected Requests"}
        //   Approved={"All Requests"}
        //   Rejected={"Approved"}
        //   aTo="/admin/request"
        //   rTo="/admin/request/approved"
        />
      </div>

      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <p className="text-red-500">
          Error: {error?.message || "Failed to load rejected requests"}
        </p>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No rejected requests found
        </div>
      ) : (
        <DynamicTable
          columns={columns}
          data={requests}
          pagination={pagination}
          onPageChange={handlePageChange}
        //   onDelete={handleDelete}
        //   onView={handleOnView}
        //   onUpdateStatus={handleUpdateStatus}
          //statusField="status"
        />
      )}
    </div>
  );
}