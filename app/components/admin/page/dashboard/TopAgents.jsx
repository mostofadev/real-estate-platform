"use client";

import React from "react";

export default function TopAgents() {
  const agents = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/40",
      properties: 45,
      sales: "$2.3M",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/40",
      properties: 38,
      sales: "$1.9M",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://via.placeholder.com/40",
      properties: 32,
      sales: "$1.6M",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Sarah Williams",
      avatar: "https://via.placeholder.com/40",
      properties: 28,
      sales: "$1.4M",
      rating: 4.6,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Agents</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">
                  {agent.name}
                </p>
                <p className="text-xs text-gray-600">
                  {agent.properties} properties
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{agent.sales}</p>
              <div className="flex items-center mt-1">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-gray-600 ml-1">
                  {agent.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
          View All Agents
        </button>
      </div>
    </div>
  );
}