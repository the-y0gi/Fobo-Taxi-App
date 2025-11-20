"use client";

import { useState } from "react";

export default function useGeoSearch() {
  const [results, setResults] = useState<any[]>([]);

  const searchLocation = async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    try {
      // Nominatim public API (frontend usage OK for dev; you can proxy via backend later)
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        query
      )}&limit=6`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      console.error("Geo search error:", err);
      setResults([]);
    }
  };

  return { results, searchLocation, setResults };
}
