"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NextButton from "@/app/components/ui/formAction/NextButton";
import Form from "@/app/components/ui/formAction/Form";
import BackButton from "@/app/components/page/user/sellproperties/sellcreate/BackButton";
import ProgressBar from "@/app/components/page/user/sellproperties/create/ProgressBar";
import { useAdminPropertyUpdate, useAdminPropertySingle } from "@/app/hooks/useAdminProperty";
import CustomToast from "@/app/components/ui/toast/CustomToast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormButton from "@/app/components/ui/button/SubmitButton";
import { fullUpdateSchema, PropertiesUpdateSchemas } from "@/app/Schema/PropertiesUpdateSchema";

// Dynamic step components
const PropertyBasicInfoStep = dynamic(() =>
  import(
    "@/app/components/page/user/sellproperties/sellcreate/PropertyBasicInfoStep"
  ).then((mod) => mod.default)
);
const PropertyLocationCategoryStep = dynamic(() =>
  import(
    "@/app/components/page/user/sellproperties/sellcreate/PropertyLocationCategoryStep"
  ).then((mod) => mod.default)
);
const PropertyFeaturesMediaStep = dynamic(() =>
  import(
    "@/app/components/page/user/sellproperties/sellcreate/PropertyFeaturesMediaStep"
  ).then((mod) => mod.default)
);
const LeafletMapInput = dynamic(() =>
  import("@/app/components/page/user/sellproperties/sellcreate/GoogleMap").then(
    (mod) => mod.default
  )
);

