"use client";
import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import { useAdminFeatureSingle, useAdminFeaturesUpdate } from "@/app/hooks/useAdminFeature";
import PageLoading from "@/app/components/ui/loader/PageLoading";

export const AdminFeatureCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Feature name must be at least 2 characters long")
    .max(50, "Feature name cannot exceed 50 characters"),
});

function FeatureUpdateForm({ id}) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useAdminFeatureSingle(id);
  const { mutate, isPending, error: updateError } = useAdminFeaturesUpdate(id);
  console.log('single feature', data);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(AdminFeatureCreateSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
    }
  }, [data, setValue]);

  const isSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Success:", res);
        showCustomToast({
          title: "Feature Updated",
          message: "Feature updated successfully!",
          type: "success",
        });
        reset();
        router.push("/admin/feature");
      },
      onError: (err) => {
        showCustomToast({
          title: "Creation Failed",
          message: err.response?.data?.message || "Failed to create feature.",
          type: "error",
        });
      },
    });
  };
  if(isLoading) {
     return <PageLoading />
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(isSubmit)}>
        <div className="">
          <TextInput
            id={"name"}
            label={"Feature Name"}
            {...register("name")}
            placeholder="Feature Name"
            error={errors.name?.message}
          />
        </div>
        <div className="">
          <FormButton IsValid={isValid} loading={isPending}>
            Submit
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

export default FeatureUpdateForm;
