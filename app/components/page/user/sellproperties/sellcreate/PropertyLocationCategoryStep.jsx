"use client";
import SelectInput from "@/app/components/ui/formAction/SeleteInput";
import TextInput from "@/app/components/ui/formAction/TextInput";
import {
  useAdminPropertyData,
  useAdminPorpertyDataDivisions,
  useAdminPropertyDataDistricts,
  useAdminPropertyDataUpazilas,
} from "@/app/hooks/useAdminPropertyData";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

export default function PropertyLocationCategoryStep({
  register,
  setValue,
  errors,
  watch,
  getValues,
  control,
}) {
  const selectedDivision = watch("division_id");
  const selectedDistrict = watch("district_id");

  const { data: baseData } = useAdminPropertyData();
  const { data: divisionsData } = useAdminPorpertyDataDivisions();
  const { data: districtsData } = useAdminPropertyDataDistricts(selectedDivision);
  const { data: subDistrictsData } = useAdminPropertyDataUpazilas(selectedDistrict);

  const countries =
    baseData?.countries?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const categories =
    baseData?.categories?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const propertyTypes =
    baseData?.propertyTypes?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const divisions =
    divisionsData?.divisions?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const districts =
    districtsData?.districts?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const subDistricts =
    subDistrictsData?.upazilas?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  // Reset dependent selects
  useEffect(() => {
    if (getValues) {
      const currentDistrict = getValues("district_id");
      if (
        currentDistrict &&
        districtsData &&
        !districtsData?.districts?.find((d) => String(d.id) === currentDistrict)
      ) {
        setValue("district_id", "");
        setValue("sub_district_id", "");
      }
    } else {
      setValue("district_id", "");
      setValue("sub_district_id", "");
    }
  }, [selectedDivision, districtsData]);

  useEffect(() => {
    if (getValues) {
      const currentSubDistrict = getValues("sub_district_id");
      if (
        currentSubDistrict &&
        subDistrictsData &&
        !subDistrictsData?.upazilas?.find(
          (u) => String(u.id) === currentSubDistrict
        )
      ) {
        setValue("sub_district_id", "");
      }
    } else {
      setValue("sub_district_id", "");
    }
  }, [selectedDistrict, subDistrictsData]);

  return (
    <div>
      {/* Country & Division */}
      <div className="flex gap-3 my-3 w-full block">
        <Controller
          name="country_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label="Country"
              options={countries}
              {...field}
              error={
                errors.country_id?.message ||
                (Array.isArray(errors.country_id) ? errors.country_id[0] : "")
              }
            />
          )}
        />

        <Controller
          name="division_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label="Division"
              options={divisions}
              {...field}
              error={
                errors.division_id?.message ||
                (Array.isArray(errors.division_id) ? errors.division_id[0] : "")
              }
            />
          )}
        />
      </div>

      {/* District & Subdistrict */}
      <div className="flex gap-3 my-3 w-full block">
        <Controller
          name="district_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label="District"
              options={districts}
              {...field}
              disabled={!selectedDivision}
              error={
                errors.district_id?.message ||
                (Array.isArray(errors.district_id) ? errors.district_id[0] : "")
              }
            />
          )}
        />

        <Controller
          name="sub_district_id"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Sub District"
              options={subDistricts}
              {...field}
              disabled={!selectedDistrict}
              error={
                errors.sub_district_id?.message ||
                (Array.isArray(errors.sub_district_id)
                  ? errors.sub_district_id[0]
                  : "")
              }
            />
          )}
        />
      </div>

      {/* Category & Property Type */}
      <div className="flex gap-3 my-3 w-full block">
        <Controller
          name="category_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label="Category"
              options={categories}
              {...field}
              error={
                errors.category_id?.message ||
                (Array.isArray(errors.category_id) ? errors.category_id[0] : "")
              }
            />
          )}
        />

        <Controller
          name="property_type_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label="Property Type"
              options={propertyTypes}
              {...field}
              error={
                errors.property_type_id?.message ||
                (Array.isArray(errors.property_type_id)
                  ? errors.property_type_id[0]
                  : "")
              }
            />
          )}
        />
      </div>

      {/* Full Location */}
      <TextInput
        label="Full Location"
        placeholder="Full address"
        {...register("full_location")}
        error={
          errors.full_location?.message ||
          (Array.isArray(errors.full_location) ? errors.full_location[0] : "")
        }
      />
    </div>
  );
}