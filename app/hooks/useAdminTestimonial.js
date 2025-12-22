import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { deleteAdminTestimonialServices, getAdminTestimonialServices, postAdminTestimonialServices, singleAdminTestimonialServices, updateAdminTestimonialServices } from "../Services/AdminTestimonialServices";

export const useGetAdminTestimonial = () => {
  const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-testimonial", page],
    queryFn: () => getAdminTestimonialServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};

export const useSingleAdminTestimonial = (id) => {
  return useQuery({
    queryKey: ["admin-testimonial-single", id],
    queryFn: () => singleAdminTestimonialServices(id),
    enabled: !!id,
  });
};

export const usePostAdminTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      postAdminTestimonialServices(data);
    },
    onSuccess: (res) => {
      const id = res?.data?.id;
      queryClient.invalidateQueries(["admin-testimonial"]);
      queryClient.invalidateQueries(["admin-testimonial-single", id]);
      showCustomToast({
        title: "Success",
        message: "Testimonial created successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      if (err?.response?.status === 422) {
        const errors = err?.response?.data?.errors;
        const validationMessage = Object.values(errors).flat().join(" ");
        console.log("validationMessage", validationMessage);

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

export const useUpdateAdminTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, data) => updateAdminTestimonialServices(id, data),
      onSuccess: () => {
      queryClient.invalidateQueries(["admin-testimonial"]);
    },
  });
};

export const useAdminTestimonialDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminTestimonialServices(id),

    onSuccess: () => {
      queryClient.invalidateQueries("admin-testimonial");
      showCustomToast({
        title: "Deleted",
        message: "Testimonial deleted successfully",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message: err.response?.data?.message || "Failed to delete Testimonial",
        type: "error",
      });
    },
  });
};
