import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminPropertyData,
  getAdminPropertyDataDistricts,
  getAdminPropertyDataDivisions,
  getAdminPropertyDataFeatures,
  getAdminPropertyDataSubDistricts,
} from "../Services/AdminPropertyDataServices";

export const useAdminPropertyData = () => {
  const query = useQuery({
    queryKey: ["admin-property-data"],
    queryFn: () => getAdminPropertyData(),
  });
  return { ...query };
};

export const useAdminPorpertyDataFeatures = () => {
  const query = useQuery({
    queryKey: ["admin-property-data-features"],
    queryFn: () => getAdminPropertyDataFeatures(),
  });
  return { ...query };
};

export const useAdminPorpertyDataDivisions = () => {
  const query = useQuery({
    queryKey: ["admin-property-data-divisions"],
    queryFn: () => getAdminPropertyDataDivisions(),
  });
  return { ...query };
};

export const useAdminPropertyDataDistricts = (division_id) => {
  const query = useQuery({
    queryKey: ["admin-property-data-districts", division_id],
    queryFn: () => getAdminPropertyDataDistricts(division_id),
  });
  return { ...query };
};

export const useAdminPropertyDataUpazilas = (district_id) => {
  const query = useQuery({
    queryKey: ["admin-property-data-upazilas", district_id],
    queryFn: () => getAdminPropertyDataSubDistricts(district_id),
  });
  return { ...query };
};
