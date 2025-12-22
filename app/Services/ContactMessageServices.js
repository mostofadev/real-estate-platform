import UserInstance from "@/lib/userAxios"

export const postContactMessageServices =async (data)=> {
    const response =await UserInstance.post('/message',data);
    console.log('message services',response);
    
    return response;
}