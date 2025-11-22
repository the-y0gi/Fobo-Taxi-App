"use client";
import { notFound, useParams } from "next/navigation";
import { drivers } from "@/lib/dummy/drivers";
import { driverTrips } from "@/lib/dummy/trips";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Car,
  Clock,
  IndianRupee,
  User,
  Navigation,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function DriverDetailPage() {
  const params = useParams();
  const driver = drivers.find((d) => d.id === params.id);
  if (!driver) return notFound();

  const trips = driverTrips.filter((t) => t.driverId === driver.id);

  const formatTripDate = (dateString: string) => {
    const date = new Date(dateString);

    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " –");
  };

  const statusConfig: Record<string, { color: string; bgColor: string }> = {
    online: {
      color: "text-green-700",
      bgColor: "bg-green-100 border-green-200",
    },
    offline: { color: "text-gray-600", bgColor: "bg-gray-100 border-gray-200" },
    "on-ride": {
      color: "text-blue-700",
      bgColor: "bg-blue-100 border-blue-200",
    },
  };

  const status = statusConfig[driver.status] || statusConfig.offline;

  return (
    <div className="min-h-screen bg-gray-50/30 ">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Details</h1>
          <p className="text-sm text-muted mt-1">
            Manage driver information and performance
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Top Section: Profile + Vehicle + Today Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
            {/* TOP SECTION */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img
                  src={driver.profileImage || "/default.png"}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
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
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {driver.name}
                  </h2>
                  <Badge
                    className={`${status.bgColor} ${status.color} border font-medium`}
                  >
                    {driver.status}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-sm">
                  {/* Row 1 — Employee ID + Phone (Side by Side) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{driver.employeeId}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{driver.phone}</span>
                    </div>
                  </div>

                  {/* Row 2 — Email Full Width */}
                  {/* <div className="flex items-center gap-1.5 text-gray-600">
    <Mail className="w-4 h-4" />
    <span className="truncate">{driver.email}</span>
  </div> */}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Documents */}

            <div className="space-y-3">
              <p className="font-medium text-gray-800 text-sm">Documents</p>

              <div className="grid grid-cols-2 gap-3">
                {/* Document Card */}
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                  <p className="text-gray-700 text-sm font-medium">
                    Driving Licence
                  </p>
                  <a
                    href={driver.documents?.drivingLicence}
                    target="_blank"
                    className="text-primary text-xs font-medium mt-1 hover:underline"
                  >
                    View Document
                  </a>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                  <p className="text-gray-700 text-sm font-medium">RC Book</p>
                  <a
                    href={driver.documents?.rcBook}
                    target="_blank"
                    className="text-primary text-xs font-medium mt-1 hover:underline"
                  >
                    View Document
                  </a>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                  <p className="text-gray-700 text-sm font-medium">
                    Aadhaar Card
                  </p>
                  <a
                    href={driver.documents?.aadhaar}
                    target="_blank"
                    className="text-primary text-xs font-medium mt-1 hover:underline"
                  >
                    View Document
                  </a>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                  <p className="text-gray-700 text-sm font-medium">PAN Card</p>
                  <a
                    href={driver.documents?.panCard}
                    target="_blank"
                    className="text-primary text-xs font-medium mt-1 hover:underline"
                  >
                    View Document
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="border-t border-gray-100 my-4" /> */}

            {/* LICENCE INFO */}
            {/* <div className="grid grid-cols-2 gap-4 text-sm">
    <div>
      <p className="text-gray-600">Licence No.</p>
      <p className="font-semibold text-gray-900">MH-09-2020-4411</p>
    </div>

    <div>
      <p className="text-gray-600">Licence Expiry</p>
      <p className="font-semibold text-red-600">12 Aug 2026</p>
    </div>
  </div> */}
          </Card>

          <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                Vehicle Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  Vehicle
                </span>
                <span className="font-semibold text-gray-900">
                  {driver.vehicle.name} {driver.vehicle.model}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  Number Plate
                </span>
                <span className="font-mono font-semibold text-gray-900">
                  {driver.vehicle.numberPlate}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Type</span>
                <span className="font-semibold text-gray-900">
                  {driver.vehicle.type}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Color</span>
                <span className="font-semibold text-gray-900">
                  {driver.vehicle.color}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                Today's Performance
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <p className="font-bold text-lg text-gray-900">
                    {driver.stats.todayTrips}
                  </p>
                </div>
                <p className="text-xs text-gray-600 font-medium">Trips Today</p>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <p className="font-bold text-lg text-gray-900">
                    {driver.stats.todayEarnings}
                  </p>
                </div>
                <p className="text-xs text-gray-600 font-medium">Earnings</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Active Time</span>
                <span className="font-semibold text-gray-900">
                  {driver.workingToday.activeTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Ride Time</span>
                <span className="font-semibold text-gray-900">
                  {driver.workingToday.rideTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Break Time</span>
                <span className="font-semibold text-gray-900">
                  {driver.workingToday.breakTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Cancellation Rate</span>
                <span
                  className={`font-semibold ${
                    driver.stats.cancellationRate > 10
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {driver.stats.cancellationRate}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Overall Performance */}
        <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">
              Overall Performance
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <p className="font-bold text-xl text-gray-900">
                  {driver.stats.totalTrips}
                </p>
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Trips</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-25 border border-green-100 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <p className="font-bold text-xl text-gray-900">
                  {driver.stats.totalHours}h
                </p>
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Hours</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-25 border border-purple-100 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <IndianRupee className="w-4 h-4 text-purple-600" />
                <p className="font-bold text-xl text-gray-900">
                  {driver.stats.totalEarnings}
                </p>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Total Earnings
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-25 border border-orange-100 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-4 h-4 text-orange-600" />
                <p className="font-bold text-xl text-gray-900">
                  {driver.stats.rating || 4.8}
                </p>
              </div>
              <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
            </div>
          </div>
        </Card>

        {/* Trips Table - Responsive */}
        <Card className="p-4 sm:p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Total Trips
              </h3>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary w-fit"
            >
              {trips.length} trips
            </Badge>
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Navigation className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No trips found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table (hidden on mobile) */}
              <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-lg">
                <Table>
                  <TableHeader className="bg-gray-50/80">
                    <TableRow>
                      <TableHead className="font-semibold">Trip ID</TableHead>
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Pickup</TableHead>
                      <TableHead className="font-semibold">Drop</TableHead>
                      <TableHead className="font-semibold">Distance</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {trips.map((trip) => (
                      <TableRow
                        key={trip.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {trip.tripId}
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {trip.userName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {trip.userPhone}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="max-w-[150px]">
                          <p className="truncate text-sm">{trip.pickup}</p>
                        </TableCell>

                        <TableCell className="max-w-[150px]">
                          <p className="truncate text-sm">{trip.drop}</p>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {trip.distanceKm} km
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 text-sm">
                              {trip.durationMinutes} min
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1 font-semibold text-green-700">
                            <IndianRupee className="w-3 h-3" />
                            {trip.amount}
                          </div>
                        </TableCell>

                        <TableCell className="text-gray-700 font-medium">
                          {formatTripDate(trip.date)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards (hidden on desktop) */}
              <div className="sm:hidden space-y-3">
                {trips.map((trip) => (
                  <Card
                    key={trip.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header - Trip ID and Amount */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Trip ID
                          </p>
                          <p className="font-medium text-gray-700">
                            {trip.tripId}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-green-700">
                          <IndianRupee className="w-3 h-3" />
                          <span>{trip.amount}</span>
                        </div>
                      </div>

                      {/* User Info */}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          User
                        </p>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="font-medium text-gray-900">
                            {trip.userName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {trip.userPhone}
                          </p>
                        </div>
                      </div>

                      {/* Locations */}
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm mb-1">
                            Pickup
                          </p>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-gray-700 text-sm">
                              {trip.pickup}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm mb-1">
                            Drop
                          </p>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-gray-700 text-sm">{trip.drop}</p>
                          </div>
                        </div>
                      </div>

                      {/* Distance and Duration */}
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">
                            {trip.distanceKm} km
                          </p>
                          <p className="text-xs text-gray-600">Distance</p>
                        </div>
                        <div className="w-px h-8 bg-blue-200"></div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">
                            {trip.durationMinutes} min
                          </p>
                          <p className="text-xs text-gray-600">Duration</p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="pt-2 border-t border-gray-200">
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          Date & Time
                        </p>
                        <p className="text-gray-700 text-sm">
                          {formatTripDate(trip.date)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}


//api integrate code 

// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   ArrowLeft,
//   Phone,
//   Mail,
//   MapPin,
//   Car,
//   Clock,
//   IndianRupee,
//   User,
//   Navigation,
//   Calendar,
//   TrendingUp,
// } from "lucide-react";
// import { adminService } from "@/api/adminService";
// import Link from "next/link";

// export default function DriverDetailPage() {
//   const params = useParams();
//   const [driver, setDriver] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (params.id) {
//       fetchDriverDetails();
//       fetchDriverTrips();
//     }
//   }, [params.id]);

//   const fetchDriverDetails = async () => {
//     try {
//       const response = await adminService.drivers.getById(params.id);
//       setDriver(response.data.data);
//     } catch (error) {
//       console.error("Error fetching driver details:", error);
//     }
//   };

//   const fetchDriverTrips = async () => {
//     try {
//       const response = await adminService.drivers.getTrips(params.id);
//       setTrips(response.data.data.trips);
//     } catch (error) {
//       console.error("Error fetching driver trips:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTripDate = (dateString) => {
//     const date = new Date(dateString);
//     return date
//       .toLocaleString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//       .replace(",", " –");
//   };

//   const statusConfig = {
//     online: {
//       color: "text-green-700",
//       bgColor: "bg-green-100 border-green-200",
//     },
//     offline: { 
//       color: "text-gray-600", 
//       bgColor: "bg-gray-100 border-gray-200" 
//     },
//     "on-ride": {
//       color: "text-blue-700",
//       bgColor: "bg-blue-100 border-blue-200",
//     },
//     arriving: {
//       color: "text-orange-700",
//       bgColor: "bg-orange-100 border-orange-200",
//     },
//     break: {
//       color: "text-purple-700", 
//       bgColor: "bg-purple-100 border-purple-200"
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading driver details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!driver) {
//     return (
//       <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
//         <div className="text-center">
//           <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900">Driver Not Found</h2>
//           <p className="text-gray-600 mt-2">The driver you're looking for doesn't exist.</p>
//           <Link href="/admin/drivers" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
//             Back to Drivers
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const status = statusConfig[driver.status] || statusConfig.offline;

//   return (
//     <div className="min-h-screen bg-gray-50/30">
//       {/* Header with Back Button */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Driver Details</h1>
//           <p className="text-sm text-muted mt-1">
//             Manage driver information and performance
//           </p>
//         </div>
//         <Link href="/admin/drivers">
//           <Button variant="outline" className="flex items-center gap-2">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Drivers
//           </Button>
//         </Link>
//       </div>

//       <div className="space-y-6">
//         {/* Top Section: Profile + Vehicle + Today Stats */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Profile Card */}
//           <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//             <div className="flex items-start gap-4 mb-6">
//               <div className="relative">
//                 <img
//                   src={driver.profileImage || "/default.png"}
//                   className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
//                   alt={driver.name}
//                   onError={(e) => {
//                     e.target.src = "/default.png";
//                   }}
//                 />
//                 <div
//                   className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
//                     driver.status === "online"
//                       ? "bg-green-500"
//                       : driver.status === "on-ride"
//                       ? "bg-blue-500"
//                       : "bg-gray-400"
//                   }`}
//                 />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-2">
//                   <h2 className="text-xl font-semibold text-gray-900 truncate">
//                     {driver.name}
//                   </h2>
//                   <Badge
//                     className={`${status.bgColor} ${status.color} border font-medium`}
//                   >
//                     {driver.status}
//                   </Badge>
//                 </div>

//                 <div className="space-y-1.5 text-sm">
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-center gap-1.5 text-gray-600">
//                       <User className="w-4 h-4" />
//                       <span>{driver.employeeId}</span>
//                     </div>

//                     <div className="flex items-center gap-1.5 text-gray-600">
//                       <Phone className="w-4 h-4" />
//                       <span>{driver.phone}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-1.5 text-gray-600">
//                     <Mail className="w-4 h-4" />
//                     <span className="truncate">{driver.email}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-100 my-4" />

//             {/* Documents */}
//             <div className="space-y-3">
//               <p className="font-medium text-gray-800 text-sm">Documents</p>

//               <div className="grid grid-cols-2 gap-3">
//                 {/* Document Cards */}
//                 {driver.documents.drivingLicence && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">Driving Licence</p>
//                     <a
//                       href={driver.documents.drivingLicence}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}

//                 {driver.documents.rcBook && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">RC Book</p>
//                     <a
//                       href={driver.documents.rcBook}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}

//                 {driver.documents.aadhaar && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">Aadhaar Card</p>
//                     <a
//                       href={driver.documents.aadhaar}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}

//                 {driver.documents.panCard && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">PAN Card</p>
//                     <a
//                       href={driver.documents.panCard}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}

//                 {driver.documents.insurance && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">Insurance</p>
//                     <a
//                       href={driver.documents.insurance}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}

//                 {driver.documents.vehicleRC && (
//                   <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
//                     <p className="text-gray-700 text-sm font-medium">Vehicle RC</p>
//                     <a
//                       href={driver.documents.vehicleRC}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary text-xs font-medium mt-1 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Vehicle Details Card */}
//           <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//             <div className="flex items-center gap-2 mb-4">
//               <Car className="w-5 h-5 text-primary" />
//               <h3 className="text-lg font-semibold text-gray-900">Vehicle Details</h3>
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-600">Vehicle</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.vehicle.name} {driver.vehicle.model}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-600">Number Plate</span>
//                 <span className="font-mono font-semibold text-gray-900">
//                   {driver.vehicle.numberPlate}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-600">Type</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.vehicle.type}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-600">Color</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.vehicle.color}
//                 </span>
//               </div>
//             </div>
//           </Card>

//           {/* Today's Performance Card */}
//           <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-5 h-5 text-primary" />
//               <h3 className="text-lg font-semibold text-gray-900">Today's Performance</h3>
//             </div>

//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
//                 <div className="flex items-center justify-center gap-1 mb-1">
//                   <Navigation className="w-4 h-4 text-blue-600" />
//                   <p className="font-bold text-lg text-gray-900">
//                     {driver.stats.todayTrips}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-600 font-medium">Trips Today</p>
//               </div>

//               <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
//                 <div className="flex items-center justify-center gap-1 mb-1">
//                   <IndianRupee className="w-4 h-4 text-green-600" />
//                   <p className="font-bold text-lg text-gray-900">
//                     ₹{driver.stats.todayEarnings}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-600 font-medium">Earnings</p>
//               </div>
//             </div>

//             <div className="space-y-3 pt-4 border-t border-gray-100">
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Active Time</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.workingToday.activeTime}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Ride Time</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.workingToday.rideTime}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Break Time</span>
//                 <span className="font-semibold text-gray-900">
//                   {driver.workingToday.breakTime}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Cancellation Rate</span>
//                 <span
//                   className={`font-semibold ${
//                     driver.stats.cancellationRate > 10
//                       ? "text-red-600"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {driver.stats.cancellationRate}%
//                 </span>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Overall Performance */}
//         <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//           <div className="flex items-center gap-2 mb-6">
//             <Calendar className="w-5 h-5 text-primary" />
//             <h3 className="text-lg font-semibold text-gray-900">Overall Performance</h3>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-xl">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Navigation className="w-4 h-4 text-blue-600" />
//                 <p className="font-bold text-xl text-gray-900">
//                   {driver.stats.totalTrips}
//                 </p>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">Total Trips</p>
//             </div>

//             <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-25 border border-green-100 rounded-xl">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Clock className="w-4 h-4 text-green-600" />
//                 <p className="font-bold text-xl text-gray-900">
//                   {driver.stats.totalHours}h
//                 </p>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">Total Hours</p>
//             </div>

//             <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-25 border border-purple-100 rounded-xl">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <IndianRupee className="w-4 h-4 text-purple-600" />
//                 <p className="font-bold text-xl text-gray-900">
//                   ₹{driver.stats.totalEarnings}
//                 </p>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">Total Earnings</p>
//             </div>

//             <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-25 border border-orange-100 rounded-xl">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <User className="w-4 h-4 text-orange-600" />
//                 <p className="font-bold text-xl text-gray-900">
//                   {driver.stats.rating || 4.8}
//                 </p>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
//             </div>
//           </div>
//         </Card>

//         {/* Trips Table - Responsive */}
//         <Card className="p-4 sm:p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
//             <div className="flex items-center gap-2">
//               <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Trips</h3>
//             </div>
//             <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
//               {trips.length} trips
//             </Badge>
//           </div>

//           {trips.length === 0 ? (
//             <div className="text-center py-6 sm:py-8">
//               <Navigation className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500 text-sm">No trips found.</p>
//             </div>
//           ) : (
//             <>
//               {/* Desktop Table (hidden on mobile) */}
//               <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-lg">
//                 <Table>
//                   <TableHeader className="bg-gray-50/80">
//                     <TableRow>
//                       <TableHead className="font-semibold">Trip ID</TableHead>
//                       <TableHead className="font-semibold">User</TableHead>
//                       <TableHead className="font-semibold">Pickup</TableHead>
//                       <TableHead className="font-semibold">Drop</TableHead>
//                       <TableHead className="font-semibold">Distance</TableHead>
//                       <TableHead className="font-semibold">Amount</TableHead>
//                       <TableHead className="font-semibold">Date</TableHead>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody>
//                     {trips.map((trip) => (
//                       <TableRow
//                         key={trip.id}
//                         className="hover:bg-gray-50/50 transition-colors"
//                       >
//                         <TableCell className="font-medium text-gray-900">
//                           {trip.tripId}
//                         </TableCell>

//                         <TableCell>
//                           <div>
//                             <p className="font-medium text-gray-900">
//                               {trip.userName}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {trip.userPhone}
//                             </p>
//                           </div>
//                         </TableCell>

//                         <TableCell className="max-w-[150px]">
//                           <p className="truncate text-sm">{trip.pickup}</p>
//                         </TableCell>

//                         <TableCell className="max-w-[150px]">
//                           <p className="truncate text-sm">{trip.drop}</p>
//                         </TableCell>

//                         <TableCell>
//                           <div className="flex items-center gap-1">
//                             <span className="font-medium">
//                               {trip.distanceKm} km
//                             </span>
//                             <span className="text-gray-400">•</span>
//                             <span className="text-gray-500 text-sm">
//                               {trip.durationMinutes} min
//                             </span>
//                           </div>
//                         </TableCell>

//                         <TableCell>
//                           <div className="flex items-center gap-1 font-semibold text-green-700">
//                             <IndianRupee className="w-3 h-3" />
//                             ₹{trip.amount}
//                           </div>
//                         </TableCell>

//                         <TableCell className="text-gray-700 font-medium">
//                           {formatTripDate(trip.date)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               {/* Mobile Cards (hidden on desktop) */}
//               <div className="sm:hidden space-y-3">
//                 {trips.map((trip) => (
//                   <Card
//                     key={trip.id}
//                     className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors"
//                   >
//                     <div className="space-y-3">
//                       {/* Header - Trip ID and Amount */}
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="font-semibold text-gray-900 text-sm">Trip ID</p>
//                           <p className="font-medium text-gray-700">{trip.tripId}</p>
//                         </div>
//                         <div className="flex items-center gap-1 font-semibold text-green-700">
//                           <IndianRupee className="w-3 h-3" />
//                           <span>₹{trip.amount}</span>
//                         </div>
//                       </div>

//                       {/* User Info */}
//                       <div>
//                         <p className="font-semibold text-gray-900 text-sm mb-1">User</p>
//                         <div className="bg-gray-50 rounded-lg p-2">
//                           <p className="font-medium text-gray-900">{trip.userName}</p>
//                           <p className="text-xs text-gray-500 mt-1">{trip.userPhone}</p>
//                         </div>
//                       </div>

//                       {/* Locations */}
//                       <div className="grid grid-cols-1 gap-2">
//                         <div>
//                           <p className="font-semibold text-gray-900 text-sm mb-1">Pickup</p>
//                           <div className="bg-gray-50 rounded-lg p-2">
//                             <p className="text-gray-700 text-sm">{trip.pickup}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-900 text-sm mb-1">Drop</p>
//                           <div className="bg-gray-50 rounded-lg p-2">
//                             <p className="text-gray-700 text-sm">{trip.drop}</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Distance and Duration */}
//                       <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
//                         <div className="text-center">
//                           <p className="font-semibold text-gray-900">{trip.distanceKm} km</p>
//                           <p className="text-xs text-gray-600">Distance</p>
//                         </div>
//                         <div className="w-px h-8 bg-blue-200"></div>
//                         <div className="text-center">
//                           <p className="font-semibold text-gray-900">{trip.durationMinutes} min</p>
//                           <p className="text-xs text-gray-600">Duration</p>
//                         </div>
//                       </div>

//                       {/* Date */}
//                       <div className="pt-2 border-t border-gray-200">
//                         <p className="font-semibold text-gray-900 text-sm mb-1">Date & Time</p>
//                         <p className="text-gray-700 text-sm">{formatTripDate(trip.date)}</p>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }