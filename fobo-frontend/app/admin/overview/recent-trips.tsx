import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentTrips } from "@/lib/dummy/trips";

export function RecentTripsTable() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-soft overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Trips</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-dark">Last 10 trips</span>
          <span className="px-3 py-1 bg-primary-50 text-primary-dark rounded-full text-xs font-medium">
            Live
          </span>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-4">
        {recentTrips.map((trip, index) => (
          <div 
            key={trip.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-150 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Trip ID: {trip.id}</h4>
                <p className="text-xs text-muted-dark mt-1">{trip.date}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  trip.status === "completed"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : trip.status === "cancelled"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                }`}
              >
                {trip.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-dark mb-1">User</p>
                <p className="font-medium text-gray-700">{trip.user}</p>
              </div>
              <div>
                <p className="text-xs text-muted-dark mb-1">Driver</p>
                <p className="font-medium text-gray-700">{trip.driver}</p>
              </div>
              <div>
                <p className="text-xs text-muted-dark mb-1">Amount</p>
                <p className="font-semibold text-gray-900">{trip.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700">Trip ID</TableHead>
              <TableHead className="font-semibold text-gray-700">User</TableHead>
              <TableHead className="font-semibold text-gray-700">Driver</TableHead>
              <TableHead className="font-semibold text-gray-700">Amount</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentTrips.map((trip, index) => (
              <TableRow 
                key={trip.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-medium text-gray-900">{trip.id}</TableCell>
                <TableCell className="text-gray-700">{trip.user}</TableCell>
                <TableCell className="text-gray-700">{trip.driver}</TableCell>
                <TableCell className="font-semibold text-gray-900">{trip.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      trip.status === "completed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : trip.status === "cancelled"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {trip.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-dark text-sm">{trip.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View All Button */}
      <div className="mt-6 flex justify-center">
        <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow-md text-center">
          View All Trips
        </button>
      </div>
    </div>
  );
}



// //api integrate code
// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export function RecentTripsTable({ trips = [] }) {
//   return (
//     <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-soft overflow-hidden">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//         <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Trips</h3>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-muted-dark">Last 10 trips</span>
//           <span className="px-3 py-1 bg-primary-50 text-primary-dark rounded-full text-xs font-medium">
//             Live
//           </span>
//         </div>
//       </div>

//       {/* Mobile Cards View */}
//       <div className="block md:hidden space-y-4">
//         {trips.map((trip, index) => (
//           <div 
//             key={trip.id}
//             className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-150 animate-fade-in"
//             style={{ animationDelay: `${index * 50}ms` }}
//           >
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h4 className="font-semibold text-gray-900 text-sm">Trip ID: {trip.id}</h4>
//                 <p className="text-xs text-muted-dark mt-1">{trip.date}</p>
//               </div>
//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   trip.status === "completed"
//                     ? "bg-green-100 text-green-700 border border-green-200"
//                     : trip.status === "cancelled"
//                     ? "bg-red-100 text-red-700 border border-red-200"
//                     : "bg-yellow-100 text-yellow-700 border border-yellow-200"
//                 }`}
//               >
//                 {trip.status}
//               </span>
//             </div>
            
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <p className="text-xs text-muted-dark mb-1">User</p>
//                 <p className="font-medium text-gray-700">{trip.user}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-dark mb-1">Driver</p>
//                 <p className="font-medium text-gray-700">{trip.driver}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-dark mb-1">Amount</p>
//                 <p className="font-semibold text-gray-900">{trip.amount}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden md:block overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="border-b border-gray-200 hover:bg-transparent">
//               <TableHead className="font-semibold text-gray-700">Trip ID</TableHead>
//               <TableHead className="font-semibold text-gray-700">User</TableHead>
//               <TableHead className="font-semibold text-gray-700">Driver</TableHead>
//               <TableHead className="font-semibold text-gray-700">Amount</TableHead>
//               <TableHead className="font-semibold text-gray-700">Status</TableHead>
//               <TableHead className="font-semibold text-gray-700">Time</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {trips.map((trip, index) => (
//               <TableRow 
//                 key={trip.id} 
//                 className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <TableCell className="font-medium text-gray-900">{trip.id}</TableCell>
//                 <TableCell className="text-gray-700">{trip.user}</TableCell>
//                 <TableCell className="text-gray-700">{trip.driver}</TableCell>
//                 <TableCell className="font-semibold text-gray-900">{trip.amount}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-3 py-1.5 rounded-full text-xs font-medium ${
//                       trip.status === "completed"
//                         ? "bg-green-100 text-green-700 border border-green-200"
//                         : trip.status === "cancelled"
//                         ? "bg-red-100 text-red-700 border border-red-200"
//                         : "bg-yellow-100 text-yellow-700 border border-yellow-200"
//                     }`}
//                   >
//                     {trip.status}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-muted-dark text-sm">{trip.date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* View All Button */}
//       <div className="mt-6 flex justify-center">
//         <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow-md text-center">
//           View All Trips
//         </button>
//       </div>
//     </div>
//   );
// }