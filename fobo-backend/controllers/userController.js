const {
  geocodeLocation,
  getDistanceTimeOSRM,
} = require("../config/geoLocation");

function calculateFare(distance, duration, vehicleType, memberCount) {
  let baseFare = 50;
  let perKm = 12;

  if (vehicleType === "auto") perKm = 10;
  if (vehicleType === "premium") perKm = 18;

  if (memberCount > 4) {
    baseFare += 30;
  }

  const totalFare = baseFare + distance * perKm;

  return Math.round(totalFare);
}

const estimateRideFare = async (req, res) => {
  try {
    const { pickup, drop, vehicleType, memberCount } = req.body;

    if (!pickup || !drop || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Pickup, drop & vehicleType required",
      });
    }

    let pickupLat, pickupLng, dropLat, dropLng;

    if (typeof pickup === "string") {
      const geo = await geocodeLocation(pickup);
      pickupLat = geo.lat;
      pickupLng = geo.lng;
    } else {
      pickupLat = pickup.lat;
      pickupLng = pickup.lng;
    }

    if (typeof drop === "string") {
      const geo = await geocodeLocation(drop);
      dropLat = geo.lat;
      dropLng = geo.lng;
    } else {
      dropLat = drop.lat;
      dropLng = drop.lng;
    }

    const { distance, duration } = await getDistanceTimeOSRM(
      pickupLat,
      pickupLng,
      dropLat,
      dropLng
    );

    const fare = calculateFare(distance, duration, vehicleType, memberCount);

    return res.json({
      success: true,
      data: {
        pickup: { pickupLat, pickupLng },
        drop: { dropLat, dropLng },
        distance: distance.toFixed(2),
        duration: Math.round(duration),
        totalFare: fare,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  estimateRideFare,
};
