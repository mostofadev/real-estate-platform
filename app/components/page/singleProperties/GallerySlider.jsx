"use client";

import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
function GallerySlider({Images,setMainImage}) {
  

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          340: { slidesPerView: 2 },
          540: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
        className="mt-6"
      >
        {Images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex gap-4">
              <Image
                key={idx}
                src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setMainImage(img)}
                />
             
            </div>
          </SwiperSlide>
         ))}
      </Swiper>
    </>
  );
}

export default GallerySlider;
