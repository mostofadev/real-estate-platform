
"use client";

import { AdminAuthProvider } from "@/app/Context/AdminAuthContext";

export default function AdminClientProvider({ children }) {
  return (
    <>
      <AdminAuthProvider>
        {children}
      </AdminAuthProvider>
    </>
  );
}
