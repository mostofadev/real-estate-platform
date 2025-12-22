"use client";
import React, { useState } from "react";
import BlogCard from "../../ui/card/BlogCard";
import { useGetPageBlog } from "@/app/hooks/useAllPage";
import Pagination from "../../ui/pagination/Pagination";
import PageLoading from "../../ui/loader/PageLoading";

function BlogPageItem() {
  const { data, setPage,isLoading } = useGetPageBlog();
  const blog = Array.isArray(data?.data?.data) ? data.data.data : [];
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

  if(isLoading){
    return <PageLoading />
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blog.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="my-3">
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default BlogPageItem;
