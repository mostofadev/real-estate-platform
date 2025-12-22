
import AdminPropertiesForm from "@/app/components/admin/page/property/AdminPropertyForm";
import AdminBack from "@/app/components/ui/section/AdminBack";
import React from "react";

function page() {
  return (
    <div>
      <div className="my-4">
        <div className="flex items-center gap-4 p-6 justify-between">
          <AdminBack To={"/admin/property"} />
          <h1 className="text-2xl font-bold">Create Property</h1>
        </div>
      </div>
      <AdminPropertiesForm />
    </div>
  );
}

export default page;
