"use client";

import { Toaster } from "react-hot-toast";
import ClientProvider from "../providers/ClientProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Layout from "@/app/components/layout/Layout";

export default function ClientOnlyWrapper({ children }) {
  const queryClient = new QueryClient();
  const pathname = usePathname() || "";
  const isAdminPage = pathname.startsWith("/admin");

  const content = (
    <QueryClientProvider client={queryClient}>
      <ClientProvider>
        <Toaster position="top-right" />
        <ToastContainer position="top-right" autoClose={300} />
        {children}
      </ClientProvider>
    </QueryClientProvider>
  );

  return isAdminPage ? content : <Layout>{content}</Layout>;
}
