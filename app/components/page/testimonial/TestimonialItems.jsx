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
function TestimonialItems() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      profession: "CEO, Company A",
      description:
        "Mostofa Kamal did an amazing job on our website. Highly recommend!",
      Image: "/Image/location.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      profession: "Founder, Startup B",
      description:
        "The website looks professional and increased our client trust.",
      Image: "/Image/location.png",
    },
    {
      id: 3,
      name: "Mike Johnson",
      profession: "Manager, Business C",
      description: "Fast, reliable, and very creative work. Loved the design!",
      Image: "/Image/location.png",
    },
    {
      id: 4,
      name: "Sara Williams",
      profession: "Designer, Creative Studio",
      description: "Highly skilled developer, delivered everything on time!",
          Image: "/Image/location.png", 

    },
  ];

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
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default TestimonialItems;
