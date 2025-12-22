import { configureStore } from "@reduxjs/toolkit";
import { propertyApiSlice } from "./api/PropertiesApi";
import { profileApiSlice } from "./api/ProfileApi";
const store = configureStore({
  reducer: {
    [propertyApiSlice.reducerPath]: propertyApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApiSlice.middleware)
      .concat(profileApiSlice.middleware),
});

export default store;
