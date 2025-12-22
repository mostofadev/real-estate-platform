"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePropertyBookingServices,
  getPropertyBookingServices,
  postPropertyBookingServices,
} from "../Services/PropertyBookingServices";
import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

export const usePropertyBookingGet = () => {
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ["property-booking",page],
    queryFn: () => getPropertyBookingServices(page),
    keepPreviousData: true,
  });
  return { ...query, page, setPage };
};


export const usePropertyBookingPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postPropertyBookingServices(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["property-booking"]);
      showCustomToast({
        title: "Added",
        message: "Property booking added successfully",
        type: "success",
      });
    },
  });
};


// export const usePropertyBookingPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data) => postPropertyBookingServices(data),

//     onSuccess: (data) => {
//       queryClient.invalidateQueries(["property-booking"]);
//       showCustomToast({
//         title: "Added",
//         message: "Property booking added successfully",
//         type: "success",
//       });
//     },

//     onError: (error) => {
//       console.log("jjjjjjjjjj", error);

//       if (error.response) {
//         showCustomToast({
//           title: "Error",
//           message: error.response?.data?.message || "Something went wrong!",
//           type: "error",
//         });
//       } else {
//         showCustomToast({
//           title: "Error",
//           message: "Failed to Add Property booking",
//           type: "error",
//         });
//       }
//     },
//   });
// };

export const usePropertyBookingDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePropertyBookingServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries("property-booking");
      showCustomToast({
        title: "Deleted",
        message: "Property booking deleted successfully",
        type: "success",
      });
    },
    onError: (err) => {
      showCustomToast({
        title: "Error",
        message:
          err.response?.data?.message || "Failed to delete Property booking",
        type: "error",
      });
    },
  });
};
