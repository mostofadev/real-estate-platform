"use client";
import Checkbox from "@/app/components/ui/formAction/Checkbox";
import FileInput from "@/app/components/ui/formAction/FileInput";
import TextInput from "@/app/components/ui/formAction/TextInput";
import React, { useEffect } from "react";
import PropertyFeaturesSelector from "./PropertyFeaturesSelector";

export default function PropertyFeaturesMediaStep({
  register,
  setValue,
  errors,
  watch,
  getValues,
  control,
  existingImages, // ✅ Add this prop for existing images
}) {
  const isFeatured = watch("is_featured", false);

  // Initialize default values
  useEffect(() => {
    if (typeof isFeatured === "undefined") {
      setValue("is_featured", false);
    }
   
    if (!getValues("features")) {
      setValue("features", []);
    }
  }, []);

  const handleFeaturedChange = (e) => {
    setValue("is_featured", e.target.checked, { shouldValidate: true });
  };

  

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <FileInput
        label="Main Image"
        image_url={existingImages?.main || ""} // ✅ Pass existing main image
        onChange={(files) => {
          setValue("image_url", files, { shouldValidate: true });
        }}
        error={
          errors.image_url?.message ||
          (Array.isArray(errors.image_url) ? errors.image_url[0] : "")
        }
      />

      {/* Video URL */}
      <TextInput
        label="Video URL (Optional)"
        placeholder="https://youtube.com/..."
        {...register("video_url")}
        error={
          errors.video_url?.message ||
          (Array.isArray(errors.video_url) ? errors.video_url[0] : "")
        }
      />

      {/* Image Gallery */}
      <FileInput
        label="Image Gallery (Multiple Images)"
        multiple
        gallery_images={existingImages?.gallery || []} // ✅ Pass existing gallery images
        onChange={(files) =>
          setValue("image_gallery", files, { shouldValidate: true })
        }
        error={
          errors.image_gallery?.message ||
          (Array.isArray(errors.image_gallery) ? errors.image_gallery[0] : "")
        }
      />

      {/* Property Features Selector */}
      <PropertyFeaturesSelector control={control} errors={errors} />

      {/* Featured Property Checkbox */}
      <Checkbox
        id="is_featured"
        label="Featured Property"
        checked={isFeatured}
        onChange={handleFeaturedChange}
        error={
          errors.is_featured?.message ||
          (Array.isArray(errors.is_featured) ? errors.is_featured[0] : "")
        }
      />

      {/* Active Status Checkbox
      <Checkbox
        id="status"
        label="Active Status"
        checked={status}
        onChange={handleStatusChange}
        error={
          errors.status?.message ||
          (Array.isArray(errors.status) ? errors.status[0] : "")
        }
      /> */}
    </div>
  );
}
