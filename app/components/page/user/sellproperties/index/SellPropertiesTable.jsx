"use client";
import React, { useState, useEffect } from "react";
import Table from "@/app/components/admin/table/TableMain";
import TableHeader from "@/app/components/admin/table/TableHeader";
import TableHeadCell from "@/app/components/admin/table/TableHeadCell";
import TableBody from "@/app/components/admin/table/TableBody";
import TableRow from "@/app/components/admin/table/TableRow";
import TableCell from "@/app/components/admin/table/TableCell";
import {
  useDeletePropertyMutation,
  useGetPropertyQuery,
} from "@/store/api/PropertiesApi";
import Pagination from "@/app/components/ui/pagination/Pagination";
import TableActions from "@/app/components/admin/table/TableActions";
import { useRouter } from "next/navigation";
import HomeSpringLoader from "@/app/components/ui/loader/Loding";

function SellPropertiesTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useGetPropertyQuery(page);

  const [deleteProperty, { isLoading: deleteLoading, isError: deleteError }] =
    useDeletePropertyMutation();

  useEffect(() => {
  }, [property]);

  if (isLoading)
    return <HomeSpringLoader />

  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {error?.data?.message || "Something went wrong"}
      </p>
    );

  const properties = property?.data?.data || [];
  const pagination = {
    current_page: property?.data?.current_page,
    last_page: property?.data?.last_page,
    per_page: property?.data?.per_page,
    total: property?.data?.total,
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProperty(id).unwrap();
      if(response.status === 200){
        router.push(`sell-properties`)
      }
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <tr>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Location</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </tr>
        </TableHeader>

        <TableBody>
          {properties.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.full_location}</TableCell>
              <TableCell>
                <img
                  src={`http://localhost:8000/${item.image_url}`}
                  alt={item.title}
                  width={60}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>
                <TableActions
                  onView={() => router.push(`propertie/${item.id}`)}
                  onDelete={() => handleDelete(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default SellPropertiesTable;
