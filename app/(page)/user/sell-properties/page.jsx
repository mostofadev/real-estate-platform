"use client";
import Layout from "@/app/components/layout/Layout";
import ProfileMenu from "@/app/components/page/user/profile/ProfileMenu";
import SellPropertiesIndex from "@/app/components/page/user/sellproperties/index/SellPropertiesIndex";
import MarginSection from "@/app/components/sections/MarginSection";
import PrimaryButton from "@/app/components/ui/button/Primary";
import ProtectedRouteUser from "@/app/route/ProtestedRouteUser";
import React, { useState } from "react";

function page() {
  const [activeTabInfo, setActiveTabInfo] = useState("properties-sell");
  return (
    <div>
      <ProtectedRouteUser>
        <MarginSection>
          <div className="my-4">
            <ProfileMenu
              activeTabInfo={activeTabInfo}
              setActiveTabInfo={setActiveTabInfo}
            />
          </div>
          <div className="">
            <SellPropertiesIndex />
          </div>
        </MarginSection>
      </ProtectedRouteUser>
    </div>
  );
}

export default page;
