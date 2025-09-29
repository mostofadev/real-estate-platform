import React from "react";
import MarginSection from "../../sections/MarginSection";
import SectionTitle from "../../ui/section/SectionTitle";
import BlogItems from "./BlogItems";

function Blog() {
  return (
    <div className="my-12">
      <MarginSection>
        <SectionTitle title={"Resent Blog"} />
        <BlogItems />
      </MarginSection>
    </div>
  );
}

export default Blog;
