// lib/apiError.js

export function handleApiError(error) {
  const status = error.response?.status;

  if (!status) {
    return {
      type: "network",
      message: "Network error! Please check your internet connection.",
    };
  }

  switch (status) {
    case 400:
      return { type: "bad_request", message: "Bad request. Please check your input." };

    case 401:
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      return { type: "unauthorized", message: "Session expired. Please log in again." };

    case 403:
      return { type: "forbidden", message: "You don’t have permission to access this resource." };

    case 404:
      return { type: "not_found", message: "Resource not found." };

    case 422:
      return {
        type: "validation",
        message: "Validation failed. Please check your input.",
        details: error.response.data.errors,
      };

    case 429:
      return { type: "rate_limit", message: "Too many requests. Please slow down." };

    case 500:
      return { type: "server_error", message: "Internal server error." };

    case 503:
      return { type: "service_unavailable", message: "Service is temporarily unavailable." };

    case 504:
      return { type: "gateway_timeout", message: "Gateway timeout. Please try again later." };

    default:
      return { type: "unknown", message: "Unexpected error occurred." };
  }
}
