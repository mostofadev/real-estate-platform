import { showCustomToast } from "@/lib/showCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postContactMessageServices } from "../Services/ContactMessageServices";
export const usePostContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
       postContactMessageServices(data); 
    },
    onSuccess: (res) => {
      const id = res?.data?.id;
      queryClient.invalidateQueries(["message"]);
      showCustomToast({
        title: "Success",
        message: "Message created successfully!",
        type: "success",
      });
    },
    onError: (err) => {
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
    },
  });
};
