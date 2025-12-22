import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("user_token"));

    console.log("token store", token);

    if (token) {
      console.log("yes token have");

      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  responseHandler: async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    } else {
      const text = await response.text();
      return { error: `Non-JSON response: ${text}` };
    }
  },
});
