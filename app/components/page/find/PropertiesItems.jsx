

"use client";
import ImageOne from "../../../../public/Image/p1.png";
import ImageTwo from "../../../../public/Image/p2.png";
import ImageThree from "../../../../public/Image/p3.png";
import React from "react";
import PropertieCard from '../../ui/card/PropertieCard';



export default function PropertiesItems() {
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
    <div className="grid grid-cols-13 w-full h-screen">
      {/* Google Map Section */}
      <div className="col-span-7 h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902694021483!2d90.41251811543148!3d23.81033298456019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b045676789%3A0x1c4dbf6f1b0f5c8f!2sDhaka!5e0!3m2!1sen!2sbd!4v1696000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Product List Section */}
      <div className="col-span-6  h-full grid grid-cols-2 p-4 gap-3 my-2 overflow-y-auto bg-gray-100">
         {properties.map((property) => (
          <PropertieCard key={property.id} properties={property} />
        ))}
      </div>
    </div>
  );
}
