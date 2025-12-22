"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../../ui/formAction/TextInput";
import TextArea from "../../ui/formAction/TextAreaInput";
import { usePropertyBookingPost } from "@/app/hooks/usePropertyBooking";
import FormButton from "../../ui/button/SubmitButton";

export default function BookingModal({ property, onClose }) {
  if (!property) return null;

  const { mutate, isPending } = usePropertyBookingPost();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData(parsed);
      } catch (error) {
        console.error("Invalid user_data in localStorage");
      }
    }
  }, []);

  const schema = z.object({
    number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .regex(/^[0-9]+$/, { message: "Only numbers allowed" }),
    message: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      number: "",
      message: "",
    },
  });

  useEffect(() => {
    if (userData?.number) {
      setValue("number", userData.number);
    }
  }, [userData, setValue]);

  const onSubmit = (formData) => {
    if (!userData) return;

    mutate(
      {
        ...formData,
        user_id: userData.id,
        property_id: property.id,
      },
      {
        onSuccess: (res) => {
          console.log("Success response:", res);
          reset();
          onClose();
        },
        onError: (err) => {
          console.log("Error response:", err);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          🏠 Confirm Your Booking
        </h2>

        {/* Property Info */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500">{property.full_location}</p>
          <p className="text-indigo-600 font-semibold mt-1">
            {property.price?.toLocaleString()} BDT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <TextInput
            id="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="text"
            {...register("number")}
            error={errors.number?.message}
          />

          <TextArea
            id="message"
            label="Message (optional)"
            placeholder="Any Message..."
            rows={3}
            {...register("message")}
            error={errors.message?.message}
          />

          {/* Buttons */}
          <div className="mt-5 flex justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            >
              Cancel
            </button>
           
             <FormButton IsValid={true} loading={isPending}>Confirm</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
