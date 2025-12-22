"use client";
import { useMutation } from "@tanstack/react-query";
import { postSubscribe } from "../Services/SubscribeServices";
import { showCustomToast } from "@/lib/showCustomToast";

export default function useSubscribe() {
  return useMutation({
    mutationFn: (data) => postSubscribe(data),

    onSuccess: (res) => {
      showCustomToast({
        title: "Success",
        message: res?.data?.message || "Subscribed successfully!",
        type: "success",
      });
    },

    onError: (error) => {
      if (error?.response?.status === 409) {
        return showCustomToast({
          title: "Error",
          message: "You are already subscribed.",
          type: "error",
        });
      }
      showCustomToast({
        title: "Error",
        message:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    },
  });
}
