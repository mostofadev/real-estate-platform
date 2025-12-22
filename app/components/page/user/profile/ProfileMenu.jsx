"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useUserAuthContext } from "@/app/Context/UserAuthContext";
import { useRouter } from "next/navigation";
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useUserAuthContext();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      return router.push("/login");
    }
  };
  const menuItems = [
    { name: "Profile", key: "profile", path: "/user/profile" },
    { name: "Properties", key: "myProperties", path: "/user/properties" },

    { name: "Favorites", key: "myFavorites", path: "/user/favorites" },
    
    {
      name: "Change Password",
      key: "changePassword",
      path: "/user/profile/password",
    },
  ];

  const activeClasses = "bg-[var(--primary-color)] text-white font-semibold";
  const defaultClasses =
    "text-gray-300 hover:bg-[var(--primary-color)] hover:text-white";

  return (
    <div className="w-full bg-gray-700 text-white">
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between px-4 py-3 sm:hidden">
        <span className="font-semibold text-lg">Menu</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex">
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.path}
              className={`block py-4 px-6 transition ${
                pathname === item.path ? activeClasses : defaultClasses
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li className="flex justify-center items-center">
          <button
            className={`text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-400 ${defaultClasses}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile dropdown menu */}
      {open && (
        <ul className="sm:hidden flex flex-col border-t border-gray-600">
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.path}
                className={`block py-3 px-4 transition ${
                  pathname === item.path ? activeClasses : defaultClasses
                }`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="flex justify-center items-center">
            <button
              className={`text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-400 ${defaultClasses}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
