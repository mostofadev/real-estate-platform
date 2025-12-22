import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: [{ type: "Profile", id: "SINGLE" }],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Profile", id: "SINGLE" }],
    }),
  }),
});

// 🔥 Correct export of hooks
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice;
