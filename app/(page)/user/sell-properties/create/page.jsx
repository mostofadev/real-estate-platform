"use client";
import AdminLayout from "@/app/components/admin/layout/Layout";
import Layout from "@/app/components/layout/Layout";
import ProfileMenu from "@/app/components/page/user/profile/ProfileMenu";
import SellPropertiesForm from "@/app/components/page/user/sellproperties/create/SellPropertiesForm";
import SellPropertiesFrom from "@/app/components/page/user/sellproperties/sellcreate/SellPropertiesFrom";
import MarginSection from "@/app/components/sections/MarginSection";
import ProtectedRouteUser from "@/app/route/ProtestedRouteUser";
import React, { useState } from "react";

function page() {
  const [activeTabInfo, setActiveTabInfo] = useState("properties-sell/create");
  return (
    <ProtectedRouteUser>
      <MarginSection>
        <div className="my-4">
          <ProfileMenu
            activeTabInfo={activeTabInfo}
            setActiveTabInfo={setActiveTabInfo}
          />
        </div>
        <SellPropertiesFrom />
      </MarginSection>
    </ProtectedRouteUser>
  );
}

export default page;
