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
import { useHomePageBlog } from "@/app/hooks/useHomePage";
import PageLoading from "../../ui/loader/PageLoading";

function BlogItems() {
  const { data, isLoading } = useHomePageBlog();
  if (isLoading) {
    return <PageLoading />;
  }
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No Blog Data</p>;
  }
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
      {(data ?? []).map((blog) => (
        <SwiperSlide key={blog.id}>
          <BlogCard blog={blog} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BlogItems;
