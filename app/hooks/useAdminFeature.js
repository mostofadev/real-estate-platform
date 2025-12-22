import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { deleteAdminFeaturesServices, getAdminFeaturesServices, postAdminFeaturesServices, singleAdminFeaturesServices, updateAdminFeaturesServices } from "../Services/AdminFeatureServices";

export const useAdminFeatures = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["admin-features", page],
    queryFn: () => getAdminFeaturesServices(page),
    keepPreviousData: true,
  });

  return { ...query, page, setPage };
};

export const useAdminFeatureSingle = (id) => {
  const res = useQuery({
    queryKey: ["admin-category-single", id],
    queryFn: ({ queryKey }) => {
      const [, featureId] = queryKey;
      return singleAdminFeaturesServices(featureId);
    },
    enabled: !!id,
  });
  return res;
};

export const useAdminFeaturesPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, data) => postAdminFeaturesServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-features"]);
    },
  });
};

export const useAdminFeaturesUpdate = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateAdminFeaturesServices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-features"]);
      queryClient.invalidateQueries(["admin-features-single", id]);
    },
  });
};

export const useAdminFeaturesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminFeaturesServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries("admin-features");
      showCustomToast({
        title: "Deleted",
        message: "Feature deleted successfully",
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
