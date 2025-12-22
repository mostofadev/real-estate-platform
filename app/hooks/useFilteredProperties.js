"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilterServices } from "../Services/FilterServices";

export const useFilteredProperties = (queryString) => {
  return useQuery({
    queryKey: ["filtered-properties", queryString],
    queryFn: () => getFilterServices(queryString),
    enabled: !!queryString,
  });
};
