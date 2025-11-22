"use client";

import { useState, useRef } from "react";

export default function useGeoSearch() {
  const [results, setResults] = useState<any[]>([]);
  const timeoutRef = useRef<any>(null);

  const searchLocation = (query: string) => {
    // Clear previous debounce
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // DEBOUNCE (wait 350ms after user stops typing)
    timeoutRef.current = setTimeout(async () => {
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          query
        )}&limit=6`;

        const res = await fetch(url, {
          headers: {
            "User-Agent": "FoboTaxiApp/1.0 (contact@example.com)", // REQUIRED
            "Accept-Language": "en",
          },
        });

        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error("Geo search error:", err);
        setResults([]);
      }
    }, 350);
  };

  // ⭐ REVERSE GEOCODE
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "FoboTaxiApp/1.0 (contact@example.com)", 
          "Accept-Language": "en",
        },
      });

      const data = await res.json();
      return data.display_name || "";
    } catch (err) {
      console.error("Reverse geocode error:", err);
      return "";
    }
  };

  return { results, searchLocation, setResults, reverseGeocode };
}
