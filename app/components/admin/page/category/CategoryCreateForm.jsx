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

export const AdminCategoryCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters long")
    .max(50, "Category name cannot exceed 50 characters"),
});

function CategoryCreateForm() {
  const router = useRouter();

  const { mutate, isPending } = useAdminCategoryPost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(AdminCategoryCreateSchema),
    mode: "onChange",
  });
  const isSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Success:", res);
        showCustomToast({
          title: "Category Created",
          message: "Category added successfully!",
          type: "success",
        });
        reset();
        router.push("/admin/category");
      },
      onError: (err) => {
        showCustomToast({
          title: "Creation Failed",
          message: err.response?.data?.message || "Failed to create category.",
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
            label={"Category Name"}
            {...register("name")}
            placeholder="Category Name"
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

export default CategoryCreateForm;
