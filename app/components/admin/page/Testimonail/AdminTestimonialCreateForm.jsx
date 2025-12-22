"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";
import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import FileInput from "@/app/components/ui/formAction/FileInput";
import { usePostAdminTestimonial } from "@/app/hooks/useAdminTestimonial";
import TextArea from "@/app/components/ui/formAction/TextAreaInput";

export const AdminTestimonialCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters"),
  passion: z
    .string()
    .min(2, "Passion must be at least 2 characters long")
    .max(255, "Passion cannot exceed 255 characters"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters long")
    .max(1000, "Message cannot exceed 1000 characters"),
  rating: z
    .number({
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  image: z.any().optional(),
  status: z.enum(["0", "1"]).optional(),
});

function AdminTestimonialCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = usePostAdminTestimonial();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(AdminTestimonialCreateSchema),
    mode: "onChange",
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "image" && Array.isArray(data[key])) {
        formData.append("image", data[key][0]);
      } else if (key === "image" && data[key] instanceof File) {
        formData.append("image", data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }

    mutate(formData, {
      onSuccess: (res) => {
        reset();
        setPreview(null);
        router.push("/admin/testimonial");
      },
      onError: (error) => {
        if (error.response?.status === 422) {
          const validationErrors = error.response.data.errors;
          const validationMessage = Object.values(validationErrors)
            .flat()
            .join(" ");
          showCustomToast({
            title: "Validation Error",
            message: validationMessage,
            type: "error",
          });
        } else {
          showCustomToast({
            title: "Error",
            message: "Something went wrong. Please try again.",
            type: "error",
          });
        }
      },
    });
  };

  return (
    <div className="my-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="name"
          label="Name"
          {...register("name")}
          placeholder="Enter client name"
          error={errors.name?.message}
        />

        <TextInput
          id="passion"
          label="Passion"
          {...register("passion")}
          placeholder="Enter client's passion"
          error={errors.passion?.message}
        />

        <TextArea
          label="Testimonial Content"
          placeholder="Write Testimonial Content..."
          rows={5}
          {...register("message")}
          error={
            errors.message?.message ||
            (Array.isArray(errors.message) ? errors.message[0] : "")
          }
        />
        <TextInput
          id="rating"
          label="Rating (1-5)"
          type="number"
          {...register("rating", { valueAsNumber: true })}
          placeholder="Enter rating"
          error={errors.rating?.message}
        />

       
        <FileInput
          label=" Image"
          onChange={(files) => {
            setValue("image", files);
          }}
          error={
            errors.image?.message ||
            (Array.isArray(errors.image)
              ? errors.image[0]
              : "")
          }
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            {...register("status")}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="mt-6">
          <FormButton IsValid={isValid} loading={isPending}>
            Create
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

export default AdminTestimonialCreateForm;
