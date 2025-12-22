"use client";

import DashboardStats from "@/app/components/admin/page/dashboard/DashboardStats";
import PropertyTypeChart from "@/app/components/admin/page/dashboard/PropertyTypeChart";
import RecentProperties from "@/app/components/admin/page/dashboard/RecentProperties";
import RecentTransactions from "@/app/components/admin/page/dashboard/RecentTransactions";
import RecentUsers from "@/app/components/admin/page/dashboard/RecentUsers";
import SalesChart from "@/app/components/admin/page/dashboard/SalesChart";
import TopAgents from "@/app/components/admin/page/dashboard/TopAgents";
import React from "react";


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <PropertyTypeChart />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentProperties />
          </div>
          <div>
            <TopAgents />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <RecentUsers />
        </div>
      </div>
    </div>
  );
}