"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertiesSchemas, fullSchema } from "@/app/Schema/PropertiesSchema";
import NextButton from "@/app/components/ui/formAction/NextButton";
import SubmitButton from "@/app/components/ui/formAction/SubmitButton";
import ProgressBar from "../create/ProgressBar";
import Form from "@/app/components/ui/formAction/Form";
import BackButton from "./BackButton";

// Dynamic step components
const PropertyBasicInfoStep = dynamic(() =>
  import("./PropertyBasicInfoStep").then((mod) => mod.default)
);
const PropertyLocationCategoryStep = dynamic(() =>
  import("./PropertyLocationCategoryStep").then((mod) => mod.default)
);
const PropertyFeaturesMediaStep = dynamic(() =>
  import("./PropertyFeaturesMediaStep").then((mod) => mod.default)
);
const LeafletMapInput = dynamic(() =>
  import("./GoogleMap").then((mod) => mod.default)
);

export default function SellPropertiesForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    PropertyBasicInfoStep,
    PropertyLocationCategoryStep,
    LeafletMapInput,
    PropertyFeaturesMediaStep,
  ];
  const StepComponent = steps[currentStep];

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
  });

  const nextStep = async () => {
    const valid = await trigger(
      Object.keys(PropertiesSchemas[currentStep].shape)
    );
    if (valid && currentStep < steps.length - 1)
      setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log("Final form submit:", data);
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
          errors={errors}
          getValues={getValues}
          watch={watch}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && <BackButton onClick={prevStep} />}
          {currentStep < steps.length - 1 ? (
            <NextButton onClick={nextStep} />
          ) : (
            <SubmitButton />
          )}
        </div>
      </Form>
    </div>
  );
}
