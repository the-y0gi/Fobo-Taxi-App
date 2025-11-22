import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="w-full h-64 bg-white p-4 border rounded-xl shadow-sm">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}
