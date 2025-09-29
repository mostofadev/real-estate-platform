"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageOne from "../../../../public/Image/p1.png";
import ImageTwo from "../../../../public/Image/p2.png";
import ImageThree from "../../../../public/Image/p3.png";
import BlogCard from "../../ui/card/BlogCard";

function BlogItems() {
const blogs = [
  {
    id: 1,
    image: ImageOne,
    date: "Sep 20, 2025",
    author: "John Doe",
    location: "New York, USA",
    title: "Luxury Apartment in the Heart of the City",
  },
  {
    id: 2,
    image: ImageTwo,
    date: "Sep 22, 2025",
    author: "Jane Smith",
    location: "Los Angeles, USA",
    title: "Modern Villa with Ocean View",
  },
  {
    id: 3,
    image: ImageThree,
    date: "Sep 25, 2025",
    author: "Michael Johnson",
    location: "Chicago, USA",
    title: "Affordable Family Home in a Prime Location",
  },
  {
    id: 4,
    image: ImageOne,
    date: "Sep 27, 2025",
    author: "Sarah Williams",
    location: "Houston, USA",
    title: "Spacious House with Private Garden",
  },
  {
    id: 5,
    image: ImageOne,
    date: "Sep 27, 2025",
    author: "Sarah Williams",
    location: "Houston, USA",
    title: "Spacious House with Private Garden",
  },
  {
    id: 6,
    image: ImageOne,
    date: "Sep 27, 2025",
    author: "Sarah Williams",
    location: "Houston, USA",
    title: "Spacious House with Private Garden",
  },
];


  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      pagination={{ clickable: true }}
      className="mt-6"
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id}>
          <BlogCard blog={blog} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BlogItems;
