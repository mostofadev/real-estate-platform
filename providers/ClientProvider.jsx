"use client";

import { UserAuthProvider } from "@/app/Context/UserAuthContext";
import AdminClientProvider from "./AdminClientProvider";
import { SellPropertiesProvider } from "@/app/Context/SellPropertiesContext";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function ClientProvider({ children }) {
  return (
    <>
      <AdminClientProvider>
        <UserAuthProvider>
          <SellPropertiesProvider>
            <Provider store={store}>{children}</Provider>
          </SellPropertiesProvider>
        </UserAuthProvider>
      </AdminClientProvider>
    </>
  );
}
