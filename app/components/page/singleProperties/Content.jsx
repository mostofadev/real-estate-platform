"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Gallery from "./Gallery";
import Video from "./Video";
import MapComponent from "./Map";

function Content({ activeTab, galleryImage = [], videoUrl, GoogleMap }) {
  console.log("GoogleMap hh", GoogleMap);
  console.log("image gallery", galleryImage);
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
  let video_url = videoUrl;
  try {
    if (typeof videoUrl === "string") {
      video_url = JSON.parse(videoUrl);
    }
  } catch (error) {
    console.warn("Invalid JSON format in videoUrl:", error);
  }

  const fullImageUrls = galleryImage?.map(
    (img) => `${STORAGE_URL}${img.image_url}`
  );

  return (
    <div className="mt-4 p-2 lg:p-4">
      {activeTab === "gallery" && <Gallery images={fullImageUrls} />}

      {activeTab === "video" && (
        <div className="flex justify-center items-center w-full">
         {video_url ? <Video videoUrl={video_url} /> : "No video"}
          
        </div>
      )}
      {activeTab === "googleMap" && (
        <MapComponent GoogleMap={GoogleMap} />
      )}
    </div>
  );
}

export default Content;
