"use client";
import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import MarginSection from "@/app/components/sections/MarginSection";
import ContentMenu from "@/app/components/page/singleProperties/ContentMenu";
import Content from "@/app/components/page/singleProperties/Content";
import RelatedProperties from "@/app/components/page/singleProperties/RelatedProperties";
import Details from "@/app/components/page/singleProperties/Details";
import Description from "@/app/components/page/singleProperties/Description";
import Address from "@/app/components/page/singleProperties/Address";
import InfoMenu from "@/app/components/page/singleProperties/InfoMenu";
import InfoContent from "@/app/components/page/singleProperties/InfoContent";
import FavoriteButton from "@/app/components/page/singleProperties/FavoriteButton";
import PrimaryButton from "@/app/components/ui/button/Primary";

function Page() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [activeTabInfo, setActiveTabInfo] = useState("overview");

  return (
    <Layout>
      <MarginSection>
        <div className="my-4 flex justify-between items-center px-4">
          <ContentMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex gap-3">
            <FavoriteButton />
            <PrimaryButton>Booking</PrimaryButton>
          </div>
        </div>
        <div className="my-4 lg:grid grid-cols-13 w-full h-screen">
          <div className="col-span-10">
            <div className="">
              <Content activeTab={activeTab} />
            </div>

            <div className="my-3 px-4">
              <Details
                Property_id="5034"
                Size="200"
                Bedrooms="3"
                Bathrooms="3"
              />
            </div>
            <div className="my-12 px-4">
              <Description
                Description="This stunning property is located in the heart of the city, offering the perfect blend of modern luxury and convenience. From the moment you step inside, you are greeted with a spacious, light-filled interior that exudes elegance and comfort. The living areas are designed with an open floor plan, allowing for a seamless flow between the living room, dining area, and kitchen. High ceilings, large windows, and tasteful finishes create a warm and inviting atmosphere that makes you feel instantly at home.
The kitchen is a chef’s dream, featuring top-of-the-line appliances, ample counter space, and custom cabinetry. Whether you are preparing a casual meal or entertaining guests, this space offers functionality and style in equal measure. Each bedroom is generously sized, providing a private retreat with plenty of natural light and storage options. The bathrooms are modern and sleek, with premium fixtures, walk-in showers, and luxurious finishes that elevate the overall experience.
Outside, the property boasts beautifully landscaped gardens and a serene outdoor seating area, perfect for relaxing or hosting gatherings. The location is unbeatable, with easy access to schools, shopping centers, restaurants, and public transportation. You can enjoy all the amenities of city living while still having a peaceful and private sanctuary to call home."
              />
            </div>
            <div className="my-12 px-4">
              <Address
                street="123 Main St"
                city="Anytown"
                state="CA"
                zip="12345"
                country="USA"
              />
            </div>
            <div className="my-12 px-4">
              <InfoMenu
                activeTabInfo={activeTabInfo}
                setActiveTabInfo={setActiveTabInfo}
              />
            </div>
            <div className="my-4 px-4">
              <InfoContent activeTabInfo={activeTabInfo} />
            </div>
          </div>

          <div className="col-span-3  p-4">
            <RelatedProperties />
          </div>
        </div>
      </MarginSection>
    </Layout>
  );
}

export default Page;
