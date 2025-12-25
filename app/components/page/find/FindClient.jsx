"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import SelectInput from "@/app/components/ui/formAction/SeleteInput";
import MarginSection from "@/app/components/sections/MarginSection";
// import LeafletMapInput from "@/app/components/page/find/LeafletMapInput";

import { usePropertyQuery } from "@/app/hooks/usePropertyQuery";
import {
  useAdminPorpertyDataDivisions,
  useAdminPropertyData,
  useAdminPropertyDataDistricts,
  useAdminPropertyDataUpazilas,
} from "@/app/hooks/useAdminPropertyData";
import dynamic from "next/dynamic";
import { useFilteredProperties } from "@/app/hooks/useFilteredProperties";
import PropertieCard from "@/app/components/ui/card/PropertieCard";
import FormButton from "@/app/components/ui/button/SubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoading from "@/app/components/ui/loader/PageLoading";

const LeafletMapInput = dynamic(
  () => import("@/app/components/page/find/LeafletMapInput"),
  { ssr: false }
);
export default function FindClient() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();
  // property types + categories
  const { data: responseData } = usePropertyQuery();
  const types = responseData?.types ?? [];
  const categories = responseData?.categories ?? [];

  // React Hook Form
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      location: "",
      division_id: "",
      district_id: "",
      sub_district_id: "",
      property_type_id: "",
      category_id: "",
      price_min: "",
      price_max: "",
      bedrooms: "",
      bathrooms: "",
      lat: "",
      lng: "",
    },
  });
  const searchParams = useSearchParams();

  const initialQuery = searchParams.toString();
  const [queryString, setQueryString] = useState(initialQuery);
  const { data, isLoading, isError } = useFilteredProperties(queryString);

  // watch dropdown values
  const selectedDivision = watch("division_id");
  const selectedDistrict = watch("district_id");

  const { data: baseData } = useAdminPropertyData();
  const { data: divisionsData } = useAdminPorpertyDataDivisions();
  const { data: districtsData } =
    useAdminPropertyDataDistricts(selectedDivision);
  const { data: subDistrictsData } =
    useAdminPropertyDataUpazilas(selectedDistrict);
  const divisions =
    divisionsData?.divisions?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const districts =
    districtsData?.districts?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const subDistricts =
    subDistrictsData?.upazilas?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  // Reset dependent selects
  useEffect(() => {
    setValue("district_id", "");
    setValue("sub_district_id", "");
  }, [selectedDivision, setValue]);

  useEffect(() => {
    setValue("sub_district_id", "");
  }, [selectedDistrict, setValue]);

  // Map lat/lng update
  const handleMapSelect = (lat, lng) => {
    setValue("lat", lat);
    setValue("lng", lng);
  };

  // Submit Handler
  const onSubmit = (formData) => {
    const query = new URLSearchParams();

    if (formData.location) query.append("location", formData.location);
    if (formData.division_id) query.append("division_id", formData.division_id);
    if (formData.district_id) query.append("district_id", formData.district_id);
    if (formData.sub_district_id)
      query.append("sub_district_id", formData.sub_district_id);

    if (formData.property_type_id)
      query.append("property_type_id", formData.property_type_id);

    if (formData.category_id) query.append("category_id", formData.category_id);

    if (formData.price_min) query.append("price_min", formData.price_min);
    if (formData.price_max) query.append("price_max", formData.price_max);

    if (formData.bedrooms) query.append("bedrooms", formData.bedrooms);
    if (formData.bathrooms) query.append("bathrooms", formData.bathrooms);

    if (formData.lat) query.append("lat", formData.lat);
    if (formData.lng) query.append("lng", formData.lng);

    const finalQueryString = query.toString();
    router.push(`/find?${finalQueryString}`);
    setQueryString(finalQueryString);
  };

  return (
    <MarginSection>
      <div className="grid grid-cols-12 gap-4 my-12">
        {/* LEFT SIDE MAP */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-white h-full rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Property Map
            </h2>

            <LeafletMapInput
              register={{
                latitude: { value: watch("lat") },
                longitude: { value: watch("lng") },
              }}
              setValue={(name, value) => {
                if (name === "latitude") handleMapSelect(value, watch("lng"));
                if (name === "longitude") handleMapSelect(watch("lat"), value);
              }}
              errors={{}}
            />

            <div className="mt-3 text-gray-600 text-sm">
              <p>Latitude: {watch("lat")}</p>
              <p>Longitude: {watch("lng")}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FILTERS */}
        <div className="col-span-12 md:col-span-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white p-5 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              {/* Hidden LAT/LNG */}
              <input type="hidden" {...register("lat")} />
              <input type="hidden" {...register("lng")} />

              <TextInput
                {...register("location")}
                name="location"
                placeholder="Location"
              />

              {/* Division → District */}
              <div className="flex gap-4">
                {/* Division */}
                <Controller
                  control={control}
                  name="division_id"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label="Division"
                      {...register("division_id")}
                      options={divisions}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("district_id", "");
                        setValue("sub_district_id", "");
                      }}
                    />
                  )}
                />

                {/* District */}
                <Controller
                  control={control}
                  name="district_id"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label="District"
                      options={districts}
                      {...register("district_id")}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("sub_district_id", "");
                      }}
                    />
                  )}
                />
              </div>

             

              {/* Property Type + Category */}
              <div className="flex gap-4 mb-4">
                <Controller
                  control={control}
                  name="property_type_id"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label="Property Type"
                      options={types.map((t) => ({
                        value: t.id,
                        label: t.name,
                      }))}
                      {...register("property_type_id")}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label="Category"
                      {...register("category_id")}
                      options={categories.map((c) => ({
                        value: c.id,
                        label: c.name,
                      }))}
                    />
                  )}
                />
              </div>

              {/* Price Range */}
              <div className="flex gap-4">
                <TextInput
                  type="number"
                  {...register("price_min")}
                  placeholder="Min Price"
                />
                <TextInput
                  type="number"
                  {...register("price_max")}
                  placeholder="Max Price"
                />
              </div>

              {/* Bedrooms + Bathrooms */}
              <div className="flex gap-4">
                <TextInput
                  type="number"
                  {...register("bedrooms")}
                  placeholder="Bedrooms"
                />
                <TextInput
                  type="number"
                  {...register("bathrooms")}
                  placeholder="Bathrooms"
                />
              </div>
              <FormButton type="submit" className="w-full" IsValid={true}>
                Filter
              </FormButton>
            </div>
          </form>

          {/* PROPERTY LIST */}
          <div className="bg-white p-4 rounded shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>

            {isLoading && <PageLoading />}
            {isError && <p className="text-red-500">Something went wrong</p>}

            {!isLoading && data?.data?.length === 0 && (
              <p className="text-gray-500">No properties found</p>
            )}

            {/* Scrollable container with max height */}
            <div className="max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                {!isLoading &&
                  data?.data?.map((item) => (
                    <PropertieCard key={item.id} properties={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarginSection>
  );
}
