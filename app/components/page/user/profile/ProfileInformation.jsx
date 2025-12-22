import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  useUserProfile,
  useUserUpdateProfile,
} from "@/app/hooks/useUserProfile";
import TextInput from "@/app/components/ui/formAction/TextInput";
import FormButton from "@/app/components/ui/button/SubmitButton";
import CustomToast from "@/app/components/ui/toast/CustomToast";
import { showCustomToast } from "@/lib/showCustomToast";
import PageLoading from "@/app/components/ui/loader/PageLoading";

function ProfileInformation({ disable, onEditClick }) {
  const { data, isLoading, isError, error } = useUserProfile();
  const { mutate, isPending } = useUserUpdateProfile();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const userProfileSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    address: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("email", data.email || "");
      setValue("phone", data.phone || "");
      setValue("address", data.address || "");

      // Set initial image preview with full URL
      if (data.profile_photo) {
        // Build full image URL
        const baseURL =
          process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
          "http://localhost:8000";
        const photoUrl = data.profile_photo.startsWith("http")
          ? data.profile_photo
          : `${baseURL}${data.profile_photo}`;
        setImagePreview(photoUrl);
      }
    }
  }, [data, setValue]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, PNG images are allowed");
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2048 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);

    // Reset to original image
    if (data?.profile_photo) {
      const baseURL =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:8000";
      const photoUrl = data.profile_photo.startsWith("http")
        ? data.profile_photo
        : `${baseURL}${data.profile_photo}`;
      setImagePreview(photoUrl);
    } else {
      setImagePreview(null);
    }

    // Reset file input
    const fileInput = document.getElementById("profile_photo");
    if (fileInput) fileInput.value = "";
  };

  // Form submit handle
  const submitHandle = (formData) => {

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);

    if (formData.address) {
      formDataToSend.append("address", formData.address);
    }

    if (selectedFile) {
      formDataToSend.append("profile_photo", selectedFile);
      console.log("Image attached to FormData");
    }

    for (let pair of formDataToSend.entries()) {
      console.log(
        pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
      );
    }

    mutate(formDataToSend, {
      onSuccess: (response) => {
        showCustomToast({
          title: "Success",
          message: "Profile updated successfully!",
          type: "success",
        });
        setSelectedFile(null);
        if (onEditClick) onEditClick();
      },
      onError: (err) => {
       
        const errorMessage =
          err.response?.data?.message || "Failed to update profile";
       showCustomToast({
          title: "Success",
          message: "Profile updated successfully!",
          type: "success",
        });
          alert(errorMessage);
      },
    });
  };

  if (isLoading) {
    return (
      <PageLoading />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-red-500">Error loading profile: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <form onSubmit={handleSubmit(submitHandle)}>
        {/* Profile Photo Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Image Preview */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"%3E%3Cpath fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            {!disable && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="profile_photo"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Choose Photo
                </label>

                <input
                  id="profile_photo"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove selected image
                  </button>
                )}

                <p className="text-xs text-gray-500">
                  JPG, JPEG or PNG. Max 2MB.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row gap-2 w-full">
          <TextInput
            id="name"
            label="Name"
            block={disable}
            placeholder="Enter Name"
            {...register("name")}
            error={errors.name?.message}
          />
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter Email"
            block={true}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-2 w-full">
          <TextInput
            id="phone"
            label="Phone"
            placeholder="Enter Phone"
            block={disable}
            {...register("phone")}
            error={errors.phone?.message}
          />
          <TextInput
            id="address"
            label="Address"
            placeholder="Enter Address"
            block={disable}
            {...register("address")}
            error={errors.address?.message}
          />
        </div>

        {/* Action Buttons */}
        {!disable && (
          <div className="flex flex-col sm:flex-row gap-2 w-full mt-6">
            <FormButton IsValid={true} loading={isPending} disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </FormButton>
            <button
              type="button"
              className="text-sm bg-red-500 hover:bg-red-600 rounded-lg py-2 px-12 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onEditClick}
              disabled={isPending}
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfileInformation;
