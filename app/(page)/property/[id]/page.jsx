"use client";
import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import MarginSection from "@/app/components/sections/MarginSection";
import ContentMenu from "@/app/components/page/singleProperties/ContentMenu";
import Content from "@/app/components/page/singleProperties/Content";
import RelatedProperties from "@/app/components/page/singleProperties/RelatedProperties";
import Details from "@/app/components/page/singleProperties/Details";
import Description from "@/app/components/page/singleProperties/Description";
import Address from "@/app/components/page/singleProperties/Address";
import InfoMenu from "@/app/components/page/singleProperties/InfoMenu";
import InfoContent from "@/app/components/page/singleProperties/InfoContent";
import FavoriteButton from "@/app/components/page/singleProperties/FavoriteButton";
import PrimaryButton from "@/app/components/ui/button/Primary";
import { useSingleProperty } from "@/app/hooks/useHomePage";
import { useParams, useRouter } from "next/navigation"; // router add koren
import BookingModal from "@/app/components/page/booking/BuyNowModal";
import PageLoading from "@/app/components/ui/loader/PageLoading";
import { showCustomToast } from "@/lib/showCustomToast"; // jodi toast lagey

function Page() {
  const { id } = useParams();
  const router = useRouter(); // add koren

  const [activeTab, setActiveTab] = useState("gallery");
  const [activeTabInfo, setActiveTabInfo] = useState("overview");
  const { data, isLoading, isError, error } = useSingleProperty(id);

  const singleProperty = data;
  const userToken = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;
  const [bookingPopup, setBookingPopup] = useState(false);

  // Booking button handler add koren
  const handleBookingClick = () => {
    if (!userToken) {
      showCustomToast({
        title: "Login Required",
        message: "Please login to book this property",
        type: "error",
      });
      router.push(`/login?redirect=/property/${id}`);
      return;
    }
    setBookingPopup(true);
  };

  if (isLoading) {
    return <PageLoading />;
  }
  
  return (
    <MarginSection>
      <div className="my-4 flex justify-between lg:flex-row flex-col items-center px-2 gap-6">
        <ContentMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex gap-3">
          <FavoriteButton property_id={singleProperty.id} />
          
          {/* Replace koren */}
          <PrimaryButton onClick={handleBookingClick}>
            Booking
          </PrimaryButton>
        </div>
      </div>
      
      {/* ... baki code same thakbe ... */}
      
      <div className="my-4 lg:grid grid-cols-13 w-full ">
        <div className="col-span-10">
          <div className="">
            <Content
              galleryImage={data.images}
              videoUrl={data.video_url}
              GoogleMap={data.location}
              activeTab={activeTab}
            />
          </div>

          <div className="my-3 px-0 lg:px-4">
            <Details
              Property_id={singleProperty.property_uid}
              Size={singleProperty.land_area}
              Bedrooms={singleProperty.bedrooms}
              Bathrooms={singleProperty.bathrooms}
            />
          </div>
          <div className="my-12 px-0 lg:px-4">
            <Description Description={singleProperty.description} />
          </div>
          <div className="my-12 px-0 lg:px-4">
            <Address
              street={singleProperty.full_location}
              city={singleProperty.district.name}
              state={singleProperty.division.name}
              SubDistrict={singleProperty.sub_district.name}
              zip={singleProperty.zip_code}
              country={singleProperty.country.name}
            />
          </div>
          <div className="my-12 px-0 lg:px-4">
            <InfoMenu
              activeTabInfo={activeTabInfo}
              setActiveTabInfo={setActiveTabInfo}
            />
          </div>
          <div className="my-4 px-0 lg:px-4">
            <InfoContent
              Details={singleProperty}
              activeTabInfo={activeTabInfo}
            />
          </div>
        </div>

        <div className="col-span-3 w-full p-4">
          <RelatedProperties id={singleProperty.id} />
        </div>

        {/* Booking popup */}
        {bookingPopup && (
          <BookingModal
            property={singleProperty}
            onClose={() => setBookingPopup(false)}
          />
        )}
      </div>
    </MarginSection>
  );
}

export default Page;