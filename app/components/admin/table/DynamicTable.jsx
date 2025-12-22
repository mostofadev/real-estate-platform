"use client";
import React from "react";
import Table from "./TableMain";
import TableHeader from "./TableHeader";
import TableHeadCell from "./TableHeadCell";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import TableActions from "./TableActions";
import Pagination from "@/app/components/ui/pagination/Pagination";

export default function DynamicTable({
  columns = [],
  data = [],
  pagination,
  onPageChange,
  onDelete = null,
  onView = null,
  onUpdate = null,
  onUpdateStatus = null,
  imageField,
  statusField = null,
}) {
  // Check if any action handler is provided
  const hasActions = onDelete || onView || onUpdate || onUpdateStatus;

  // Calculate starting number for current page
  const getRowNumber = (index) => {
    if (pagination) {
      return (pagination.current_page - 1) * pagination.per_page + index + 1;
    }
    return index + 1;
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <tr>
            <TableHeadCell>SL</TableHeadCell>
            {columns.map((col, index) => (
              <TableHeadCell key={index}>{col.header}</TableHeadCell>
            ))}
            {hasActions && <TableHeadCell>Action</TableHeadCell>}
          </tr>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{getRowNumber(index)}</TableCell>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.field === imageField ? (
                    <img
                      src={`http://localhost:8000/${item[col.field]}`}
                      alt={item.title}
                      width={60}
                      className="rounded-md"
                    />
                  ) : col.field === statusField ? (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item[col.field] === "approved"
                          ? "bg-green-100 text-green-800"
                          : item[col.field] === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item[col.field]}
                    </span>
                  ) : (
                    item[col.field]
                  )}
                </TableCell>
              ))}

              {hasActions && (
                <TableCell>
                  <TableActions
                    onView={onView ? () => onView(item.id) : null}
                    onDelete={onDelete ? () => onDelete(item.id) : null}
                    onEdit={onUpdate ? () => onUpdate(item.id) : null}
                    onUpdateStatus={
                      onUpdateStatus && statusField
                        ? (status) => onUpdateStatus(item.id, status)
                        : null
                    }
                    currentStatus={statusField ? item[statusField] : null}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
