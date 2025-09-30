import React from "react";

function InfoMenu({ activeTabInfo, setActiveTabInfo }) {
  const menuItems = [
    { name: "Overview", key: "overview" },
    { name: "Features", key: "features" },
  ];

  return (
    <div>
      <ul className="flex bg-gray-700   ">
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => setActiveTabInfo(item.key)}
            className={`cursor-pointer  py-4 px-6  ${
              activeTabInfo === item.key
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

export default InfoMenu;
