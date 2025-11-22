// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import DailyView from "./daily-view";
// import WeeklyView from "./weekly-view";
// import MonthlyView from "./monthly-view";

// export default function TripsPage() {
//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="daily" className="w-full">
//         {/* Header + Tabs */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
//           <h1 className="text-2xl font-bold text-gray-900">Trip Management</h1>

//           {/* Tabs should scroll horizontally on mobile */}
//           <div className="overflow-x-auto pb-1">
//             <TabsList className="flex bg-white border border-primary/20 rounded-lg shadow-sm min-w-max">
//               <TabsTrigger
//                 value="daily"
//                 className="
//     text-primary 
//     px-3 py-1 
//     rounded-md 
//     text-sm 
//     sm:text-base sm:px-4
//     data-[state=active]:bg-primary 
//     data-[state=active]:text-white
//   "
//               >
//                 Daily View
//               </TabsTrigger>

//               <TabsTrigger
//                 value="weekly"
//                 className="
//     text-primary 
//     px-3 py-1 
//     rounded-md 
//     text-sm 
//     sm:text-base sm:px-4
//     data-[state=active]:bg-primary 
//     data-[state=active]:text-white
//   "
//               >
//                 Weekly View
//               </TabsTrigger>

//               <TabsTrigger
//                 value="monthly"
//                 className="
//     text-primary 
//     px-3 py-1 
//     rounded-md 
//     text-sm 
//     sm:text-base sm:px-4
//     data-[state=active]:bg-primary 
//     data-[state=active]:text-white
//   "
//               >
//                 Monthly View
//               </TabsTrigger>
//             </TabsList>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <TabsContent value="daily">
//           <DailyView />
//         </TabsContent>

//         <TabsContent value="weekly">
//           <WeeklyView />
//         </TabsContent>

//         <TabsContent value="monthly">
//           <MonthlyView />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }



//api integrate code

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyView from "./daily-view";
import WeeklyView from "./weekly-view";
import MonthlyView from "./monthly-view";

export default function TripsPage() {
  return (
    <div className="space-y-6 p-4">
      <Tabs defaultValue="daily" className="w-full">
        {/* Header + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Trip Management</h1>

          {/* Tabs should scroll horizontally on mobile */}
          <div className="overflow-x-auto pb-1">
            <TabsList className="flex bg-white border border-primary/20 rounded-lg shadow-sm min-w-max">
              <TabsTrigger
                value="daily"
                className="text-primary px-3 py-1 rounded-md text-sm sm:text-base sm:px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Daily View
              </TabsTrigger>

              <TabsTrigger
                value="weekly"
                className="text-primary px-3 py-1 rounded-md text-sm sm:text-base sm:px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Weekly View
              </TabsTrigger>

              <TabsTrigger
                value="monthly"
                className="text-primary px-3 py-1 rounded-md text-sm sm:text-base sm:px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Monthly View
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* CONTENT */}
        <TabsContent value="daily">
          <DailyView />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyView />
        </TabsContent>

        <TabsContent value="monthly">
          <MonthlyView />
        </TabsContent>
      </Tabs>
    </div>
  );
}