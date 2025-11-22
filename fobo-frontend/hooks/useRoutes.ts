"use client";

export default function useRoute() {
  const getRoute = async (start: any, end: any) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.routes || data.routes.length === 0) return null;

         return {
      coords: data.routes[0].geometry.coordinates,
      distance: data.routes[0].distance / 1000, // convert meters → km
    }; // [lng, lat] array
    } catch (err) {
      console.error("Route fetch error:", err);
      return null;
    }
  };

  return { getRoute };
}
