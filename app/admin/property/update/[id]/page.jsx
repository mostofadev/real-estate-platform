"use client";
import AdminPropertiesUpdateForm from "@/app/components/admin/page/property/AdminPropertiesUpdateForm";
import { useParams } from "next/navigation";

export default function PropertyUpdatePage() {
  const params = useParams();
  const propertyId = params.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Update Property</h1>
      <AdminPropertiesUpdateForm propertyId={propertyId} />
    </div>
  );
}