"use client";

import React from "react";

export default function SalesChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const salesData = [45, 52, 38, 65, 48, 72];
  const maxValue = Math.max(...salesData);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Monthly sales performance</p>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>

      <div className="space-y-4">
        {months.map((month, index) => (
          <div key={month} className="flex items-center">
            <div className="w-12 text-sm font-medium text-gray-600">
              {month}
            </div>
            <div className="flex-1 ml-4">
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                  style={{
                    width: `${(salesData[index] / maxValue) * 100}%`,
                  }}
                >
                  <span className="text-xs font-semibold text-white">
                    ${salesData[index]}M
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-600">Total Sales</p>
            <p className="text-lg font-bold text-gray-900 mt-1">$320M</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Avg. Monthly</p>
            <p className="text-lg font-bold text-gray-900 mt-1">$53.3M</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Growth</p>
            <p className="text-lg font-bold text-green-600 mt-1">+12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}