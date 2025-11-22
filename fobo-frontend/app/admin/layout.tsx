// import { Sidebar } from "@/components/layout/sidebar";
// import { Topbar } from "@/components/layout/topbar";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen bg-background flex">

//       {/* Sidebar (Desktop) */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         <Topbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop / Mobile Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar setOpen={setOpen} />

        <main className="p-6 pt-24">{children}</main>
      </div>
    </div>
  );
}
