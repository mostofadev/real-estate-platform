import Layout from "@/app/components/layout/Layout";
import BlogPageItem from "@/app/components/page/blogPage/BlogPageItem";
import React from "react";
import ImageOne from "../../../public/Image/p1.png";
import ImageTwo from "../../../public/Image/p2.png";
import ImageThree from "../../../public/Image/p3.png";
import MarginSection from "@/app/components/sections/MarginSection";
function page() {
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
    <Layout>
      <MarginSection>
        <div className="my-12">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <BlogPageItem blogs={blogs} />
        </div>
      </MarginSection>
    </Layout>
  );
}

export default page;
