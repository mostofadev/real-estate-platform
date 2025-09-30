import React from "react";
import ImageOne from "../../../../public/Image/p1.png";
import ImageTwo from "../../../../public/Image/p2.png";
import ImageThree from "../../../../public/Image/p3.png";
import PropertieCard from "../../ui/card/PropertieCard";
function RelatedProperties() {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      price: "$1,200,000",
      location: "New York, NY",
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: ImageOne,
    },
    {
      id: 2,
      title: "Cozy Cottage",
      price: "$850,000",
      location: "Los Angeles, CA",
      bedrooms: 2,
      bathrooms: 1,
      area: 800,
      image: ImageTwo,
    },
    {
      id: 3,
      title: "Luxury Villa",
      price: "$3,500,000",
      location: "Miami, FL",
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      image: ImageThree,
    },
    {
      id: 4,
      title: "Downtown Condo",
      price: "$2,000,000",
      location: "Chicago, IL",
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      image: ImageOne,
    },
    {
      id: 5,
      title: "Suburban House",
      price: "$1,500,000",
      location: "Austin, TX",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: ImageTwo,
    },
    {
      id: 6,
      title: "Beachfront Bungalow",
      price: "$2,200,000",
      location: "Malibu, CA",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: ImageThree,
    }
  ];
  return (
    <div>
      {properties.map((property) => (
        <PropertieCard key={property.id} properties={property} />
      ))}
    </div>
  );
}

export default RelatedProperties;
