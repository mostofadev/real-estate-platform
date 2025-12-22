import UserInstance from "@/lib/userAxios";

export const getUserProfile = async () => {
  const response = await UserInstance.get('/user/profile');
  return response.data.data;
}

export const updateUserProfile = async (data) => {
  
  const config = data instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  } : {};

  const response = await UserInstance.post('/user/profile/update', data, config);
  return response.data;
}

export const ChangeUserPassword = async (data) => {
  const response = await UserInstance.post('/user/password/change', data);
  return response;
}