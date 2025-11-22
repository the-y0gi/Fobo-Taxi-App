
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drivers } from "@/lib/dummy/drivers";
import {
  IndianRupee,
  Calendar,
  Navigation,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function MonthlyView() {
  return (
    <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-gray-900">
          Monthly Performance
        </h2>
      </div>

      {/* DESKTOP TABLE */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-900">
                Driver
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Monthly Trips
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Monthly Hours
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Monthly Earnings
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Refund Count
              </th>
              <th className="p-4 text-center font-semibold text-gray-900">
                Rating
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {drivers.map((driver) => {
              const monthlyTrips = driver.stats.totalTrips;
              const monthlyHours = driver.stats.totalHours;
              const monthlyEarnings = driver.stats.totalHours * 60;
              const refundCount = Math.floor(driver.stats.cancellationRate / 2);
              const rating = driver?.stats?.rating || 4.8;

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
                      {monthlyTrips}
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-800">
                    <div className="flex justify-center items-center gap-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      {monthlyHours}h
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-green-700">
                    <div className="flex justify-center items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {monthlyEarnings}
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-800">
                    <div className="flex justify-center items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      {refundCount}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
                      {rating}/5
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* MOBILE VERSION — CARD UI */}
        <div className="md:hidden space-y-4 p-3">
          {drivers.map((driver) => {
            const monthlyTrips = driver.stats.totalTrips;
            const monthlyHours = driver.stats.totalHours;
            const monthlyEarnings = driver.stats.totalHours * 60;
            const refundCount = Math.floor(driver.stats.cancellationRate / 2);
            const rating = driver.stats.rating || 4.8;

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

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Trips</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      {monthlyTrips}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Hours</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      {monthlyHours}h
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Earnings</span>
                    <span className="font-semibold text-green-700 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {monthlyEarnings}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Refund Count</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      {refundCount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating</span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
                      {rating}/5
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
// import {
//   IndianRupee,
//   Calendar,
//   Navigation,
//   Clock,
//   AlertCircle,
// } from "lucide-react";

// export default function MonthlyView() {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMonthlyPerformance();
//   }, []);

//   const fetchMonthlyPerformance = async () => {
//     try {
//       const response = await adminService.trips.getMonthlyPerformance();
//       setMonthlyData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching monthly performance:", error);
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
//     <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <Calendar className="w-5 h-5 text-primary" />
//         <h2 className="text-xl font-semibold text-gray-900">
//           Monthly Performance
//         </h2>
//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200">
//         <table className="w-full hidden md:table">
//           <thead className="bg-gray-50 sticky top-0 z-10">
//             <tr>
//               <th className="p-4 text-left font-semibold text-gray-900">
//                 Driver
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Monthly Trips
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Monthly Hours
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Monthly Earnings
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Refund Count
//               </th>
//               <th className="p-4 text-center font-semibold text-gray-900">
//                 Rating
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {monthlyData.map((driver) => (
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
//                     {driver.monthlyTrips}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-gray-800">
//                   <div className="flex justify-center items-center gap-1">
//                     <Clock className="w-4 h-4 text-green-600" />
//                     {driver.monthlyHours}h
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-green-700">
//                   <div className="flex justify-center items-center gap-1">
//                     <IndianRupee className="w-4 h-4" />
//                     ₹{driver.monthlyEarnings}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center font-semibold text-gray-800">
//                   <div className="flex justify-center items-center gap-1">
//                     <AlertCircle className="w-4 h-4 text-orange-600" />
//                     {driver.refundCount}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center">
//                   <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
//                     {driver.rating}/5
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* MOBILE VERSION — CARD UI */}
//         <div className="md:hidden space-y-4 p-3">
//           {monthlyData.map((driver) => (
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

//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Monthly Trips</span>
//                   <span className="font-semibold text-gray-800 flex items-center gap-1">
//                     <Navigation className="w-4 h-4 text-blue-600" />
//                     {driver.monthlyTrips}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Monthly Hours</span>
//                   <span className="font-semibold text-gray-800 flex items-center gap-1">
//                     <Clock className="w-4 h-4 text-green-600" />
//                     {driver.monthlyHours}h
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Monthly Earnings</span>
//                   <span className="font-semibold text-green-700 flex items-center gap-1">
//                     <IndianRupee className="w-4 h-4" />
//                     ₹{driver.monthlyEarnings}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Refund Count</span>
//                   <span className="font-semibold text-gray-800 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4 text-orange-600" />
//                     {driver.refundCount}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Rating</span>
//                   <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
//                     {driver.rating}/5
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {monthlyData.length === 0 && (
//         <div className="text-center py-12">
//           <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No monthly data available</p>
//         </div>
//       )}
//     </Card>
//   );
// }