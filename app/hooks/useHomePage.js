import { useQuery } from "@tanstack/react-query";
import {
  getBlogHomePage,
  getCityHomePage,
  getHomePageProperty,
  getRelatedHomePageProperty,
  getSinglePropertyDetails,
  getTestimonialHomePage,
} from "../Services/HomePageServices";
import { use } from "react";

export const useHomePageProperty = () => {
  const res = useQuery({
    queryKey: ["HomeProperty"],
    queryFn: getHomePageProperty,
  });
  return res;
};

export const useSingleProperty = (id) => {
  const res = useQuery({
    queryKey: ["SingleProperty", id],
    queryFn: () => getSinglePropertyDetails(id),
  });
  return res;
};

export const useRelatedHomePageProperty = (id) => {
  return useQuery({
    queryKey: ["related-property", id],
    queryFn: () => getRelatedHomePageProperty(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useHomePageTestimonial = () => {
  const res = useQuery({
    queryKey: ["HomeTestimonial"],
    queryFn: getTestimonialHomePage,
  });
  return res;
};

export const useHomePageBlog = () => {
  const res = useQuery({
    queryKey: ["HomeBlog"],
    queryFn: getBlogHomePage,
  });
  return res;
};


export const useHomePageCity = () => {
  const res = useQuery({
    queryKey: ["HomeCity"],
    queryFn: getCityHomePage,
  });
  return res;
}