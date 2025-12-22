"use client";

import React from "react";
import LocationImage from "../../../../public/Image/location.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LocationCard from "../../ui/card/LocationCard";
import { useHomePageCity } from "@/app/hooks/useHomePage";
import PageLoading from "../../ui/loader/PageLoading";

function LocationItems() {
  const locations = [
    { id: 1, name: "New York", properties: "350", image: LocationImage },
    { id: 2, name: "Los Angeles", properties: "250", image: LocationImage },
    { id: 3, name: "Chicago", properties: "200", image: LocationImage },
    { id: 4, name: "Houston", properties: "150", image: LocationImage },
    { id: 5, name: "Miami", properties: "100", image: LocationImage },
    { id: 6, name: "San Francisco", properties: "300", image: LocationImage },
    { id: 7, name: "Boston", properties: "180", image: LocationImage },
    { id: 8, name: "Seattle", properties: "220", image: LocationImage },
    { id: 9, name: "Atlanta", properties: "140", image: LocationImage },
    { id: 10, name: "Dallas", properties: "190", image: LocationImage },
    { id: 11, name: "Philadelphia", properties: "210", image: LocationImage },
    { id: 12, name: "Las Vegas", properties: "160", image: LocationImage },
  ];
  const { data: cityData, isLoading } = useHomePageCity();
  console.log("city data", cityData);
  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <div className="w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          340: { slidesPerView: 2 },
          540: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="mt-6"
      >
        <div className="w-full">
          {cityData.map((location) => (
            <SwiperSlide key={location.id}>
              <LocationCard location={location} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default LocationItems;
