"use client";

import React from "react";

export default function PropertyTypeChart() {
  const propertyTypes = [
    { name: "Apartments", count: 543, color: "bg-blue-500", percentage: 45 },
    { name: "Houses", count: 324, color: "bg-green-500", percentage: 27 },
    { name: "Commercial", count: 231, color: "bg-purple-500", percentage: 19 },
    { name: "Land", count: 136, color: "bg-yellow-500", percentage: 9 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Property Types
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Distribution by category
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Simple Donut Representation */}
          <div className="absolute inset-0 rounded-full border-[40px] border-gray-100"></div>
          <div
            className="absolute inset-0 rounded-full border-[40px] border-blue-500"
            style={{
              clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border-[40px] border-green-500"
            style={{
              clipPath: "polygon(50% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {propertyTypes.map((type, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className={`w-3 h-3 rounded-full ${type.color} mr-3`}></div>
              <span className="text-sm font-medium text-gray-700">
                {type.name}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-900 mr-4">
                {type.count}
              </span>
              <span className="text-sm text-gray-600 w-12 text-right">
                {type.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}