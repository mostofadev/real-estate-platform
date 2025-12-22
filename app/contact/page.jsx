"use client";

import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import PrimaryButton from "../components/ui/button/Primary";
import MarginSection from "../components/sections/MarginSection";
import TextInput from "../components/ui/formAction/TextInput";
import TextArea from "../components/ui/formAction/TextAreaInput";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostContactMessage } from "../hooks/useContactMessage";
import FormButton from "../components/ui/button/SubmitButton";

export const ContactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Email must be valid"),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string().min(10, "Message must be at least 3 characters"),
});
export default function ContactPage() {
  const { mutate, isPending } = usePostContactMessage();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("onSubmit contact", data);
    const formData = new FormData(); // Fixed: added ()
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    mutate(formData, {
      onSuccess: (response) => {
        showCustomToast({
          title: "Success",
          message: "Message sent successfully!", // Fixed typo
          type: "success",
        });
        // Remove these lines if not needed:
        // setSelectedFile(null);
        // if (onEditClick) onEditClick();
      },
      onError: (err) => {
        const errorMessage =
          err.response?.data?.message || "Failed to send message!"; // Fixed typo
        showCustomToast({
          title: "Error", // Changed from "Success"
          message: errorMessage,
          type: "error", // Changed from "success"
        });
      },
    });
  };

  return (
    <MarginSection>
      <div className="py-20">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-2 lg:p-10">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-10">
              Have questions or looking for Maldives rentals? Reach out anytime
              — we&apos;re here to help!
            </p>

            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center gap-4 hover:text-teal-500 transition">
                <FaMapMarkerAlt className="text-teal-500" /> Maldives Rentals
                Offices
              </li>
              <li className="flex items-center gap-4 hover:text-teal-500 transition">
                <FaPhone className="text-teal-500" /> (305) 555-4555
              </li>
              <li className="flex items-center gap-4 hover:text-teal-500 transition">
                <FaEnvelope className="text-teal-500" /> youremail@gmail.com
              </li>
              <li className="flex items-center gap-4 hover:text-teal-500 transition">
                <FaInstagram className="text-teal-500" /> @maldivesrentals
              </li>
              <li className="flex items-center gap-4 hover:text-teal-500 transition">
                <FaGlobe className="text-teal-500" /> www.maldivesrentals.com
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-gray-50 py-8 px-4 rounded-2xl shadow-inner"
          >
            <TextInput
              type="text"
              name="name"
              placeholder="Full Name"
              {...register("name")}
              error={errors.name?.message}
              className="rounded-xl focus:ring-2 focus:ring-teal-500 outline-none px-4 py-3"
            />

            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
              className="rounded-xl focus:ring-2 focus:ring-teal-500 outline-none px-4 py-3"
            />

            <TextInput
              type="text"
              name="phone"
              placeholder="Phone Number (optional)"
              {...register("phone")}
              error={errors.phone?.message}
              className="rounded-xl focus:ring-2 focus:ring-teal-500 outline-none px-4 py-3"
            />

            <TextInput
              type="text"
              name="subject"
              placeholder="Subject"
              {...register("subject")}
              error={errors.subject?.message}
              className="rounded-xl focus:ring-2 focus:ring-teal-500 outline-none px-4 py-3"
            />

            <TextArea
              name="message"
              placeholder="Your Message"
              {...register("message")}
              error={
                errors.message?.message ||
                (Array.isArray(errors.message) ? errors.message[0] : "")
              }
              rows={6}
              className="rounded-xl focus:ring-2 focus:ring-teal-500 outline-none px-4 py-3"
            />
            <div className="mx-5">
              <FormButton
                IsValid={isValid}
                loading={isPending}
                disabled={isPending}
              >
                Send
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </MarginSection>
  );
}
