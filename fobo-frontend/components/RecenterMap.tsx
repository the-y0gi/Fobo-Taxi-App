"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function RecenterMap({ userLocation }: any) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(
        [userLocation.lat, userLocation.lng],
        map.getZoom(), // keep same zoom
        { animate: true }
      );
    }
  }, [userLocation]);

  return null;
}
