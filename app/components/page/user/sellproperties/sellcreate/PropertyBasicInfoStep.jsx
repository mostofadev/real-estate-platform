"use client";
import TextArea from "@/app/components/ui/formAction/TextAreaInput";
import TextInput from "@/app/components/ui/formAction/TextInput";
import React, { useEffect } from "react";

export default function PropertyBasicInfoStep({ register, errors, watch ,setValue}) {
  const title = watch("title") || "";

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") 
        .replace(/\s+/g, "-");
      setValue("slug", slug);
    } else {
      setValue("slug", "");
    }
  }, [title, setValue]);
  return (
    <div>
      <div className="flex gap-3 my-3 w-full block">
        <TextInput
          id="title"
          label="Title"
          placeholder="Enter property title"
          {...register("title")}
          error={
            errors.title?.message ||
            (Array.isArray(errors.title) ? errors.title[0] : "")
          }
        />

        <TextInput
          id="slug"
          label="Slug"
          placeholder="Enter property slug"
          {...register("slug")}
          error={
            errors.slug?.message ||
            (Array.isArray(errors.slug) ? errors.slug[0] : "")
          }
        />
      </div>
      <div className="flex gap-3 my-3 w-full block">
        <TextInput
          id="price"
          label="Price"
          type="number"
          placeholder="Enter price"
          {...register("price", { valueAsNumber: true })}
          error={
            errors.price?.message ||
            (Array.isArray(errors.price) ? errors.price[0] : "")
          }
        />
        <TextInput
          label="Years Built"
          placeholder="Year built"
          type="number"
          {...register("years_build", { valueAsNumber: true })}
          error={
            errors.years_build?.message ||
            (Array.isArray(errors.years_build) ? errors.years_build[0] : "")
          }
        />
      </div>
      <div className="flex gap-3 my-3 w-full block">
        <TextInput
          label="Bedrooms"
          placeholder="Number of bedrooms"
          type="number"
          {...register("bedrooms", { valueAsNumber: true })}
          error={
            errors.bedrooms?.message ||
            (Array.isArray(errors.bedrooms) ? errors.bedrooms[0] : "")
          }
        />

        <TextInput
          label="Bathrooms"
          placeholder="Number of bathrooms"
          type="number"
          {...register("bathrooms", { valueAsNumber: true })}
          error={
            errors.bathrooms?.message ||
            (Array.isArray(errors.bathrooms) ? errors.bathrooms[0] : "")
          }
        />
      </div>
      <div className="flex gap-3 my-3 w-full block">
        <TextInput
          label="Area (sqft)"
          placeholder="Area in sqft"
          type="number"
          {...register("area_sqft", { valueAsNumber: true })}
          error={
            errors.area_sqft?.message ||
            (Array.isArray(errors.area_sqft) ? errors.area_sqft[0] : "")
          }
        />

        <TextInput
          label="Land Area"
          placeholder="Land area"
          type="number"
          {...register("land_area", { valueAsNumber: true })}
          error={
            errors.land_area?.message ||
            (Array.isArray(errors.land_area) ? errors.land_area[0] : "")
          }
        />
      </div>
      <div className="flex gap-3 my-3 w-full block">
        <TextInput
          label="Garages"
          type="number"
          placeholder="Number of garages"
          {...register("garages", { valueAsNumber: true })}
          error={
            errors.garages?.message ||
            (Array.isArray(errors.garages) ? errors.garages[0] : "")
          }
        />

        <TextInput
          label="Garage Size"
          placeholder="Garage size"
          type="number"
          {...register("garage_size", { valueAsNumber: true })}
          error={
            errors.garage_size?.message ||
            (Array.isArray(errors.garage_size) ? errors.garage_size[0] : "")
          }
        />
      </div>

      <TextArea
        label="Property Description"
        placeholder="Write property details..."
        rows={5}
        {...register("description")}
        error={
          errors.description?.message ||
          (Array.isArray(errors.description) ? errors.description[0] : "")
        }
      />
    </div>
  );
}
