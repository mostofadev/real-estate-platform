import UserInstance from "@/lib/userAxios"

export const getUserWishlistServices =async(page= 1) => {
    const response = await UserInstance.get(`/user/wishlist/?page=${page}`);
    return response.data.data;
}


export const postUserWishlistServices = async (data) => {
    console.log('services wishlist data', data);
    
    const response = await UserInstance.post('/user/wishlist', { property_id: data });
    console.log('services wishlist',response);
    
    return response.data;
}


export const deleteUserWishlistServices = async (id) => {
     console.log('wishlist delete services id',id);
    const response = await UserInstance.delete(`/user/wishlist/${id}`);
    console.log('wishlist delete services',response);
    
    return response.data;
} 