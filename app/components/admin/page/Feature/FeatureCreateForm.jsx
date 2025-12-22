"use client";
import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { useAdminCategoryPost } from "@/app/hooks/useAdminCategory";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";
import { useAdminFeaturesPost } from "@/app/hooks/useAdminFeature";

export const AdminFeatureCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Feature name must be at least 2 characters long")
    .max(50, "Feature name cannot exceed 50 characters"),
});

function FeatureCreateForm() {
  const router = useRouter();

  const { mutate, isPending } = useAdminFeaturesPost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(AdminFeatureCreateSchema),
    mode: "onChange",
  });
  const isSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Success:", res);
        showCustomToast({
          title: "Feature Created",
          message: "Feature added successfully!",
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

export default FeatureCreateForm;
