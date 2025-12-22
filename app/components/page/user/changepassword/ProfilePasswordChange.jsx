import FormButton from "@/app/components/ui/button/SubmitButton";
import Form from "@/app/components/ui/formAction/Form";
import TextInput from "@/app/components/ui/formAction/TextInput";
import { useUserChangePassword } from "@/app/hooks/useUserProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(6, "Current password must be at least 6 characters"),

    new_password: z
      .string()
      .min(6, "New password must be at least 6 characters"),

    new_password_confirmation: z
      .string()
      .min(6, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });
function ProfilePasswordChange() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const { mutate, isPending, isError, isSuccess, error, data } =
    useUserChangePassword();
  const submitHandle = (data) => {
    console.log(data);

    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Password changed successfully!");
        reset();
      },
    });
  };
  {
    isError && (
      <p className="text-red-600">
        {error?.response?.data?.message || "Error occurred"}
      </p>
    );
  }
  return (
    <Form onSubmit={handleSubmit(submitHandle)}>
      <div>
        <TextInput
          id="current_password"
          label="Current Password"
          type="password"
          placeholder="Current Password"
          {...register("current_password")}
          error={errors.current_password?.message}
        />

        <TextInput
          id="new_password"
          label="New Password"
          type="password"
          placeholder="New Password"
          {...register("new_password")}
          error={errors.new_password?.message}
        />

        <TextInput
          id="new_password_confirmation"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          {...register("new_password_confirmation")}
          error={errors.new_password_confirmation?.message}
        />

        <FormButton IsValid={isValid} loading={isPending}>Submit</FormButton>
      </div>
    </Form>
  );
}

export default ProfilePasswordChange;
