import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminBlogServices,
  getAdminBlogServices,
  postAdminBlogServices,
  singleAdminBlogServices,
  updateAdminBlogServices,
} from "../Services/AdminBlogServices";
import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

export const useGetAdminBlog = () => {
  const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-blog", page],
    queryFn: () => getAdminBlogServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};

export const useSingleAdminBlog = (id) => {
  return useQuery({
    queryKey: ["admin-blog-single", id],
    queryFn: () => singleAdminBlogServices(id),
    enabled: !!id,
  });
};

export const usePostAdminBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      postAdminBlogServices(data);
    },
    onSuccess: (res) => {
      const id = res?.data?.id;
      queryClient.invalidateQueries(["admin-blog"]);
      queryClient.invalidateQueries(["admin-blog-single", id]);
      showCustomToast({
        title: "Success",
        message: "Blog created successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      if (err?.response?.status === 422) {
        const errors = err?.response?.data?.errors;
        const validationMessage = Object.values(errors).flat().join(" ");

        showCustomToast({
          title: "Validation Error",
          message: validationMessage,
          type: "error",
        });

        return;
      }
    },
  });
};

export const useUpdateAdminBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, data) => updateAdminBlogServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog"]);
    },
  });
};

export const useAdminBlogDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminBlogServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries("admin-Blog");
      showCustomToast({
        title: "Deleted",
        message: "Blog deleted successfully",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message: err.response?.data?.message || "Failed to delete Blog",
        type: "error",
      });
    },
  });
};
