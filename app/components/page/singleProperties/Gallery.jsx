"use client";
import Image from "next/image";
import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import GallerySlider from "./GallerySlider";

export default function Gallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="mb-4 w-full flex justify-center">
        <Zoom>
          <Image
            src={mainImage}
            alt="Main"
            className="w-full h-[300px] lg:h-[800px] object-cover rounded-lg shadow-md"
          />
        </Zoom>
      </div>

      {/* Thumbnail List */}
      <div className="w-full">
        <GallerySlider Images={images} setMainImage={setMainImage} />
      </div>
    </div>
  );
}
