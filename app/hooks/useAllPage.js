"use client"
import { useState } from "react";
import { getPageBlogServices } from "../Services/AllPageServices";
import { useQuery } from "@tanstack/react-query";

export const useGetPageBlog = () => {
  const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["page-blog", page],
    queryFn: () => getPageBlogServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};