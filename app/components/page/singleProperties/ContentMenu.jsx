import React from "react";

function ContentMenu({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: "Gallery", key: "gallery" },
    { name: "Video", key: "video" },
    { name: "Google Map", key: "googleMap" },
  ];

  return (
    <div>
      <ul className="flex  rounded-lg  px-2 ">
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`cursor-pointer px-4 py-2 border border-[0.5px] border-gray-300 ${
              activeTab === item.key
                ? "border-b-2 border-[var(--primary-color)] bg-[var(--primary-color)] text-white font-semibold"
                : "text-gray-500"
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentMenu;
