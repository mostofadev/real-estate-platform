import Image from "next/image";
import React from "react";
import ImageAbout from "../../../../public/Image/section.png";
import PrimaryButton from "../../ui/button/Primary";
import { FaArrowRight } from "react-icons/fa";
import MarginSection from "../../sections/MarginSection";

function HomeAbout() {
  return (
    <div className=" ,my-5 lg:my-42">
      <MarginSection>
        <div className="flex justify-center items-center my-4 px-5 lg:my-20 lg:px-40 flex-col lg:flex-row">
          <div className="w-full rounded-lg ">
            <Image
              src={ImageAbout}
              alt="Property Image"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className=" ">
            <h2 className="text-5xl my-4 ">Local expertise for luxury homes</h2>
            <p className="text-[12px] my-4">
              Pellentesque egestas elementum faucibus sem. Velit nunc egestas ut
              morbi. Leo diam nibh eget fermentum massa pretium. Mi mauris nulla
              ac dictum ut mauris non. Egestas ac consequat sit amet mattis
              tortor. Integer a sapien vel felis tincidunt tempor. Curabitur
              blandit magna a erat volutpat.
            </p>
            <PrimaryButton Icon={<FaArrowRight className="text-white" />}>
              Learn More
            </PrimaryButton>
          </div>
        </div>
      </MarginSection>
    </div>
  );
}

export default HomeAbout;
