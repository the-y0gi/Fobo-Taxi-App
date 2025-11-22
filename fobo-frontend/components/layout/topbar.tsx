// "use client";

// import { Bell, Menu } from "lucide-react";

// export function Topbar() {
//   return (
//     <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
//       {/* Left */}
//       <div className="flex items-center gap-3">
//         <Menu className="w-6 h-6 md:hidden" />
//         <h2 className="text-lg font-semibold">Dashboard</h2>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <Bell className="w-5 h-5 text-gray-600" />
//         <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { Bell, Menu } from "lucide-react";

export function Topbar({ setOpen }: any) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between fixed top-0 left-0 right-0 md:ml-64 z-30">
      
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 md:hidden" onClick={() => setOpen(true)} />
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
