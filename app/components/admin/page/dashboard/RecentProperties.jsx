"use client";

import React from "react";
import Link from "next/link";

export default function RecentProperties() {
  const properties = [
    {
      id: 1,
      title: "Modern Villa in Downtown",
      location: "Gulshan, Dhaka",
      price: "$450,000",
      status: "Active",
      image: "https://via.placeholder.com/100",
      type: "Sale",
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Banani, Dhaka",
      price: "$850/month",
      status: "Pending",
      image: "https://via.placeholder.com/100",
      type: "Rent",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Motijheel, Dhaka",
      price: "$2,500/month",
      status: "Active",
      image: "https://via.placeholder.com/100",
      type: "Rent",
      bedrooms: null,
      bathrooms: 2,
    },
    {
      id: 4,
      title: "Beach House",
      location: "Cox's Bazar",
      price: "$1.2M",
      status: "Sold",
      image: "https://via.placeholder.com/100",
      type: "Sale",
      bedrooms: 5,
      bathrooms: 4,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Properties
          </h2>
          <Link
            href="/admin/properties"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {property.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.bedrooms && `${property.bedrooms} bed`}
                        {property.bedrooms && property.bathrooms && " • "}
                        {property.bathrooms && `${property.bathrooms} bath`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {property.price}
                  </div>
                  <div className="text-xs text-gray-500">{property.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}