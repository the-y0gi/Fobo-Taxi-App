"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drivers } from "@/lib/dummy/drivers";
import { driverTrips } from "@/lib/dummy/trips";
import {
  IndianRupee,
  Navigation,
  Clock,
  User,
  Car,
  MapPin,
} from "lucide-react";

export default function DailyView() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {drivers.map((driver) => {
        const trips = driverTrips.filter((t) => t.driverId === driver.id);
        const totalEarnings = trips.reduce((sum, trip) => sum + trip.amount, 0);

        return (
          <Card
            key={driver.id}
            className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white flex flex-col"
          >
            {/* Driver Header Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img
                  src={driver.profileImage}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100"
                  alt={driver.name}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    driver.status === "online"
                      ? "bg-green-500"
                      : driver.status === "on-ride"
                      ? "bg-blue-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {driver.name}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary text-xs font-medium"
                  >
                    {driver.employeeId}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Car className="w-4 h-4" />
                    <span>
                      {driver.vehicle.name} {driver.vehicle.model} ·{" "}
                      {driver.vehicle.numberPlate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trips Section  */}
            <div className="flex-grow space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  Today's Trips
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {trips.length} trips
                </Badge>
              </div>

              {trips.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <Navigation className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No trips for today</p>
                </div>
              ) : (
                <div className="max-h-60 min-h-[160px] overflow-y-auto space-y-3 pr-1.5 border border-gray-200 rounded-lg p-2 bg-gray-50/30">
                  {trips.map((trip) => (
                    <Card
                      key={trip.id}
                      className="p-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                    >
                      <div className="space-y-3">
                        {/* Name + Trip ID */}
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">
                            {trip.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            #{trip.tripId}
                          </p>
                        </div>

                        {/* Pickup + Drop */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-primary" /> Pickup
                            </p>
                            <div className="bg-gray-50 rounded-md p-1.5 mt-1 border border-gray-100">
                              <p className="text-xs text-gray-700">
                                {trip.pickup}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-primary" /> Drop
                            </p>
                            <div className="bg-gray-50 rounded-md p-1.5 mt-1 border border-gray-100">
                              <p className="text-xs text-gray-700">
                                {trip.drop}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Distance + Duration */}
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="text-center flex-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {trip.distanceKm} km
                            </p>
                            <p className="text-[10px] text-gray-600">
                              Distance
                            </p>
                          </div>

                          <div className="w-px h-6 bg-blue-200"></div>

                          <div className="text-center flex-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {trip.durationMinutes} min
                            </p>
                            <p className="text-[10px] text-gray-600">
                              Duration
                            </p>
                          </div>
                        </div>

                        {/* Payment Row */}
                        <div className="flex justify-between items-center pt-1">
                          <p className="text-xs text-gray-500">
                            Payment: {trip.paymentId}
                          </p>
                          <p className="font-semibold text-green-700 text-sm flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" /> {trip.amount}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t-2 border-blue-100 my-3" />

            {/* TODAY SUMMARY */}
            <div className="mt-auto p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center space-y-1">
                  <p className="text-[11px] text-gray-600 font-medium">
                    Earnings
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalEarnings}
                  </p>
                </div>

                <div className="w-px h-12 bg-primary/50"></div>

                <div className="flex-1 text-center space-y-1">
                  <p className="text-[11px] text-gray-600 font-medium">
                    Ride Time
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {driver.workingToday.rideTime}
                  </p>
                </div>

                <div className="w-px h-12 bg-primary/50"></div>

                <div className="flex-1 text-center space-y-1">
                  <p className="text-[11px] text-gray-600 font-medium">
                    Active
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {driver.workingToday.activeTime}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}


// //api integrate code


// "use client";

// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { adminService } from "@/api/adminService";
// import {
//   IndianRupee,
//   Navigation,
//   Clock,
//   User,
//   Car,
//   MapPin,
// } from "lucide-react";

// export default function DailyView() {
//   const [dailyData, setDailyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDailyTrips();
//   }, []);

//   const fetchDailyTrips = async () => {
//     try {
//       const response = await adminService.trips.getDailyTrips();
//       setDailyData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching daily trips:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//       {dailyData.map((driver) => (
//         <Card
//           key={driver.id}
//           className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white flex flex-col"
//         >
//           {/* Driver Header Section */}
//           <div className="flex items-start gap-4 mb-6">
//             <div className="relative">
//               <img
//                 src={driver.profileImage || "/default-driver.png"}
//                 className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100"
//                 alt={driver.name}
//                 onError={(e) => {
//                   e.target.src = "/default-driver.png";
//                 }}
//               />
//               <div
//                 className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
//                   driver.status === "online"
//                     ? "bg-green-500"
//                     : driver.status === "on-ride"
//                     ? "bg-blue-500"
//                     : "bg-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-2">
//                 <h2 className="text-lg font-semibold text-gray-900 truncate">
//                   {driver.name}
//                 </h2>
//                 <Badge
//                   variant="secondary"
//                   className="bg-primary/10 text-primary text-xs font-medium"
//                 >
//                   {driver.employeeId}
//                 </Badge>
//               </div>

//               <div className="space-y-1 text-sm text-gray-600">
//                 <div className="flex items-center gap-1.5">
//                   <User className="w-4 h-4" />
//                   <span>{driver.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <Car className="w-4 h-4" />
//                   <span>
//                     {driver.vehicle.name} {driver.vehicle.model} ·{" "}
//                     {driver.vehicle.numberPlate}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Trips Section */}
//           <div className="flex-grow space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                 <Navigation className="w-4 h-4 text-primary" />
//                 Today's Trips
//               </h3>
//               <Badge
//                 variant="secondary"
//                 className="bg-primary/10 text-primary"
//               >
//                 {driver.trips.length} trips
//               </Badge>
//             </div>

//             {driver.trips.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
//                 <Navigation className="w-12 h-12 text-gray-300 mb-3" />
//                 <p className="text-gray-500 text-sm">No trips for today</p>
//               </div>
//             ) : (
//               <div className="max-h-60 min-h-[160px] overflow-y-auto space-y-3 pr-1.5 border border-gray-200 rounded-lg p-2 bg-gray-50/30">
//                 {driver.trips.map((trip) => (
//                   <Card
//                     key={trip.id}
//                     className="p-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
//                   >
//                     <div className="space-y-3">
//                       {/* Name + Trip ID */}
//                       <div className="flex items-center justify-between">
//                         <p className="font-medium text-gray-900 text-sm">
//                           {trip.userName}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           #{trip.tripId}
//                         </p>
//                       </div>

//                       {/* Pickup + Drop */}
//                       <div className="grid grid-cols-2 gap-2">
//                         <div>
//                           <p className="text-[11px] text-gray-500 flex items-center gap-1">
//                             <MapPin className="w-3 h-3 text-primary" /> Pickup
//                           </p>
//                           <div className="bg-gray-50 rounded-md p-1.5 mt-1 border border-gray-100">
//                             <p className="text-xs text-gray-700">
//                               {trip.pickup}
//                             </p>
//                           </div>
//                         </div>

//                         <div>
//                           <p className="text-[11px] text-gray-500 flex items-center gap-1">
//                             <MapPin className="w-3 h-3 text-primary" /> Drop
//                           </p>
//                           <div className="bg-gray-50 rounded-md p-1.5 mt-1 border border-gray-100">
//                             <p className="text-xs text-gray-700">
//                               {trip.drop}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Distance + Duration */}
//                       <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
//                         <div className="text-center flex-1">
//                           <p className="font-semibold text-gray-900 text-sm">
//                             {trip.distanceKm} km
//                           </p>
//                           <p className="text-[10px] text-gray-600">
//                             Distance
//                           </p>
//                         </div>

//                         <div className="w-px h-6 bg-blue-200"></div>

//                         <div className="text-center flex-1">
//                           <p className="font-semibold text-gray-900 text-sm">
//                             {trip.durationMinutes} min
//                           </p>
//                           <p className="text-[10px] text-gray-600">
//                             Duration
//                           </p>
//                         </div>
//                       </div>

//                       {/* Payment Row */}
//                       <div className="flex justify-between items-center pt-1">
//                         <p className="text-xs text-gray-500">
//                           Payment: {trip.paymentId}
//                         </p>
//                         <p className="font-semibold text-green-700 text-sm flex items-center gap-1">
//                           <IndianRupee className="w-3 h-3" /> ₹{trip.amount}
//                         </p>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* TODAY SUMMARY */}
//           <div className="mt-auto p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div className="flex-1 text-center space-y-1">
//                 <p className="text-[11px] text-gray-600 font-medium">
//                   Earnings
//                 </p>
//                 <p className="text-xl font-bold text-gray-900">
//                   ₹{driver.totalEarnings}
//                 </p>
//               </div>

//               <div className="w-px h-12 bg-primary/50"></div>

//               <div className="flex-1 text-center space-y-1">
//                 <p className="text-[11px] text-gray-600 font-medium">
//                   Ride Time
//                 </p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {driver.workingToday.rideTime}
//                 </p>
//               </div>

//               <div className="w-px h-12 bg-primary/50"></div>

//               <div className="flex-1 text-center space-y-1">
//                 <p className="text-[11px] text-gray-600 font-medium">
//                   Active
//                 </p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {driver.workingToday.activeTime}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }