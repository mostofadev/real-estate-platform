"use client";

import React from "react";

export default function RecentUsers() {
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://via.placeholder.com/40",
      joinDate: "2024-12-10",
      role: "Buyer",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "https://via.placeholder.com/40",
      joinDate: "2024-12-09",
      role: "Agent",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      avatar: "https://via.placeholder.com/40",
      joinDate: "2024-12-08",
      role: "Seller",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      avatar: "https://via.placeholder.com/40",
      joinDate: "2024-12-07",
      role: "Buyer",
    },
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case "Agent":
        return "bg-purple-100 text-purple-800";
      case "Buyer":
        return "bg-blue-100 text-blue-800";
      case "Seller":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center flex-1">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Joined{" "}
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}