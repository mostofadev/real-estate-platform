import UserInstance from "@/lib/userAxios";

export const postSubscribe = (data) => {
  return UserInstance.post("/subscribe", data);
};
