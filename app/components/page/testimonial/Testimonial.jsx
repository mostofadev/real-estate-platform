import React from "react";
import SectionTitle from "../../ui/section/SectionTitle";
import TestimonialItems from "./TestimonialItems";
import MarginSection from "../../sections/MarginSection";

function Testimonial() {
  return (
    <div className="my-20">
      <MarginSection>
        <SectionTitle
          title={"What our customers are saying us?"}
          description={""}
        />
        <TestimonialItems />
      </MarginSection>
    </div>
  );
}

export default Testimonial;
