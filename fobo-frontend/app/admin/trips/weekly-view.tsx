
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drivers } from "@/lib/dummy/drivers";
import { IndianRupee, TrendingUp, Clock, Navigation } from "lucide-react";

export default function WeeklyView() {
  return (
    <Card className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-gray-900">
          Weekly Breakdown
        </h2>
      </div>

      {/* Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-900">
                Driver
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Weekly Trips
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Working Hours
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Revenue
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Cancellation %
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {drivers.map((driver) => {
              const weeklyTrips = Math.round(driver.stats.totalTrips / 4);
              const weeklyHours = (driver.stats.totalHours / 4).toFixed(1);
              const weeklyRevenue = driver.stats.todayEarnings * 6;
              const cancellationRate = driver.stats.cancellationRate;

              return (
                <tr
                  key={driver.id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={driver.profileImage}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        alt={driver.name}
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {driver.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {driver.employeeId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-800">
                    <div className="flex justify-center items-center gap-1">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      {weeklyTrips}
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-800">
                    <div className="flex justify-center items-center gap-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      {weeklyHours}h
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-green-700">
                    <div className="flex justify-center items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {weeklyRevenue}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <Badge
                      className={`font-medium ${
                        cancellationRate > 10
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {cancellationRate}%
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* MOBILE VERSION — CARD STYLE */}
        <div className="md:hidden space-y-4 p-3">
          {drivers.map((driver) => {
            const weeklyTrips = Math.round(driver.stats.totalTrips / 4);
            const weeklyHours = (driver.stats.totalHours / 4).toFixed(1);
            const weeklyRevenue = driver.stats.todayEarnings * 6;
            const cancellationRate = driver.stats.cancellationRate;

            return (
              <div
                key={driver.id}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm"
              >
                {/* Driver Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={driver.profileImage}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    alt={driver.name}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {driver.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {driver.employeeId}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Weekly Trips</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      {weeklyTrips}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Working Hours</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      {weeklyHours}h
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Revenue</span>
                    <span className="font-semibold text-green-700 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {weeklyRevenue}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Cancellation %</span>
                    <Badge
                      className={`font-medium ${
                        cancellationRate > 10
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {cancellationRate}%
                    </Badge>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}


// //api integrate code
// "use client";

// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { adminService } from "@/api/adminService";
// import { IndianRupee, TrendingUp, Clock, Navigation } from "lucide-react";

// export default function WeeklyView() {
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchWeeklyPerformance();
//   }, []);

//   const fetchWeeklyPerformance = async () => {
//     try {
//       const response = await adminService.trips.getWeeklyPerformance();
//       setWeeklyData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching weekly performance:", error);
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
//     <Card className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <TrendingUp className="w-5 h-5 text-primary" />
//         <h2 className="text-xl font-semibold text-gray-900">
//           Weekly Breakdown
//         </h2>
//       </div>

//       {/* Wrapper */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200">
//         <table className="w-full hidden md:table">
//           <thead className="bg-gray-50 sticky top-0 z-10">
//             <tr>
//               <th className="p-4 text-left font-semibold text-gray-900">
//                 Driver
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Weekly Trips
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Working Hours
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Revenue
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Cancellation %
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {weeklyData.map((driver) => (
//               <tr
//                 key={driver.id}
//                 className="hover:bg-gray-50 transition-all"
//               >
//                 <td className="p-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={driver.profileImage || "/default-driver.png"}
//                       className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//                       alt={driver.name}
//                       onError={(e) => {
//                         e.target.src = "/default-driver.png";
//                       }}
//                     />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {driver.name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {driver.employeeId}
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-gray-800">
//                   <div className="flex justify-center items-center gap-1">
//                     <Navigation className="w-4 h-4 text-blue-600" />
//                     {driver.weeklyTrips}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-gray-800">
//                   <div className="flex justify-center items-center gap-1">
//                     <Clock className="w-4 h-4 text-green-600" />
//                     {driver.weeklyHours}h
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-green-700">
//                   <div className="flex justify-center items-center gap-1">
//                     <IndianRupee className="w-4 h-4" />
//                     ₹{driver.weeklyRevenue}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center">
//                   <Badge
//                     className={`font-medium ${
//                       driver.cancellationRate > 10
//                         ? "bg-red-100 text-red-700 border-red-200"
//                         : "bg-green-100 text-green-700 border-green-200"
//                     }`}
//                   >
//                     {driver.cancellationRate}%
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* MOBILE VERSION — CARD STYLE */}
//         <div className="md:hidden space-y-4 p-3">
//           {weeklyData.map((driver) => (
//             <div
//               key={driver.id}
//               className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm"
//             >
//               {/* Driver Info */}
//               <div className="flex items-center gap-3 mb-4">
//                 <img
//                   src={driver.profileImage || "/default-driver.png"}
//                   className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//                   alt={driver.name}
//                   onError={(e) => {
//                     e.target.src = "/default-driver.png";
//                   }}
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-900">
//                     {driver.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {driver.employeeId}
//                   </p>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Weekly Trips</span>
//                   <span className="font-semibold text-gray-800 flex items-center gap-1">
//                     <Navigation className="w-4 h-4 text-blue-600" />
//                     {driver.weeklyTrips}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Working Hours</span>
//                   <span className="font-semibold text-gray-800 flex items-center gap-1">
//                     <Clock className="w-4 h-4 text-green-600" />
//                     {driver.weeklyHours}h
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Revenue</span>
//                   <span className="font-semibold text-green-700 flex items-center gap-1">
//                     <IndianRupee className="w-4 h-4" />
//                     ₹{driver.weeklyRevenue}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Cancellation %</span>
//                   <Badge
//                     className={`font-medium ${
//                       driver.cancellationRate > 10
//                         ? "bg-red-100 text-red-700 border-red-200"
//                         : "bg-green-100 text-green-700 border-green-200"
//                     }`}
//                   >
//                     {driver.cancellationRate}%
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {weeklyData.length === 0 && (
//         <div className="text-center py-12">
//           <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No weekly data available</p>
//         </div>
//       )}
//     </Card>
//   );
// }