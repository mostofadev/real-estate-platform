import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminCategoryServices,
  getAdminCategoryServices,
  postAdminCategoryServices,
  singleAdminCategoryServices,
  updateAdminCategoryServices,
} from "../Services/AdminCategoryServices";
import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

export const useAdminCategory = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["admin-category", page],
    queryFn: () => getAdminCategoryServices(page),
    keepPreviousData: true,
  });

  return { ...query, page, setPage };
};

export const useAdminCategorySingle = (id) => {
  const res = useQuery({
    queryKey: ["admin-category-single", id],
    queryFn: ({ queryKey }) => {
      const [, categoryId] = queryKey;
      return singleAdminCategoryServices(categoryId);
    },
    enabled: !!id,
  });
  return res;
};

export const useAdminCategoryPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, data) => postAdminCategoryServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-category"]);
    },
  });
};

export const useAdminCategoryUpdate = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateAdminCategoryServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-category"]);
      queryClient.invalidateQueries(["admin-category-single", id]);
    },
  });
};

export const useAdminCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminCategoryServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries("admin-category");
      showCustomToast({
        title: "Deleted",
        message: "Category deleted successfully",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message: err.response?.data?.message || "Failed to delete category",
        type: "error",
      });
    },
  });
};
