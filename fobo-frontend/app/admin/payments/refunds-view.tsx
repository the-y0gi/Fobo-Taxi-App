// "use client";

// import { useState } from "react";
// import { refunds } from "@/lib/dummy/refunds";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function RefundsView() {
//   const [list, setList] = useState(refunds);

//   const markProcessed = (id: string) => {
//     setList((prev) =>
//       prev.map((r) =>
//         r.id === id ? { ...r, status: "processed" } : r
//       )
//     );
//   };

//   return (
//     <Card className="p-4 sm:p-6 bg-card border border-border shadow-sm overflow-hidden">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">Refund Center</h2>
//           <p className="text-sm text-muted-DEFAULT mt-1">Manage and process refund requests</p>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-border">
//               <th className="p-2 text-left text-muted-DEFAULT font-medium">Refund ID</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium">User</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium hidden sm:table-cell">Trip</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium">Amount</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium hidden md:table-cell">Type</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium">Status</th>
//               <th className="p-2 text-left text-muted-DEFAULT font-medium">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {list.map((r) => (
//               <tr key={r.id} className="border-b border-border hover:bg-gray-50">
//                 <td className="p-2 font-medium">{r.id}</td>
//                 <td className="p-2">{r.user}</td>
//                 <td className="p-2 hidden sm:table-cell">{r.tripId}</td>
//                 <td className="p-2 font-semibold text-primary">₹{r.amount}</td>
//                 <td className="p-2 hidden md:table-cell">
//                   <span className="px-2 py-1 bg-muted-light rounded text-xs">
//                     {r.type}
//                   </span>
//                 </td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       r.status === "pending"
//                         ? "bg-yellow-100 text-warning"
//                         : "bg-green-100 text-success"
//                     }`}
//                   >
//                     {r.status}
//                   </span>
//                 </td>

//                 <td className="p-2">
//                   {r.status === "pending" ? (
//                     <Button
//                       size="sm"
//                       className="bg-primary text-white hover:bg-primary-dark text-xs"
//                       onClick={() => markProcessed(r.id)}
//                     >
//                       Process Refund
//                     </Button>
//                   ) : (
//                     <span className="text-muted-DEFAULT text-xs">Completed</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import { refunds } from "@/lib/dummy/refunds";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, IndianRupee, User, MapPin, Calendar } from "lucide-react";

export default function RefundsView() {
  const [list, setList] = useState(refunds);

  const markProcessed = (id: string) => {
    setList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "processed" } : r
      )
    );
  };

  const pendingRefunds = list.filter(r => r.status === "pending").length;

  return (
    <Card className="p-4 sm:p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Refund Center
            </h3>
            <p className="text-sm text-gray-500 mt-1">Manage and process refund requests</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary w-fit"
        >
          {pendingRefunds} pending refunds
        </Badge>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <RefreshCw className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No refund requests found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-lg">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="font-semibold">Refund ID</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Trip</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {list.map((refund) => (
                  <TableRow
                    key={refund.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {refund.id}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {refund.user}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <p className="text-sm text-gray-700">{refund.tripId}</p>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 font-semibold text-red-700">
                        <IndianRupee className="w-3 h-3" />
                        {refund.amount}
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {refund.type}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge 
                        className={
                          refund.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {refund.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {refund.status === "pending" ? (
                        <Button
                          size="sm"
                          className="bg-primary text-white hover:bg-primary/90 text-xs h-8"
                          onClick={() => markProcessed(refund.id)}
                        >
                          Process Refund
                        </Button>
                      ) : (
                        <span className="text-gray-500 text-sm font-medium">Completed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards (hidden on desktop) */}
          <div className="sm:hidden space-y-3">
            {list.map((refund) => (
              <Card
                key={refund.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-3">
                  {/* Header - Refund ID and Amount */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Refund ID
                      </p>
                      <p className="font-medium text-gray-700">
                        {refund.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-red-700">
                      <IndianRupee className="w-3 h-3" />
                      <span>{refund.amount}</span>
                    </div>
                  </div>

                  {/* User and Trip Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        User
                      </p>
                      <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-700 text-sm">{refund.user}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Trip ID
                      </p>
                      <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-700 text-sm">{refund.tripId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Type and Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Type
                      </p>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 w-full justify-center">
                        {refund.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Status
                      </p>
                      <Badge 
                        className={
                          refund.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800 w-full justify-center" 
                            : "bg-green-100 text-green-800 w-full justify-center"
                        }
                      >
                        {refund.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 border-t border-gray-200">
                    {refund.status === "pending" ? (
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        onClick={() => markProcessed(refund.id)}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Process Refund
                      </Button>
                    ) : (
                      <div className="text-center py-2">
                        <span className="text-green-600 text-sm font-medium flex items-center justify-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Refund Completed
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}