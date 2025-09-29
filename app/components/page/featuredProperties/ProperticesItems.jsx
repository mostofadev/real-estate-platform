import React from "react";
import PropertieCard from "../../ui/card/PropertieCard";
import ImageOne from "../../../../public/Image/p1.png";
import ImageTwo from "../../../../public/Image/p2.png";
import ImageThree from "../../../../public/Image/p3.png";
import Link from "next/link";
function ProperticesItems() {
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
    },
    {
      id: 7,
      title: "Mountain Cabin",
      price: "$950,000",
      location: "Denver, CO",
      bedrooms: 3,
      bathrooms: 2,
      area: 1400,
      image: ImageTwo,
    },
    {
      id: 8,
      title: "Urban Loft",
      price: "$1,800,000",
      location: "San Francisco, CA",
      bedrooms: 2,
      bathrooms: 2,
      area: 1600,
      image: ImageOne,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <PropertieCard key={property.id} properties={property} />
        ))}
      </div>

      <div className="my-12  text-right  ">
        <Link className="text-gray-700 py-2 px-6 border border-[0.5px] border-gray-200" href="/find">Load more</Link>
      </div>
    </div>
  );
}

export default ProperticesItems;
