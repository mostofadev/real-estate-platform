"use client";

import React from "react";

export default function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      property: "Modern Villa",
      buyer: "John Doe",
      amount: "$450,000",
      date: "2024-12-10",
      status: "Completed",
    },
    {
      id: 2,
      property: "Luxury Apartment",
      buyer: "Jane Smith",
      amount: "$325,000",
      date: "2024-12-08",
      status: "Pending",
    },
    {
      id: 3,
      property: "Office Space",
      buyer: "ABC Corp",
      amount: "$850,000",
      date: "2024-12-05",
      status: "Completed",
    },
    {
      id: 4,
      property: "Beach House",
      buyer: "Mike Johnson",
      amount: "$1,200,000",
      date: "2024-12-01",
      status: "In Progress",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {transaction.property}
                  </h3>
                  <span
                    className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Buyer: {transaction.buyer}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold text-gray-900">
                  {transaction.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}