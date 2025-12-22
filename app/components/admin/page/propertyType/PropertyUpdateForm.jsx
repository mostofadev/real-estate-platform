"use client";
import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  useAdminCategoryPost,
  useAdminCategorySingle,
  useAdminCategoryUpdate,
} from "@/app/hooks/useAdminCategory";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import {
  useAdminPropertySingle,
  useAdminPropertyUpdate,
} from "@/app/hooks/useAdminPropertyType";
import PageLoading from "@/app/components/ui/loader/PageLoading";

export const AdminPropertyCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters long")
    .max(50, "Category name cannot exceed 50 characters"),
});

function PropertyUpdateForm({ id }) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useAdminPropertySingle(id);
  const { mutate, isPending, error: updateError } = useAdminPropertyUpdate(id);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(AdminPropertyCreateSchema),
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
          title: "Property Updated",
          message: "Property updated successfully!",
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
  if (isLoading) {
    return <PageLoading />;
  }
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

export default PropertyUpdateForm;
