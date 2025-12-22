import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChangeUserPassword,
  getUserProfile,
  updateUserProfile,
} from "../Services/UserProfileServices";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useUserUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) =>{ 
     return updateUserProfile(data)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data.data);
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
};

export const useUserChangePassword = () => {
  return useMutation({
    mutationFn: (data) => ChangeUserPassword(data),
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });
}