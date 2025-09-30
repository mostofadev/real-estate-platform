import React from "react";
import Input from "@/app/components/ui/formAction/Input";

function ProfileInformation() {
  return (
    <div className="space-y-6 w-full">
      {/* Name & Email */}
      <div className="flex flex-col lg:flex-row gap-2 w-full">
        <Input
          Name="name"
          Type="text"
          Placeholder="Enter Name"
          id="name"
          Label="Full Name"
          className="w-full"
        />
        <Input
          Name="email"
          Type="email"
          Placeholder="Enter Email"
          id="email"
          Label="Email Address"
          className="w-full"
        />
      </div>

      {/* Password & Phone */}
      <div className="flex flex-col lg:flex-row gap-2 w-full">
        <Input
          Name="password"
          Type="password"
          Placeholder="Enter Password"
          id="password"
          Label="Password"
          className="w-full"
        />
        <Input
          Name="phone"
          Type="text"
          Placeholder="Enter Phone Number"
          id="phone"
          Label="Phone"
          className="w-full"
        />
      </div>

      

      {/* Profile Image */}
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">Profile Image</label>
        <input
          type="file"
          name="profile_image"
          id="profile_image"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      {/* Bio */}
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          id="bio"
          rows="4"
          placeholder="Write something about yourself..."
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        ></textarea>
      </div>

      {/* Social Links */}
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">Social Links (JSON)</label>
        <textarea
          name="social_links"
          id="social_links"
          rows="3"
          placeholder='{"facebook": "", "twitter": "", "linkedin": ""}'
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        ></textarea>
      </div>

      {/* Verified At */}
      <div className="w-full">
        <Input
          Name="verified_at"
          Type="datetime-local"
          id="verified_at"
          Label="Verified At"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ProfileInformation;
