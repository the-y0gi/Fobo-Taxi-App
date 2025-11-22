"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Car,
  MapPin,
  Clock,
  IndianRupee,
  Phone,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DriverCard({ driver }: { driver: any }) {
  const [isDisabled, setIsDisabled] = useState<boolean>(
    driver?.isDisabled ?? false
  );

  const statusConfig: Record<
    string,
    { color: string; bgColor: string; icon: string }
  > = {
    online: {
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      icon: "🟢",
    },
    offline: {
      color: "text-gray-600",
      bgColor: "bg-gray-50 border-gray-200",
      icon: "⚫",
    },
    "on-ride": {
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
      icon: "🚗",
    },
  };

  const toggleDisable = () => {
    setIsDisabled((prev) => !prev);
  };

  const status = statusConfig[driver.status] || statusConfig.offline;

  return (
    <Card className="group p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:border-primary/20 rounded-xl">
      {/* Header with Driver Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <img
              src={driver.profileImage || "/default-driver.png"}
              className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 group-hover:border-primary/20 transition-colors"
              alt={driver.name}
            />
            {driver.status === "online" && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate text-base group-hover:text-primary transition-colors">
                {driver.name}
              </h3>
              <Badge
                className={`
    ${status.bgColor} 
    ${status.color} 
    text-xs font-medium px-2 py-1 border 
    hover:bg-inherit hover:text-inherit hover:border-inherit
  `}
              >
                {driver.status}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-dark">
              <div className="flex items-center gap-1">
                <IdCard className="w-3 h-3" />
                <span className="truncate">{driver.employeeId}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span className="truncate">{driver.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Info  */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-25 rounded-xl p-4 mb-4 space-y-3 text-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Car className="w-4 h-4 text-primary" />
            <span className="font-semibold">
              {driver.vehicle.name} {driver.vehicle.model}
            </span>
          </div>
          <Badge variant="outline" className="text-xs bg-white">
            {driver.vehicle.type}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-muted-dark" />
          <span className="truncate flex-1">{driver.currentLocation}</span>
        </div>

        <div className="flex justify-between items-center text-gray-700 bg-white px-3 py-2 rounded-lg border">
          <span className="font-mono text-sm">
            {driver.vehicle.numberPlate}
          </span>
          <span className="text-xs text-muted-dark">Plate</span>
        </div>
      </div>

      {/* Stats Grid  */}

      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Total Trips */}
        <div
          className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm 
                  hover:bg-blue-50/40 hover:border-blue-200 transition-all duration-150"
        >
          <p className="font-semibold text-base text-gray-900 mb-0.5">
            {driver.stats.totalTrips}
          </p>
          <p className="text-[11px] tracking-wide text-gray-500">Trips</p>
        </div>

        {/* Drive Hours */}
        <div
          className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm 
                  hover:bg-green-50/40 hover:border-green-200 transition-all duration-150"
        >
          <p className="font-semibold text-base text-gray-900 mb-0.5">
            {driver.stats.totalHours}h
          </p>
          <p className="text-[11px] tracking-wide text-gray-500">Hours</p>
        </div>

        {/* total Earnings */}
        <div
          className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm 
                  hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-150"
        >
          <p className="font-semibold text-base text-gray-900 mb-0.5">
            ₹{driver.stats.totalEarnings}
          </p>
          <p className="text-[11px] tracking-wide text-gray-500">Earning</p>
        </div>
      </div>

      {/* Action Buttons - Subtle */}
      <div className="flex gap-2">
        <button
          onClick={toggleDisable}
          className={`flex-1 py-2 rounded-lg text-sm font-normal transition-colors duration-150 ${
            isDisabled
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {isDisabled ? "Enable" : "Disable"}
        </button>

        <Link
          href={`/admin/drivers/${driver.id}`}
          className="flex-1 py-2 rounded-lg text-sm font-normal border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 text-center transition-colors duration-150 bg-white"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}



// //api integrate

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   MoreVertical,
//   Car,
//   MapPin,
//   Clock,
//   IndianRupee,
//   Phone,
//   IdCard,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export function DriverCard({ driver, onStatusUpdate }) {
//   const [isDisabled, setIsDisabled] = useState(!driver.isActive);

//   const statusConfig = {
//     online: {
//       color: "text-green-700",
//       bgColor: "bg-green-50 border-green-200",
//       icon: "🟢",
//     },
//     offline: {
//       color: "text-gray-600",
//       bgColor: "bg-gray-50 border-gray-200",
//       icon: "⚫",
//     },
//     "on-ride": {
//       color: "text-blue-700",
//       bgColor: "bg-blue-50 border-blue-200",
//       icon: "🚗",
//     },
//     arriving: {
//       color: "text-orange-700", 
//       bgColor: "bg-orange-50 border-orange-200",
//       icon: "🟠",
//     },
//     break: {
//       color: "text-purple-700",
//       bgColor: "bg-purple-50 border-purple-200", 
//       icon: "🟣",
//     }
//   };

//   const toggleDisable = async () => {
//     try {
//       await onStatusUpdate(driver.id, isDisabled);
//       setIsDisabled(!isDisabled);
//     } catch (error) {
//       console.error("Error toggling driver status:", error);
//     }
//   };

//   const status = statusConfig[driver.status] || statusConfig.offline;

//   return (
//     <Card className="group p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:border-primary/20 rounded-xl">
//       {/* Header with Driver Info */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <div className="relative">
//             <img
//               src={driver.profileImage || "/default-driver.png"}
//               className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 group-hover:border-primary/20 transition-colors"
//               alt={driver.name}
//             />
//             {driver.status === "online" && (
//               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             )}
//           </div>

//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-2 mb-2">
//               <h3 className="font-semibold text-gray-900 truncate text-base group-hover:text-primary transition-colors">
//                 {driver.name}
//               </h3>
//               <Badge
//                 className={`
//                   ${status.bgColor} 
//                   ${status.color} 
//                   text-xs font-medium px-2 py-1 border 
//                   hover:bg-inherit hover:text-inherit hover:border-inherit
//                 `}
//               >
//                 {driver.status}
//               </Badge>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-dark">
//               <div className="flex items-center gap-1">
//                 <IdCard className="w-3 h-3" />
//                 <span className="truncate">{driver.employeeId}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Phone className="w-3 h-3" />
//                 <span className="truncate">{driver.phone}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Vehicle Info */}
//       <div className="bg-gradient-to-r from-gray-50 to-gray-25 rounded-xl p-4 mb-4 space-y-3 text-sm border border-gray-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-gray-700">
//             <Car className="w-4 h-4 text-primary" />
//             <span className="font-semibold">
//               {driver.vehicle.name} {driver.vehicle.model}
//             </span>
//           </div>
//           <Badge variant="outline" className="text-xs bg-white">
//             {driver.vehicle.type}
//           </Badge>
//         </div>

//         <div className="flex items-center gap-2 text-gray-600">
//           <MapPin className="w-4 h-4 text-muted-dark" />
//           <span className="truncate flex-1">{driver.currentLocation}</span>
//         </div>

//         <div className="flex justify-between items-center text-gray-700 bg-white px-3 py-2 rounded-lg border">
//           <span className="font-mono text-sm">
//             {driver.vehicle.numberPlate}
//           </span>
//           <span className="text-xs text-muted-dark">Plate</span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-3 gap-3 mb-4">
//         <div className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50/40 hover:border-blue-200 transition-all duration-150">
//           <p className="font-semibold text-base text-gray-900 mb-0.5">
//             {driver.stats.totalTrips}
//           </p>
//           <p className="text-[11px] tracking-wide text-gray-500">Trips</p>
//         </div>

//         <div className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-green-50/40 hover:border-green-200 transition-all duration-150">
//           <p className="font-semibold text-base text-gray-900 mb-0.5">
//             {driver.stats.totalHours}h
//           </p>
//           <p className="text-[11px] tracking-wide text-gray-500">Hours</p>
//         </div>

//         <div className="text-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-150">
//           <p className="font-semibold text-base text-gray-900 mb-0.5">
//             ₹{driver.stats.totalEarnings}
//           </p>
//           <p className="text-[11px] tracking-wide text-gray-500">Earning</p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-2">
//         <button
//           onClick={toggleDisable}
//           className={`flex-1 py-2 rounded-lg text-sm font-normal transition-colors duration-150 ${
//             isDisabled
//               ? "bg-green-50 text-green-600 hover:bg-green-100"
//               : "bg-red-50 text-red-600 hover:bg-red-100"
//           }`}
//         >
//           {isDisabled ? "Enable" : "Disable"}
//         </button>

//         <Link
//           href={`/admin/drivers/${driver.id}`}
//           className="flex-1 py-2 rounded-lg text-sm font-normal border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 text-center transition-colors duration-150 bg-white"
//         >
//           View Details
//         </Link>
//       </div>
//     </Card>
//   );
// }