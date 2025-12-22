"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FaUser, FaPhone, FaEnvelope, FaHome, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import PageLoading from "@/app/components/ui/loader/PageLoading";
import { useAdminRequestShow, useAdminRequestUpdateStatus } from "@/app/hooks/useAdminRequest";

export default function RequestDetailPage() {
  const params = useParams();
  const id = params.id;
  
  const { data, isLoading, isError, error } = useAdminRequestShow(id);
  const { mutate: UpdateStatus } = useAdminRequestUpdateStatus();
  
  const requestData = data?.data?.data;

  const handleStatusUpdate = (newStatus) => {
    UpdateStatus({ id, status: newStatus });
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    return badges[status] || badges.pending;
  };

  if (isLoading) return <PageLoading />;
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message}</div>;
  if (!requestData) return <div className="p-6">No data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Property Request Details
              </h1>
              <p className="text-gray-600">View and manage property inquiry</p>
            </div>
            <div className={`px-4 py-2 rounded-full border-2 font-semibold text-sm uppercase ${getStatusBadge(requestData.status)}`}>
              {requestData.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaHome />
                  Property Information
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={`http://localhost:8000/${requestData.property.image}`}
                      alt={requestData.property.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {requestData.property.title}
                      </h3>
                      <div className="flex items-center gap-2 text-green-600">
                        <FaDollarSign className="text-xl" />
                        <span className="text-2xl font-bold">
                          {parseFloat(requestData.property.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Message */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
                <h2 className="text-xl font-semibold">Request Message</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="text-gray-700 leading-relaxed">
                    {requestData.message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Information & Actions */}
          <div className="space-y-6">
            {/* User Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaUser />
                  User Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FaUser className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-semibold text-gray-800">
                      {requestData.user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-800 break-all">
                      {requestData.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold text-gray-800">
                      {requestData.number}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {requestData.status === 'pending' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Update Request Status
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleStatusUpdate('approved')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle className="text-xl" />
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('rejected')}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                  >
                    <FaTimesCircle className="text-xl" />
                    Reject Request
                  </button>
                </div>
              </div>
            )}

            {requestData.status !== 'pending' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className={`text-center py-8 rounded-lg ${
                  requestData.status === 'approved' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {requestData.status === 'approved' ? (
                    <>
                      <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Request Approved
                      </h3>
                      <p className="text-green-600">
                        This request has been approved
                      </p>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-red-800 mb-2">
                        Request Rejected
                      </h3>
                      <p className="text-red-600">
                        This request has been rejected
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}