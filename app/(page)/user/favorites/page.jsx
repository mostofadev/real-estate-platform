"use client";
import Layout from "@/app/components/layout/Layout";
import BtnSpinner from "@/app/components/loader/BtnSniper";
import ProfileMenu from "@/app/components/page/user/profile/ProfileMenu";
import MarginSection from "@/app/components/sections/MarginSection";
import PropertieCard from "@/app/components/ui/card/PropertieCard";
import WishlistCard from "@/app/components/ui/card/WishlistCard";
import PageLoading from "@/app/components/ui/loader/PageLoading";
import Pagination from "@/app/components/ui/pagination/Pagination";
import {
  useDeleteUserWishlist,
  useGetUserWishlist,
} from "@/app/hooks/useUserWishlist";
import ProtectedRouteUser from "@/app/route/ProtestedRouteUser";
import { showCustomToast } from "@/lib/showCustomToast";
import { useDeletePropertyMutation } from "@/store/api/PropertiesApi";
import React, { useState } from "react";

function Page() {
  const [activeTabInfo, setActiveTabInfo] = useState("profile");
  const { data, isLoading, isError, error, page, setPage } =
    useGetUserWishlist();
  const { mutate: DeleteWishlist } = useDeleteUserWishlist();
  const pagination = data
    ? {
        current_page: Number(data.current_page || 1),
        per_page: Number(data.per_page || 10),
        last_page: Number(data.last_page || 1),
        total: Number(data.total || 0),
      }
    : null;

  const handlePageChange = (newPage) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.last_page) return;
    setPage(newPage);
  };

  const RemoveHandle = (id) => {
    console.log('wishlist id delete',id);
    
    DeleteWishlist(id, {
      onSuccess: () => {
        showCustomToast({
          title: "Success",
          message: "Wishlist Delete Successful",
          type: "success",
        });
      },
      onError: () => {
        showCustomToast({
          title: "Error",
          message: "Wishlist Delete Failed",
          type: "error",
        });
      },
    });
  };

  if (isLoading) {
    return (
     <PageLoading />
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-48 text-red-600">
        Failed to load wishlist: {error?.message || "Unknown error"}
      </div>
    );
  }

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
          {data?.data?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.data.map((item) => (
                  <WishlistCard
                    key={item.id}
                    property={item.property}
                    deleteId={item.id}
                    onRemove={RemoveHandle}
                  />
                ))}
              </div>

              {pagination && (
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-16">
              No properties found in your wishlist.
            </div>
          )}
        </div>
      </MarginSection>
    </ProtectedRouteUser>
  );
}

export default Page;
