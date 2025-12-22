import UserInstance from "@/lib/userAxios";

export const getPropertyQuery = async () => {
  try {
    const res = await UserInstance.get("/get-property-filters");

    console.log("services cate type", res.data);
    return res.data; 
  } catch (error) {
   // console.error("Error fetching property query:", error.message);

    return {
      data: {
        types: [],
        categories: [],
      },
    };
  }
};
