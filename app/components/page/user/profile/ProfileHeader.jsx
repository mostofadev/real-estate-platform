import React from "react";
import Image from "next/image";
import ProfileDemo from "../../../../../public/Image/demo.jpg";
function ProfileHeader({
  ProfileImage = ProfileDemo,
  name = "John Doe",
  email = "johndoe@example.com",
  onEditClick,
  disable
}) {
  return (
    <div>
      <div className="flex justify-end items-center lg:flex-row flex-col">
        {/* <div className="flex gap-4 items-center">
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
        </div> */}
        <div className="">
          {disable ? (
            <button
            onClick={onEditClick}
            className="bg-[var(--primary-color)] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
          >
            Edit Profile
          </button>
          )
        :
        ""
        }
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
