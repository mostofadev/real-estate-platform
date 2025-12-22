"use client";
import { useEffect } from "react";

export default function Step4Map({ setValue, values }) {
  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 23.8103, lng: 90.4125 },
      zoom: 10,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: 23.8103, lng: 90.4125 },
      map,
      draggable: true,
    });

    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      setValue("latitude", pos.lat().toString());
      setValue("longitude", pos.lng().toString());
    });

    if (values.latitude && values.longitude) {
      const pos = { lat: parseFloat(values.latitude), lng: parseFloat(values.longitude) };
      marker.setPosition(pos);
      map.setCenter(pos);
    }
  }, [setValue, values]);

  return (
    <div>
      <label>Select Product Location</label>
      <div id="map" className="w-full h-64 border mb-2"></div>
      <p>Latitude: {values.latitude || "Not selected"}, Longitude: {values.longitude || "Not selected"}</p>
    </div>
  );
}
