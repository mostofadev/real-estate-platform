"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter, useParams } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";
import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import FileInput from "@/app/components/ui/formAction/FileInput";
import { useSingleAdminBlog, useUpdateAdminBlog } from "@/app/hooks/useAdminBlog";

export const AdminPostUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(2, "Slug must be at least 2 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  featured_image: z.any().optional(),
});

function BlogUpdateForm({id}) {
  console.log('blog id ',id);
  
  const router = useRouter();
  const { mutate, isPending } = useUpdateAdminBlog();
  const { data, isLoading } = useSingleAdminBlog(id);
console.log('blog update data', data?.data?.data);

  const blog = data?.data?.data;
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(AdminPostUpdateSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
      });
      setPreview(blog.featured_image || null); 
    }
  }, [blog, reset]);

  const featuredImage = watch("featured_image");

  useEffect(() => {
    if (featuredImage && featuredImage[0]) {
      const file = featuredImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [featuredImage]);

  const onSubmit = async (data) => {
    console.log("Update submit data:", data);

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

   // formData.append("_method", "PUT");

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          showCustomToast({
            title: "Success",
            message: "Blog updated successfully!",
            type: "success",
          });
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
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="my-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="title"
          label="Title"
          {...register("title")}
          placeholder="Enter post title"
          error={errors.title?.message}
        />

        <TextInput
          id="slug"
          label="Slug"
          {...register("slug")}
          placeholder="Enter slug"
          error={errors.slug?.message}
        />

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
          image_url={preview}
          onChange={(files) => {
            setValue("featured_image", files);
          }}
          error={errors.featured_image?.message}
          preview={preview}
        />

        <div className="mt-6">
          <FormButton IsValid={isValid} loading={isPending}>
            Update Post
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

export default BlogUpdateForm;
