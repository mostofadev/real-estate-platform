import React from "react";
import SectionTitle from "../../ui/section/SectionTitle";
import LocationItems from "./LocationItems";

function LocationHome() {
  return (
    <section className="container mx-auto px-4 py-20  lg:mt-[12px] mt-[320px]">
      <SectionTitle
        title="Find Properties in These Cities"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <LocationItems />
    </section>
  );
}

export default LocationHome;
