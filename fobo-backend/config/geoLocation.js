const axios = require("axios");

async function geocodeLocation(locationName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

  const res = await axios.get(url, {
    headers: { "User-Agent": "YourAppName" }
  });

  if (res.data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    lat: parseFloat(res.data[0].lat),
    lng: parseFloat(res.data[0].lon)
  };
}

async function getDistanceTimeOSRM(pickupLat, pickupLng, dropLat, dropLng) {
  const url = `http://router.project-osrm.org/route/v1/driving/${pickupLng},${pickupLat};${dropLng},${dropLat}?overview=false`;

  const response = await axios.get(url);

  if (!response.data.routes || response.data.routes.length === 0) {
    throw new Error("Unable to calculate distance using OSRM");
  }

  const route = response.data.routes[0];

  return {
    distance: route.distance / 1000,   // meters → km
    duration: route.duration / 60      // seconds → minutes
  };
}

module.exports = {
  geocodeLocation,
  getDistanceTimeOSRM
};
