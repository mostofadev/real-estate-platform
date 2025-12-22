import Layout from "@/app/components/layout/Layout";
import BlogPageItem from "@/app/components/page/blogPage/BlogPageItem";
import React from "react";
import ImageOne from "../../../public/Image/p1.png";
import ImageTwo from "../../../public/Image/p2.png";
import ImageThree from "../../../public/Image/p3.png";
import MarginSection from "@/app/components/sections/MarginSection";
function page() {
  return (
      <MarginSection>
        <div className="my-12">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <BlogPageItem />
        </div>
      </MarginSection>
  );
}

export default page;
