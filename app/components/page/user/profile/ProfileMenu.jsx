"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Profile", key: "profile", path: "/profile" },
    { name: "My Properties", key: "myProperties", path: "/my-properties" },
    { name: "Sell Properties", key: "sellProperties", path: "/sell-properties" },
    { name: "My Invoices", key: "myInvoices", path: "/my-invoices" },
    { name: "My Favorites", key: "myFavorites", path: "/my-favorites" },
  ];

  const activeClasses =
    "bg-[var(--primary-color)] text-white font-semibold";
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
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
