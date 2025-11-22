// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   LayoutDashboard,
//   Users,
//   Car,
//   Route,
//   Wallet,
//   X,
// } from "lucide-react";

// const menu = [
//   { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
//   { name: "Driver Management", href: "/admin/drivers", icon: Car },
//   { name: "Trip Management", href: "/admin/trips", icon: Route },
//   { name: "User Management", href: "/admin/users", icon: Users },
//   { name: "Payments & Refunds", href: "/admin/payments", icon: Wallet },
// ];

// export function Sidebar({ open, setOpen }: any) {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:flex fixed left-0 top-0 w-64 h-full bg-white border-r flex-col z-40">
//         <div className="p-6 text-2xl font-bold text-primary">Admin Panel</div>

//         <nav className="flex-1 px-3 space-y-2 overflow-y-auto pb-6">
//           {menu.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname.startsWith(item.href);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 )}
//               >
//                 <Icon className="w-5 h-5" />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* Mobile Drawer Sidebar */}
//       <aside
//         className={cn(
//           "fixed top-0 left-0 h-full w-64 bg-white border-r flex flex-col z-50 transform transition-transform duration-300 md:hidden",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="p-6 flex items-center justify-between">
//           <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
//           <button onClick={() => setOpen(false)}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <nav className="flex-1 px-3 space-y-2 overflow-y-auto pb-6">
//           {menu.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname.startsWith(item.href);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={cn(
//                   "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 )}
//               >
//                 <Icon className="w-5 h-5" />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Car,
  Route,
  Wallet,
  X,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useEffect } from "react";

const menu = [
  { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { name: "Driver Management", href: "/admin/drivers", icon: Car },
  { name: "Trip Management", href: "/admin/trips", icon: Route },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Payments & Refunds", href: "/admin/payments", icon: Wallet },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 flex-col z-40 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500 mt-0.5">Management Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-primary ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {/* <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-1.5 rounded-lg bg-gray-100">
              <Settings className="w-4 h-4" />
            </div>
            <span>Settings</span>
          </div>
        </div> */}
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500 mt-0.5">Management Console</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-4 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-base">{item.name}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-primary ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-1.5 rounded-lg bg-gray-100">
              <Settings className="w-4 h-4" />
            </div>
            <span className="text-base">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}