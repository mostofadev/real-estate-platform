import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { deleteAdminPropertyTypeServices, getAdminPropertyTypeServices, postAdminPropertyTypeServices, singleAdminPropertyTypeServices, updateAdminPropertyTypeServices } from "../Services/AdminPropertyTypeServices";


export const useAdminProperty = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["admin-property", page],
    queryFn: () => getAdminPropertyTypeServices(page),
    keepPreviousData: true,
  });

  return { ...query, page, setPage };
};

export const useAdminPropertySingle = (id) => {
  const res = useQuery({
    queryKey: ["admin-property-single", id],
    queryFn: ({ queryKey }) => {
      const [, categoryId] = queryKey;
      return singleAdminPropertyTypeServices(categoryId);
    },
    enabled: !!id,
  });
  return res;
};

export const useAdminPropertyPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, data) => postAdminPropertyTypeServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-property"]);
    },
  });
};

export const useAdminPropertyUpdate = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateAdminPropertyTypeServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-property"]);
      queryClient.invalidateQueries(["admin-property-single", id]);
    },
  });
};

export const useAdminPropertyDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminPropertyTypeServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries("admin-property");
      showCustomToast({
        title: "Deleted",
        message: "Property deleted successfully",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message: err.response?.data?.message || "Failed to delete property",
        type: "error",
      });
    },
  });
};
