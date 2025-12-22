"use client";

import React from "react";
import TestimonialCard from "../../ui/card/TestimonialCard";

import LocationImage from "../../../../public/Image/location.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useHomePageTestimonial } from "@/app/hooks/useHomePage";
import PageLoading from "../../ui/loader/PageLoading";
function TestimonialItems() {
  const { data, isLoading } = useHomePageTestimonial();
  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          340: { slidesPerView: 1 },
          540: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mt-6"
      >
        {(data ?? []).map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default TestimonialItems;
