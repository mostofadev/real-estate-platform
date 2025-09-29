import React from "react";
import MarginSection from "../../sections/MarginSection";
import SectionTitle from "../../ui/section/SectionTitle";
import ProperticesItems from "./ProperticesItems";

function FeaturedProperties() {
  return (
    <div className="my-4">
      <MarginSection>
        <SectionTitle
          title={"Homes For You"}
          description={"Based on your view history"}
        />
        <ProperticesItems />
      </MarginSection>
    </div>
  );
}

export default FeaturedProperties;
