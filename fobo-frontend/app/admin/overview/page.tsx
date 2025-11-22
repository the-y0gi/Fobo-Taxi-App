import { dailyStats } from "@/lib/dummy/stats";
import { StatCard } from "@/components/cards/stat-card";
import { RidesLineChart } from "@/components/charts/line-chart";
import { RevenueBarChart } from "@/components/charts/bar-chart";
import { RecentTripsTable } from "./recent-trips";

export default async function OverviewPage() {
  //  delay for testing loaders
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="space-y-8">

      {/* Laptop/Desktop View */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Mobile View (Horizontal Scroll) */}
      <div className="sm:hidden overflow-x-auto pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 min-w-max text-center">
          {dailyStats.map((stat) => (
            <div key={stat.label} className="w-38 sm:w-auto">
              <StatCard label={stat.label} value={stat.value} />
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Rides Per Hour</h3>
          <RidesLineChart />
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue vs Refunds</h3>
          <RevenueBarChart />
        </div>
      </div>

      {/* Recent Trips */}
      <RecentTripsTable />
    </div>
  );
}



//api integrate code
// import { StatCard } from "@/components/cards/stat-card";
// import { RidesLineChart } from "@/components/charts/line-chart";
// import { RevenueBarChart } from "@/components/charts/bar-chart";
// import { RecentTripsTable } from "./recent-trips";
// import { adminService } from "@/api/adminService";

// export default async function OverviewPage() {
//   // Parallel data fetching
//   const [statsResponse, ridesResponse, revenueResponse, tripsResponse] = await Promise.all([
//     adminService.dashboard.getStats(),
//     adminService.dashboard.getRidesPerHour(),
//     adminService.dashboard.getRevenueMetrics(),
//     adminService.dashboard.getRecentTrips()
//   ]);

//   // Extract data
//   const stats = statsResponse.data.data;
//   const ridesChartData = ridesResponse.data.data;
//   const revenueChartData = revenueResponse.data.data;
//   const recentTrips = tripsResponse.data.data;

//   // Format stats exactly like your dummy data
//   const dailyStats = [
//     { 
//       label: "Total Rides Today", 
//       value: stats?.totalRidesToday || 0 
//     },
//     { 
//       label: "Completed Rides", 
//       value: stats?.completedRidesToday || 0 
//     },
//     { 
//       label: "Cancelled Rides", 
//       value: stats?.cancelledRidesToday || 0 
//     },
//     { 
//       label: "Active Drivers", 
//       value: stats?.activeDriversCount || 0 
//     },
//     { 
//       label: "Offline Drivers", 
//       value: stats?.offlineDriversCount || 0 
//     },
//     { 
//       label: "Total Revenue", 
//       value: `₹ ${(stats?.todayRevenue || 0).toLocaleString('en-IN')}` 
//     },
//     { 
//       label: "Refund Requests", 
//       value: stats?.refundRequestsCount || 0 
//     }
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Stats Cards - Same as your existing structure */}
//       <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {dailyStats.slice(0, 4).map((stat) => (
//           <StatCard key={stat.label} label={stat.label} value={stat.value} />
//         ))}
//       </div>

//       {/* Mobile Stats View */}
//       <div className="sm:hidden overflow-x-auto pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 min-w-max text-center">
//           {dailyStats.map((stat) => (
//             <div key={stat.label} className="w-38 sm:w-auto">
//               <StatCard label={stat.label} value={stat.value} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Additional Stats Row for Desktop */}
//       <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {dailyStats.slice(4).map((stat) => (
//           <StatCard key={stat.label} label={stat.label} value={stat.value} />
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 border rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Rides Per Hour</h3>
//           <RidesLineChart data={ridesChartData} />
//         </div>

//         <div className="bg-white p-4 border rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Revenue vs Refunds</h3>
//           <RevenueBarChart data={revenueChartData} />
//         </div>
//       </div>

//       {/* Recent Trips Table */}
//       <RecentTripsTable trips={recentTrips} />
//     </div>
//   );
// }