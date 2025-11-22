import { drivers } from "@/lib/dummy/drivers";
import { DriverCard } from "@/components/cards/driver-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DriversPage() {
  return (
    <div className="space-y-6 p-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-sm text-muted mt-1">
            Manage your fleet of {drivers.length} drivers.
          </p>
        </div>

        <Link href="/admin/drivers/add">
          <Button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 text-sm rounded-lg shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light w-4 h-4" />
          <Input
            placeholder="Search drivers by name, phone, or vehicle..."
            className="pl-10 py-2 text-sm border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Online */}
        <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
          <p className="text-sm text-success font-medium">Online</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">1</p>
        </div>

        {/* Offline */}
        <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
          <p className="text-sm text-muted-dark font-medium">Offline</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">1</p>
        </div>

        {/* On Ride */}
        <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
          <p className="text-sm text-primary font-medium">On Ride</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">0</p>
        </div>

        {/* Disabled */}
        <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
          <p className="text-sm text-danger font-medium">Disabled</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">0</p>
        </div>

      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}



//api integrate

// "use client";

// import { useState, useEffect } from "react";
// import { drivers } from "@/lib/dummy/drivers";
// import { DriverCard } from "@/components/cards/driver-card";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Plus, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { adminService } from "@/api/adminService";

// export default function DriversPage() {
//   const [drivers, setDrivers] = useState([]);
//   const [stats, setStats] = useState({ online: 0, offline: 0, onRide: 0, disabled: 0 });
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchDrivers();
//     fetchStats();
//   }, [search]);

//   const fetchDrivers = async () => {
//     try {
//       const response = await adminService.drivers.getAll({ search });
//       setDrivers(response.data.data.drivers);
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await adminService.drivers.getStats();
//       setStats(response.data.data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const handleStatusUpdate = async (driverId, isActive) => {
//     try {
//       await adminService.drivers.updateStatus(driverId, { isActive });
//       // Refresh drivers list
//       fetchDrivers();
//       fetchStats();
//     } catch (error) {
//       console.error("Error updating driver status:", error);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center p-8">Loading drivers...</div>;
//   }

//   return (
//     <div className="space-y-6 p-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
//           <p className="text-sm text-muted mt-1">
//             Manage your fleet of {drivers.length} drivers.
//           </p>
//         </div>

//         <Link href="/admin/drivers/add">
//           <Button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 text-sm rounded-lg shadow-sm">
//             <Plus className="w-4 h-4 mr-2" />
//             Add Driver
//           </Button>
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light w-4 h-4" />
//           <Input
//             placeholder="Search drivers by name, phone, or vehicle..."
//             className="pl-10 py-2 text-sm border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary/30"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
//           <p className="text-sm text-success font-medium">Online</p>
//           <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.online}</p>
//         </div>

//         <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
//           <p className="text-sm text-muted-dark font-medium">Offline</p>
//           <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.offline}</p>
//         </div>

//         <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
//           <p className="text-sm text-primary font-medium">On Ride</p>
//           <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.onRide}</p>
//         </div>

//         <div className="p-4 rounded-xl border border-border bg-card hover:shadow-sm transition">
//           <p className="text-sm text-danger font-medium">Disabled</p>
//           <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.disabled}</p>
//         </div>
//       </div>

//       {/* Drivers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
//         {drivers.map((driver) => (
//           <DriverCard 
//             key={driver.id} 
//             driver={driver} 
//             onStatusUpdate={handleStatusUpdate}
//           />
//         ))}
//       </div>

//       {drivers.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No drivers found.</p>
//         </div>
//       )}
//     </div>
//   );
// }