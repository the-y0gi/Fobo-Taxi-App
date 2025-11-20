"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuggestionList from "@/components/SuggestionList";
import Map from "@/components/Map";

import useGeoSearch from "@/hooks/useGeoSearch";
import { useState } from "react";

export default function UserDashboard() {
  const [members, setMembers] = useState("");
  const [userLocation, setUserLocation] = useState<any>(null);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  // Geo hooks
  const {
    results: pickupResults,
    searchLocation: searchPickup,
    setResults: setPickupResults,
  } = useGeoSearch();

  const {
    results: dropResults,
    searchLocation: searchDrop,
    setResults: setDropResults,
  } = useGeoSearch();

  // Select pickup
  const handleSelectPickup = (item: any) => {
    setPickup(item.display_name);
    setPickupResults([]);
    setUserLocation({ lat: item.lat, lng: item.lon });
  };

  // Select drop
  const handleSelectDrop = (item: any) => {
    setDrop(item.display_name);
    setDropResults([]);
  };

  // Share current location
  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Convert to "Street, City"
        setPickup(`${latitude}, ${longitude}`);

        // You can do reverse geocoding later
      },
      () => alert("Unable to fetch location")
    );
  };

  return (
    <div className="min-h-screen w-full relative bg-gray-100">

      {/* MAP */}
      <div className="w-full h-[60vh] relative">
        <Map userLocation={userLocation} />

        <Button
          onClick={shareLocation}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow z-[999]"
        >
          Share current location
        </Button>
      </div>

      {/* INPUT SECTION */}
      <div className="absolute bottom-20 left-0 w-full px-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3 border border-gray-200">

          {/* PICKUP */}
          <Input
            placeholder="Enter pickup"
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              searchPickup(e.target.value);
            }}
            className="h-12"
          />

          <SuggestionList
            results={pickupResults}
            onSelect={handleSelectPickup}
          />

          {/* DROP */}
          <Input
            placeholder="Enter drop"
            value={drop}
            onChange={(e) => {
              setDrop(e.target.value);
              searchDrop(e.target.value);
            }}
            className="h-12"
          />

          <SuggestionList
            results={dropResults}
            onSelect={handleSelectDrop}
          />

          {/* MEMBERS */}
          <Input
            placeholder="Members"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* BOTTOM BUTTONS */}
      {members.trim() !== "" && (
        <div className="fixed bottom-0 w-full bg-white border-t flex justify-between items-center px-6 py-3 shadow-lg rounded-t-2xl">
          
          <Button
            variant="outline"
            className="w-[40%] h-11 border-gray-400 rounded-full"
          >
            Back
          </Button>

          <Button className="w-[55%] h-11 bg-purple-600 text-white rounded-full">
            Calculate fare
          </Button>

        </div>
      )}
    </div>
  );
}
