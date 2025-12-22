"use client";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  useDeleteUserWishlist,
  usePostUserWishlist,
} from "@/app/hooks/useUserWishlist";

import toast from "react-hot-toast";
import { showCustomToast } from "@/lib/showCustomToast";

export default function FavoriteButton({ property_id, isLiked = false }) {
  console.log("wishlist id", property_id);

  const [liked, setLiked] = useState(isLiked);
  const { mutate, error } = usePostUserWishlist();
  console.log(error);

  const toggleFavorite = () => {
    //if (!property_id) return;

    setLiked(!liked);

    mutate(
      property_id,
      {
        onSuccess: (res) => {
          showCustomToast({
            title: "Success",
            message: res?.message || "Wishlist added successfully!",
            type: "success",
          });
        },
        onError: (err) => {
          setLiked(isLiked); // rollback UI state
          showCustomToast({
            title: "Error",
            message: err?.response?.data?.message || "Failed to add wishlist",
            type: "error",
          });
        },
      }
    );
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
        liked
          ? "bg-red-100 text-red-500 shadow-md"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
      title={liked ? "Remove from Favorites" : "Add to Favorites"}
    >
      {liked ? (
        <AiFillHeart className="text-2xl" />
      ) : (
        <AiOutlineHeart className="text-2xl" />
      )}
    </button>
  );
}
