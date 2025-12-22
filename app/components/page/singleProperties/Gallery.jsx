import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Gallery({ images = [] }) {
  const validImages = images.filter((img) => img && img.trim() !== "");
  const [mainImage, setMainImage] = React.useState(validImages[0] || null);

  if (validImages.length === 0) {
    return <p className="text-center text-gray-500">No images available</p>;
  }

  return (
    <div className="w-full">
      {/* ✅ Main Image */}
      <div className="mb-4 w-full">
        {mainImage ? (
          <Zoom>
            <img
              src={mainImage}
              alt="Main Image"
              className="rounded-lg w-full h-[400px] md:h-[600px] object-cover shadow-md"
            />
          </Zoom>
        ) : (
          <p className="text-center text-gray-500">No main image selected</p>
        )}
      </div>

      {/* ✅ Thumbnail List */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 w-full">
        {validImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery image ${index + 1}`}
            className={`cursor-pointer rounded-lg w-full h-32 md:h-40 object-cover transition-all duration-300 hover:scale-[1.02] ${
              img === mainImage ? "ring-4 ring-blue-500" : ""
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
