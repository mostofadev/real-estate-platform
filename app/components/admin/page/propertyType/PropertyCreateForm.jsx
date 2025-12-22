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
import { useAdminPropertyPost } from "@/app/hooks/useAdminPropertyType";

export const AdminPropertyCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Property name must be at least 2 characters long")
    .max(50, "Property name cannot exceed 50 characters"),
});

function PropertyCreateForm() {
  const router = useRouter();

  const { mutate, isPending } = useAdminPropertyPost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(AdminPropertyCreateSchema),
    mode: "onChange",
  });
  const isSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Success:", res);
        showCustomToast({
          title: "Property Created",
          message: "Property added successfully!",
          type: "success",
        });
        reset();
        router.push("/admin/property-type");
      },
      onError: (err) => {
        showCustomToast({
          title: "Creation Failed",
          message: err.response?.data?.message || "Failed to create property.",
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
            label={"Property Name"}
            {...register("name")}
            placeholder="Property Name"
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

export default PropertyCreateForm;
