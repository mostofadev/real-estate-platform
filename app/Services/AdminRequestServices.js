import adminInstance from "@/lib/axiosAdmin";

export const AdminUpdateStatusServices = async (id, status) => {
  const response = await adminInstance.put(`/admin/requests/${id}/status`, {
    status: status
  });
  
  console.log("Status Update Response:", response);
  return response;
};

// If you need other admin request services, add them here:
export const AdminGetAllRequestsServices = async (page = 1) => {
  const response = await adminInstance.get(`/admin/requests?page=${page}`);
  return response.data;
};

export const AdminGetApprovedRequestsServices = async (page = 1) => {
  const response = await adminInstance.get(`/admin/requests/approved/?page=${page}`);
  return response.data;
};

export const AdminGetRejectedRequestsServices = async (page = 1) => {
  const response = await adminInstance.get(`/admin/requests/rejected/?page=${page}`);
  return response.data;
};

export const AdminGetSingleRequestServices = async (id) => {
  const response = await adminInstance.get(`/admin/requests/${id}`);
  return response;
};

export const AdminDeleteRequestServices = async (id) => {
  const response = await adminInstance.delete(`/admin/requests/delete/${id}`);
  return response;
};