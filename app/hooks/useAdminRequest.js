import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  AdminGetAllRequestsServices,
  AdminGetSingleRequestServices,
  AdminUpdateStatusServices,
  AdminDeleteRequestServices,
  AdminGetRejectedRequestsServices,
  AdminGetApprovedRequestsServices
} from "../Services/AdminRequestServices";

export const useAdminRequestIndex = () => {
 const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-request", page],
    queryFn: () => AdminGetAllRequestsServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};

export const useAdminRequestApproved = () => {
 const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-request", page],
    queryFn: () => AdminGetApprovedRequestsServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};

export const useAdminRequestRejected = () => {
 const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-request", page],
    queryFn: () => AdminGetRejectedRequestsServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};


export const useAdminRequestShow = (id) => {
  return useQuery({
    queryKey: ["admin-request-single", id],
    queryFn: () => AdminGetSingleRequestServices(id),
    enabled: !!id,
  });
};

// Update request status
export const useAdminRequestUpdateStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }) => {
      return AdminUpdateStatusServices(id, status);
    },
    onSuccess: (res) => {
      const id = res?.data?.data?.id;
      
      // Invalidate all related queries
      queryClient.invalidateQueries(["admin-request"]);
      queryClient.invalidateQueries(["admin-property"]);
      queryClient.invalidateQueries(["admin-request-single", id]);
      
      showCustomToast({
        title: "Success",
        message: "Request Status Updated Successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      // Handle validation errors
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
      
      // Handle other errors
      showCustomToast({
        title: "Error",
        message: err?.response?.data?.message || "Failed to update status",
        type: "error",
      });
    },
  });
};

// Delete request
export const useAdminRequestDelete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => {
      return AdminDeleteRequestServices(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-request"]);
      
      showCustomToast({
        title: "Success",
        message: "Request Deleted Successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message: err?.response?.data?.message || "Failed to delete request",
        type: "error",
      });
    },
  });
};
