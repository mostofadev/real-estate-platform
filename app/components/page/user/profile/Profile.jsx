import Image from "next/image";
import React from "react";
import ProfileImage from "../../../../../public/Image/profile.jpeg";
import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileInformation";
function Profile() {
  return (
    <div className="w-full border border-gray-100 border-[0.5px]  p-6 shadow-lg ">
      <ProfileHeader ProfileImage={ProfileImage} name="Jane Smith" email="janesmith@example.com" />
      <div className="lg:my-12 my-4">
        <ProfileInformation />
      </div>
    </div>
  );
}

export default Profile;
