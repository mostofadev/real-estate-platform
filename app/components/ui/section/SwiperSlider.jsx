"use client";

import React, { Children } from "react";
import LocationImage from "../../../../public/Image/location.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LocationCard from "../../ui/card/LocationCard";

function SwiperSlider({Children}) {
  
  return (
    <div className="w-full py-3">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          340: { slidesPerView: 2},
          540: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="mt-6"
      >
        {Children}
        {/* {locations.map((location) => (
          <SwiperSlide key={location.id}>
            <LocationCard location={location} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </div>
  );
}

export default SwiperSlider;
