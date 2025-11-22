
"use client";

import { driverTrips } from "@/lib/dummy/trips";
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  IndianRupee,
} from "lucide-react";

export function UserHistory({ user }: any) {
  const history = driverTrips.filter(
    (t) => t.userName.toLowerCase() === user.name.toLowerCase()
  );

  return (
    <div className="space-y-3">
      {history.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          No ride history found for this user.
        </p>
      ) : (
        history.map((trip) => (
          <div
            key={trip.id}
            className="border border-gray-200 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">
                Trip #{trip.tripId}
              </p>

              <span
                className={`px-2 py-0.5 text-xs rounded-full font-medium border ${
                  trip.status === "completed"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {trip.status}
              </span>
            </div>

            {/* DRIVER */}
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-primary" />
              <p className="text-sm text-gray-700">
                <span className="text-gray-500">Driver:</span>{" "}
                <span className="font-medium">{trip.driverName}</span>
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-2">
              {/* Pickup */}
              <div className="bg-gray-50 p-2 rounded-lg border flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[11px] text-gray-500">Pickup</p>
                  <p className="text-sm font-medium text-gray-800">
                    {trip.pickup}
                  </p>
                </div>
              </div>

              {/* Drop */}
              <div className="bg-gray-50 p-2 rounded-lg border flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-[11px] text-gray-500">Drop</p>
                  <p className="text-sm font-medium text-gray-800">
                    {trip.drop}
                  </p>
                </div>
              </div>

              {/* Distance */}
              <div className="bg-gray-50 p-2 rounded-lg border flex items-start gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-[11px] text-gray-500">Distance</p>
                  <p className="text-sm font-medium text-gray-800">
                    {trip.distanceKm} km
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-gray-50 p-2 rounded-lg border flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-[11px] text-gray-500">Duration</p>
                  <p className="text-sm font-medium text-gray-800">
                    {trip.durationMinutes} min
                  </p>
                </div>
              </div>
            </div>

            {/* AMOUNT */}
            <div className="mt-3 flex justify-between items-center p-2 border rounded-lg bg-primary/10">
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="text-base font-semibold text-green-700 flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {trip.amount}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
