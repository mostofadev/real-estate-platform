"use client";
import Layout from "@/app/components/layout/Layout";
import Profile from "@/app/components/page/user/profile/Profile";
import ProfileMenu from "@/app/components/page/user/profile/ProfileMenu";
import MarginSection from "@/app/components/sections/MarginSection";
import React, { useState } from "react";

function page() {
  const [activeTabInfo, setActiveTabInfo] = useState("profile");
  return (
    <Layout>
      <MarginSection>
        <div className="my-4">
          <ProfileMenu
            activeTabInfo={activeTabInfo}
            setActiveTabInfo={setActiveTabInfo}
          />
        </div>
        <div className="my-16">
          <Profile />
        </div>
      </MarginSection>
    </Layout>
  );
}

export default page;
