import UserInstance from "@/lib/userAxios"

export const getPropertyQuery = () => {
    const response = UserInstance.get('/get-property-filters');
    console.log('services cate type',response);
    
    return response;
}