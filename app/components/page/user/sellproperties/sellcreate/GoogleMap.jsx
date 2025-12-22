"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import TextInput from "@/app/components/ui/formAction/TextInput";

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
  const [position, setPosition] = useState([23.8103, 90.4125]); // Default Dhaka

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
    <div className="my-12">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Property Location
      </label>

      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      {/* Hidden Inputs */}
      <div className="my-3 flex gap-4">
        <TextInput
          type="number"
          label="Latitude"
          step="any"
          placeholder="Latitude"
          {...register("latitude", { valueAsNumber: true })}
          error={errors.latitude?.message}
        />
        <TextInput
          type="number"
          label="Longitude"
          step="any"
          placeholder="Longitude"
          {...register("longitude", { valueAsNumber: true })}
          error={errors.longitude?.message}
        />
      </div>
      {/* Errors */}
      {errors.latitude && (
        <p className="text-red-500 text-xs mt-1">{errors.latitude.message}</p>
      )}
    </div>
  );
}
