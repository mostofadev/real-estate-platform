import { useQuery } from "@tanstack/react-query";
import { getPropertyQuery } from "../Services/PropertyQueryServices";

export const usePropertyQuery = () => {
  return useQuery({
    queryKey: ["get-query"],
    queryFn: async () => {
      try {
        const data = await getPropertyQuery();
        console.log('getPropertyQuery',data);
        
        return data;
      } catch (error) {
        console.error("Error fetching property query:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    onError: (err) => {
      console.error("Query failed:", err);
    },
  });
};
