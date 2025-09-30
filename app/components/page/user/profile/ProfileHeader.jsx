import React from "react";
import Image from "next/image";
import ProfileDemo from "../../../../../public/Image/demo.jpg";
function ProfileHeader({ ProfileImage = ProfileDemo, name = "John Doe", email = "johndoe@example.com" }) {
  return (
    <div>
      <div className="flex justify-between items-center lg:flex-row flex-col">
        <div className="flex gap-4 items-center">
          <div className="w-[100px] h-[100px]">
            <Image
              src={ProfileImage}
              alt="Profile Picture"
              width={150}
              height={150}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">John Doe</span>
            <span className="text-gray-400">johndoe@example.com</span>
          </div>
        </div>
        <div className="">
          <button className="bg-[var(--primary-color)] text-white py-1 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
