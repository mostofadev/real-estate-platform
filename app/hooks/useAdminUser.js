import { useQuery } from "@tanstack/react-query";
import { AdminGetAllUserServices } from "../Services/AdminUserServices";
import { useState } from "react";

export const useAdminUser = () => {
  const [page, setPage] = useState(1);
  const res = useQuery({
    queryKey: ["admin-user", page],
    queryFn: () => AdminGetAllUserServices(page),
    keepPreviousData: true,
  });
  return { ...res, page, setPage };
};
