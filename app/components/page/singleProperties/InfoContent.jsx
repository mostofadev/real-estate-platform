import React from "react";
import PropertyDetailsTable from "./PropertyDetailsTable";
import InfoFeatures from "./InfoFeatures";

function InfoContent({ activeTabInfo, Details }) {
  console.log("details fea", Details.features);
  const DetailsFeatures = Details.features;
  console.log();
  
  return (
    <div>
      <div className="mt-4 p-2 lg:p-4">
        {activeTabInfo === "overview" && (
          <div>
            <PropertyDetailsTable
              details={[
                { label: "Property ID", value: Details.property_uid },
                { label: "Price", value: Details.price },
                { label: "Property Category", value: Details.category.name },
                { label: "Property Type", value: Details.type.name },
                { label: "Bedrooms", value: Details.bedrooms },
                { label: "Bathrooms", value: Details.bathrooms },
                { label: "Year Built", value: Details.years_build },
                { label: "Land Area", value: Details.land_area },
                { label: "Garages", value: Details.garages ? "Yes" : "No" },
                { label: "Garage Size", value: Details.garage_size },
              ]}
            />
          </div>
        )}

        {activeTabInfo === "features" && (
          <div className="flex justify-center items-center w-full ">
            {Array.isArray(DetailsFeatures) && DetailsFeatures.length > 0 ? (
              DetailsFeatures.map((item) => (
                <InfoFeatures key={item.id} labels={item.name} />
              ))
            ) : (
              <p className="text-gray-500 font-medium">No Feature</p>
            )}
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
