import UserInstance from "@/lib/userAxios"

export const getFilterServices =async(queryString)=> {
    const response =await UserInstance.get(`/properties/filter?${queryString}`);
    return response.data;
} 