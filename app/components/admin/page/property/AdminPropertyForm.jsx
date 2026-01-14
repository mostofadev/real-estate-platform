"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertiesSchemas, fullSchema } from "@/app/Schema/PropertiesSchema";
import NextButton from "@/app/components/ui/formAction/NextButton";
import Form from "@/app/components/ui/formAction/Form";
import BackButton from "@/app/components/page/user/sellproperties/sellcreate/BackButton";
import ProgressBar from "@/app/components/page/user/sellproperties/create/ProgressBar";
import { useAdminPropertyPost } from "@/app/hooks/useAdminProperty";
import CustomToast from "@/app/components/ui/toast/CustomToast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormButton from "@/app/components/ui/button/SubmitButton";

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

export default function AdminPropertiesForm() {
  const route = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { mutate, isPending } = useAdminPropertyPost();
  
  const steps = [
    PropertyBasicInfoStep,
    PropertyLocationCategoryStep,
    PropertyFeaturesMediaStep,
    LeafletMapInput,
  ];
  
  const StepComponent = steps[currentStep];
  const [serverErrors, setServerErrors] = useState({});
  
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    control, // ✅ Add control
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      features: [], // ✅ Initialize as empty array
      is_featured: false,
      status: false,
    }
  });

  const nextStep = async () => {
    const valid = await trigger(
      Object.keys(PropertiesSchemas[currentStep].shape)
    );
    
    // Debug: Check current step values
    console.log(`Step ${currentStep} values:`, getValues());
    
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    console.log("=== SUBMIT DATA ===");
    console.log("Full Form Data:", data);
    console.log("Features:", data.features);
    
    // ✅ Manually get features if not in data
    const features = data.features || getValues("features") || [];
    console.log("Features (manual check):", features);
    console.log("===================");

    const formData = new FormData();

    // ✅ First add features manually
    if (features && features.length > 0) {
      features.forEach((id) => formData.append("features[]", id));
    } else {
      console.warn("⚠️ No features selected!");
    }

    // Then add other fields
    for (const key in data) {
      if (key === "features") {
        // Already handled above
        continue;
      } else if (key === "image_gallery" && Array.isArray(data[key])) {
        data[key].forEach((file) => formData.append("image_gallery[]", file));
      } else if (key === "image_url") {
        formData.append("image_url", data.image_url);
      } else if (key === "is_featured" || key === "status") {
        formData.append(key, data[key] ? 1 : 0);
      } else if (data[key] !== undefined && data[key] !== null) {
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
            message="Property added successfully."
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
          control={control} // ✅ Pass control
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && <BackButton onClick={prevStep} />}
          
          {currentStep < steps.length - 1 ? (
            <NextButton onClick={nextStep} />
          ) : (
            <FormButton IsValid={isValid} loading={isPending}>
              Submit Property
            </FormButton>
          )}
        </div>
      </Form>
    </div>
  );
}