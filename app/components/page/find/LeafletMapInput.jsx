"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LeafletMapInput({ register, setValue, errors = {} }) {
  const initialLat = register.latitude?.value || 23.8103; // Default Dhaka
  const initialLng = register.longitude?.value || 90.4125;

  const [position, setPosition] = useState([initialLat, initialLng]);

  // Marker & map click event
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setValue("latitude", lat);
        setValue("longitude", lng);
      },
    });
    return <Marker position={position} />;
  }

  return (
    <div className="my-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Select Property Location
      </label>

      {/* Map container with z-0 to stay below navbar */}
      <div className="relative z-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <MapContainer
          center={position}
          zoom={12}
          style={{  width: "100%", zIndex: 0 }}
          zoomControl={true}
          className="lg:h-[900px] h-[400px]"
          scrollWheelZoom={true}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Optional: Display Lat/Lng */}
      <div className="flex gap-4 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Latitude</p>
          <p className="text-sm font-medium text-gray-800">
            {position[0].toFixed(6)}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Longitude</p>
          <p className="text-sm font-medium text-gray-800">
            {position[1].toFixed(6)}
          </p>
        </div>
      </div>

      {/* Display error if exists */}
      {errors.latitude && (
        <p className="text-red-500 text-xs mt-1">{errors.latitude.message}</p>
      )}
      {errors.longitude && (
        <p className="text-red-500 text-xs mt-1">{errors.longitude.message}</p>
      )}
    </div>
  );
}