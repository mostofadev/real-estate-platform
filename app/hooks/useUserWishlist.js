import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserWishlistServices,
  getUserWishlistServices,
  postUserWishlistServices,
} from "../Services/UserWishlistServices";
import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

export const useGetUserWishlist = () => {
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ["user-wishlist", page],
    queryFn: () => getUserWishlistServices(page),
    keepPreviousData: true,
  });
  return { ...query, page, setPage };
};

export const usePostUserWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postUserWishlistServices(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-wishlist"]);
    },
  });
};
export const useDeleteUserWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUserWishlistServices(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
      
    },
    // onError: (err) => {
    //   showCustomToast({
    //     title: "Error",
    //     message: err.response?.data?.message || "Failed to delete Wishlist",
    //     type: "error",
    //   });
    // },
  });
};
