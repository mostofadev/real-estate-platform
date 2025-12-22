"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { fullSchema, PropertiesSchemas } from "@/app/Schema/PropertiesSchema";
import ProgressBar from "./ProgressBar";

// ✅ Next.js v15 compatible dynamic import
const Step1Basic = dynamic(() =>
  import("./Step1Basic").then((mod) => mod.default)
);
const Step2Details = dynamic(() =>
  import("./Step2Details").then((mod) => mod.default)
);
const Step3Video = dynamic(() =>
  import("./Step3Video").then((mod) => mod.default)
);
const Step4Map = dynamic(() => import("./Step4Map").then((mod) => mod.default));

export default function SellPropertiesForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [Step1Basic, Step2Details, Step3Video, Step4Map];
  const StepComponent = steps[currentStep];

 
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
  });

  const nextStep = async () => {
    const valid = await trigger(
      Object.keys(PropertiesSchemas[currentStep].shape)
    );
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateField = (name, value) => {
    setValue(name, value);
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    // TODO: merge with context or send to Laravel API
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl shadow-md">
      <h1 className="text-center font-bold text-xl mb-4">Create Product</h1>
      <ProgressBar step={currentStep + 1} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <StepComponent
          register={register}
          setValue={setValue}
          errors={errors}
          updateField={updateField}
          values={getValues()}
        />

        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
