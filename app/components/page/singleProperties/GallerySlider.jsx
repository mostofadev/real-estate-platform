"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function GallerySlider({ Images = [], setMainImage }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        340: { slidesPerView: 2 },
        540: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      className="mt-6"
    >
      {Images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="cursor-pointer"
            onClick={() => setMainImage(img)}
          >
            {typeof img === "string" ? (
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ) : (
              <Image
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GallerySlider;
