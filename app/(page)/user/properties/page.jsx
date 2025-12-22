"use client";
import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import ProfileMenu from "@/app/components/page/user/profile/ProfileMenu";
import MarginSection from "@/app/components/sections/MarginSection";
import RequestCard from "@/app/components/ui/card/RequestCard";
import Pagination from "@/app/components/ui/pagination/Pagination";
import { usePropertyBookingDelete, usePropertyBookingGet } from "@/app/hooks/usePropertyBooking";
import ProtectedRouteUser from "@/app/route/ProtestedRouteUser";
import PageLoading from "@/app/components/ui/loader/PageLoading";

function Page() {
  const [activeTabInfo, setActiveTabInfo] = useState("profile");

  const { data, isLoading, isError, error, page, setPage } =
    usePropertyBookingGet();
  const{mutate} = usePropertyBookingDelete();
  const pagination = data?.pagination
    ? {
        current_page: Number(data.pagination.current_page || 1),
        per_page: Number(data.pagination.per_page || 10),
        last_page: Number(data.pagination.last_page || 1),
        total: Number(data.pagination.total || 0),
      }
    : null;

  const handlePageChange = (newPage) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.last_page) return;
    setPage(newPage);
  };

  const RemoveHandle = (id) => {
    console.log('properties delete booking',id);
    
    mutate(id)
  };

  return (
    <ProtectedRouteUser>
      <MarginSection>
        <div className="my-4">
          <ProfileMenu
            activeTabInfo={activeTabInfo}
            setActiveTabInfo={setActiveTabInfo}
          />
        </div>

        <div className="my-16">
          {isLoading && <PageLoading />}
          {isError && (
            <div className="text-center py-16 text-red-500">
              {error.message}
            </div>
          )}

          {!isLoading && !isError && data?.data?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.data.map((item) => (
                  <RequestCard
                    key={item.id}
                    property={item}
                    deleteId={item.id}
                    onRemove={RemoveHandle}
                  />
                ))}
              </div>

              <div className="my-4">
                {" "}
                {pagination && (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </>
          ) : (
            !isLoading &&
            !isError && (
              <div className="text-center text-gray-500 py-16">
                No properties found in your wishlist.
              </div>
            )
          )}
        </div>
      </MarginSection>
    </ProtectedRouteUser>
  );
}

export default Page;
