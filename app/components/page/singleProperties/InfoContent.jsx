import React from "react";
import PropertyDetailsTable from "./PropertyDetailsTable";
import InfoFeatures from "./InfoFeatures";

function InfoContent({ activeTabInfo }) {
    const featureLabels = [
  "Air Conditioning",
  "Central Heating",
  "Fire Alarm",
  "Home Theater",
  "Laundry",
  "Laundry Room",
  "Sauna",
  "WiFi",
];
  return (
    <div>
      <div className="mt-4 p-2 lg:p-4">
        {activeTabInfo === "overview" && (
          <div>
            <PropertyDetailsTable
              details={[
                { label: "Property ID", value: "663" },
                { label: "Price", value: "$1 M" },
                { label: "Property Type", value: "Restaurant" },
                { label: "Property Status", value: "For Rent" },
                { label: "Bedrooms", value: "4" },
                { label: "Bathrooms", value: "3" },
                { label: "Year Built", value: "2010" },
                { label: "Size", value: "200 SqFt" },
                { label: "Land Area", value: "500 SqFt" },
                { label: "Garages", value: "1" },
                { label: "Garage Size", value: "40 SqFt" },
              ]}
            />
          </div>
        )}

        {activeTabInfo === "features" && (
          <div className="flex justify-center items-center w-full ">
             <InfoFeatures labels={featureLabels} />
          </div>
        )}

        {activeTabInfo === "virtualTour" && (
          <div className="flex justify-center items-center w-full ">
            <Map MapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903547322509!2d90.39146351429718!3d23.75088589462233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf56c23bfb6b%3A0x39b3e88e5aa8f52b!2sDhaka!5e0!3m2!1sen!2sbd!4v1614312041211!5m2!1sen!2sbd" />
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoContent;
