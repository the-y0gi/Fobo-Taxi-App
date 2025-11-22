"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically load react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);

const RecenterMap = dynamic(
  () => import("./RecenterMap"),
  { ssr: false }
);

export default function Map({ userLocation, dropLocation, routeCoords }: any) {
  useEffect(() => {
    // Fix icons only on client
    (async () => {
      const L = await import("leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer
      center={
        userLocation
          ? [userLocation.lat, userLocation.lng]
          : [18.5204, 73.8567]
      }
      zoom={15}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Base Map */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Recenter Map */}
      <RecenterMap userLocation={userLocation} />

      {/* USER (PICKUP) MARKER */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>
      )}
            {/* DROP MARKER */}
      {dropLocation && (
        <Marker position={[dropLocation.lat, dropLocation.lng]}>
          <Popup>Drop Location</Popup>
        </Marker>
      )}

      {/* ROUTE POLYLINE */}
      {routeCoords?.length > 0 && (
        <Polyline
          positions={routeCoords.map((p: any) => [p[1], p[0]])} // [lat, lng]
          pathOptions={{ color: "blue", weight: 5 }}
        />
      )}
    </MapContainer>
  );
}
