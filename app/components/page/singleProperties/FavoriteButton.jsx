"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { usePostUserWishlist } from "@/app/hooks/useUserWishlist";
import { showCustomToast } from "@/lib/showCustomToast";

export default function FavoriteButton({ property_id, isLiked = false }) {
  const [liked, setLiked] = useState(isLiked);
  const { mutate } = usePostUserWishlist();
  const router = useRouter();
  
  const userToken = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;
  
  const toggleFavorite = () => {
    // Jodi token na thake, login page e redirect
    if (!userToken) {
      showCustomToast({
        title: "Login Required",
        message: "Please login to add properties to your wishlist",
        type: "error",
      });
      
      // Login page e redirect with return URL
      router.push(`/login?redirect=/property/${property_id}`);
      return;
    }

    // Optimistic UI update
    setLiked(!liked);

    mutate(property_id, {
      onSuccess: (res) => {
        showCustomToast({
          title: "Success",
          message: res?.message || "Wishlist updated successfully!",
          type: "success",
        });
      },
      onError: (err) => {
        // Rollback on error
        setLiked(liked);
        showCustomToast({
          title: "Error",
          message: err?.response?.data?.message || "Failed to update wishlist",
          type: "error",
        });
      },
    });
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
        liked
          ? "bg-red-100 text-red-500 shadow-md hover:shadow-lg"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:shadow-md"
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