"use client";

import React, { useEffect, useState } from "react";

// Leaflet CSS client-side import
if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css");
}

export default function MapComponent({ GoogleMap }) {
  console.log('GoogleMap',GoogleMap);
  
  const [leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Leaflet import
      import("leaflet").then((L) => {
        // Default icon override
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      });

      // React Leaflet import
      import("react-leaflet").then((mod) => {
        setLeaflet({
          MapContainer: mod.MapContainer,
          TileLayer: mod.TileLayer,
          Marker: mod.Marker,
          Popup: mod.Popup,
        });
      });
    }
  }, []);

  // Loader
  if (!leaflet)
    return <p className="text-center text-gray-500">🗺️ Loading map...</p>;

  // Data validation
  if (!GoogleMap || !GoogleMap.latitude || !GoogleMap.longitude)
    return <p className="text-center text-gray-500">No map data available</p>;

  const lat = parseFloat(GoogleMap.latitude);
  const lng = parseFloat(GoogleMap.longitude);

  if (isNaN(lat) || isNaN(lng))
    return <p className="text-center text-red-500">Invalid map coordinates</p>;

  const { MapContainer, TileLayer, Marker, Popup } = leaflet;

  return (
    <div className="w-full h-[400px] lg:h-[800px] relative z-0 overflow-hidden rounded-lg">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]}>
          <Popup>📍 Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
