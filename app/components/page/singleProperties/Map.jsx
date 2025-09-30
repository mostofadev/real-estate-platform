import React from "react";

export default function Map({ MapUrl }) {
  return (
    <iframe
      src={MapUrl}
      className="w-full h-[300px] lg:h-[800px] rounded-lg shadow-md"
      allowFullScreen
      loading="lazy"
      title="Google Map"
    ></iframe>
  );
}
