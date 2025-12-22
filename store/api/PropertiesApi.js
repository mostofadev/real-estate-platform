import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const propertyApiSlice = createApi({
  reducerPath: "propertyApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getProperty: builder.query({
      query: (page) => ({
        url: `/user/property?page=${page}`,
        providesTags: (result) =>
          result
            ? [
                ...result.data.data.map(({ id }) => ({ type: "Property", id })),
                { type: "Property", id: "LIST" },
              ]
            : [{ type: "Property", id: "LIST" }],
      }),
    }),

    singleProperty: builder.query({
      query: (id) => `/user/property/${id}`,
    }),

    addProperty: builder.mutation({
      query: (newProperty) => ({
        url: "/user/property",
        method: "POST",
        body: newProperty,
      }),
    }),

    updateProperty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/property/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/user/property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),

    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const {
  useGetPropertyQuery,
  useSinglePropertyQuery,
  useGetUsersQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApiSlice;
