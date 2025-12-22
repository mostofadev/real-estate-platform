import Image from "next/image";
import React, { useState } from "react";
import ProfileImage from "../../../../../public/Image/profile.jpeg";
import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileInformation";

function Profile() {
 
  const [disable, setDisable] = useState(true);
  return (
    <div className="w-full border border-gray-100 border-[0.5px]  p-6 shadow-lg ">
      <ProfileHeader
        ProfileImage={ProfileImage}
        name="Jane Smith"
        email="janesmith@example.com"
        onEditClick={() => setDisable((prev) => !prev)}
        disable={disable}
      />
      <div className="lg:my-12 my-4">
        <ProfileInformation
          disable={disable}
          onEditClick={() => setDisable((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default Profile;