export default function AdminPropertiesUpdateForm({ propertyId }) {
  const route = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { mutate, isPending } = useAdminPropertyUpdate(propertyId);
  const { data: propertyData, isLoading } = useAdminPropertySingle(propertyId);
  
  console.log('Single update property:', propertyData);
    
  const steps = [
    PropertyBasicInfoStep,
    PropertyLocationCategoryStep,
    PropertyFeaturesMediaStep,
    LeafletMapInput,
  ];
  
  const StepComponent = steps[currentStep];
  const [serverErrors, setServerErrors] = useState({});
  const [existingImages, setExistingImages] = useState({
    main: "",
    gallery: []
  });
  
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(fullUpdateSchema),
    mode: "onChange",
    defaultValues: {
      features: [],
      is_featured: false,
      status: false,
    }
  });

  // Load existing property data
  useEffect(() => {
    if (propertyData) {
      const property = propertyData;
      
      console.log('Property data for reset:', {
        country_id: property.country_id,
        division_id: property.division_id,
        district_id: property.district_id,
        sub_district_id: property.sub_district_id,
        category_id: property.category_id,
        property_type_id: property.property_type_id,
        features: property.features,
        image_url: property.image_url,
        images: property.images,
      });

      // Set existing images
      setExistingImages({
        main: property.image_url || "",
        gallery: property.images || [] // Array of gallery images
      });
      
      // Reset form with existing data - Convert IDs to strings
      reset({
        title: property.title || "",
        slug: property.slug || "",
        description: property.description || "",
        price: Number(property.price) || 0,
        years_build: property.years_build ? Number(property.years_build) : null,
        bedrooms: property.bedrooms ? Number(property.bedrooms) : 0,
        bathrooms: property.bathrooms ? Number(property.bathrooms) : 0,
        area_sqft: property.area_sqft ? Number(property.area_sqft) : 0,
        land_area: property.land_area ? Number(property.land_area) : 0,
        garages: property.garages ? Number(property.garages) : 0,
        garage_size: property.garage_size ? Number(property.garage_size) : 0,
        
        // Convert IDs to strings for select inputs
        country_id: property.country_id ? String(property.country_id) : "",
        division_id: property.division_id ? String(property.division_id) : "",
        district_id: property.district_id ? String(property.district_id) : "",
        sub_district_id: property.sub_district_id ? String(property.sub_district_id) : "",
        category_id: property.category_id ? String(property.category_id) : "",
        property_type_id: property.property_type_id ? String(property.property_type_id) : "",
        
        full_location: property.full_location || "",
        video_url: property.video_url || "",
        google_map: property.google_map || "",
        
        is_featured: Boolean(property.is_featured),
        status: property.status === "approved",
        
        latitude: property.location?.latitude ? Number(property.location.latitude) : 23.8103,
        longitude: property.location?.longitude ? Number(property.location.longitude) : 90.4125,
        
        // Extract feature IDs
        features: property.features?.map(f => Number(f.feature_id || f.id)) || [],
      });

      // Set values individually to ensure they're registered
      setTimeout(() => {
        setValue("country_id", property.country_id ? String(property.country_id) : "");
        setValue("division_id", property.division_id ? String(property.division_id) : "");
        setValue("district_id", property.district_id ? String(property.district_id) : "");
        setValue("sub_district_id", property.sub_district_id ? String(property.sub_district_id) : "");
        setValue("category_id", property.category_id ? String(property.category_id) : "");
        setValue("property_type_id", property.property_type_id ? String(property.property_type_id) : "");
        setValue("features", property.features?.map(f => Number(f.feature_id || f.id)) || []);
      }, 100);
    }
  }, [propertyData, reset, setValue]);

  const nextStep = async () => {
    const valid = await trigger(
      Object.keys(PropertiesUpdateSchemas[currentStep].shape)
    );
    
    console.log(`Step ${currentStep} validation:`, valid);
    console.log(`Step ${currentStep} values:`, getValues());
    console.log(`Step ${currentStep} errors:`, errors);
    
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    console.log("=== UPDATE SUBMIT DATA ===");
    console.log("Full Form Data:", data);
    console.log("Features:", data.features);

    const features = data.features || getValues("features") || [];
    console.log("Features (manual check):", features);

    const formData = new FormData();

    // Add features
    if (features && features.length > 0) {
      features.forEach((id) => formData.append("features[]", id));
    }

    // Add other fields
    for (const key in data) {
      if (key === "features") {
        continue;
      } else if (key === "image_gallery" && Array.isArray(data[key]) && data[key].length > 0) {
        data[key].forEach((file) => formData.append("image_gallery[]", file));
      } else if (key === "image_url" && data[key] instanceof File) {
        formData.append("image_url", data.image_url);
      } else if (key === "is_featured") {
        formData.append(key, data[key] ? 1 : 0);
      } else if (key === "status") {
        formData.append(key, data[key] ? "approved" : "pending");
      } else if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        formData.append(key, data[key]);
      }
    }

    // Debug: Log FormData
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutate(formData, {
      onSuccess: (res) => {
        toast.custom((t) => (
          <CustomToast
            t={t}
            title="Success!"
            message="Property updated successfully."
            type="success"
          />
        ));
        route.push("/admin/property");
      },
      onError: (error) => {
        if (error.response?.status === 422) {
          const validationErrors = error.response.data.errors;
          console.log("Validation Errors:", validationErrors);
          setServerErrors(validationErrors);
        } else {
          toast.custom((t) => (
            <CustomToast
              t={t}
              title="Error!"
              message="Something went wrong. Please try again."
              type="error"
            />
          ));
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Property not found!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="my-4">
        <ProgressBar step={currentStep + 1} total={steps.length} />
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <StepComponent
          register={register}
          setValue={setValue}
          errors={{ ...errors, ...serverErrors }}
          getValues={getValues}
          watch={watch}
          control={control}
          existingImages={currentStep === 2 ? existingImages : undefined} // Only pass to step 3 (PropertyFeaturesMediaStep)
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && <BackButton onClick={prevStep} />}
          
          {currentStep < steps.length - 1 ? (
            <NextButton onClick={nextStep} />
          ) : (
            <FormButton IsValid={isValid} loading={isPending}>
              Update Property
            </FormButton>
          )}
        </div>
      </Form>
    </div>
  );
}