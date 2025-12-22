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
import { usePostAdminBlog } from "@/app/hooks/useAdminBlog";

export const AdminPostCreateSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters long")
    .max(100, "Slug cannot exceed 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(5000, "Content cannot exceed 5000 characters"),
  featured_image: z.any().optional(),
});

function AdminPostCreateForm() {
  const router = useRouter();
  const { mutate, isPending, isError } = usePostAdminBlog();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(AdminPostCreateSchema),
    mode: "onChange",
  });

  const featuredImage = watch("featured_image");
  useEffect(() => {
    if (featuredImage && featuredImage[0]) {
      const file = featuredImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [featuredImage]);

  const onSubmit = async (data) => {
    console.log("submit data", data);

    const formData = new FormData();

    for (const key in data) {
      if (key === "featured_image" && Array.isArray(data[key])) {
        formData.append("featured_image", data[key][0]);
      } else if (key === "featured_image" && data[key] instanceof File) {
        formData.append("featured_image", data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }

    

    mutate(formData, {
      onSuccess: (res) => {
        showCustomToast({
          title: "Success",
          message: "Blog created successfully!",
          type: "success",
        });
        reset();
        setPreview(null);
        router.push("/admin/blog");
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
        {/* Title */}
        <TextInput
          id="title"
          label="Title"
          {...register("title")}
          placeholder="Enter post title"
          error={errors.title?.message}
        />

        {/* Slug */}
        <TextInput
          id="slug"
          label="Slug"
          {...register("slug")}
          placeholder="Enter unique slug (e.g. my-first-post)"
          error={errors.slug?.message}
        />

        {/* Content */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            {...register("content")}
            rows="6"
            placeholder="Write your post content here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <FileInput
          label="Featured Image"
          onChange={(files) => {
            setValue("featured_image", files);
          }}
          error={
            errors.featured_image?.message ||
            (Array.isArray(errors.featured_image)
              ? errors.featured_image[0]
              : "")
          }
        />

        {/* Submit */}
        <div className="mt-6">
          <FormButton IsValid={isValid} loading={isPending}>
            Create Post
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

export default AdminPostCreateForm;
