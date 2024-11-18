import { Skeleton } from "@/components/ui/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="flex gap-8">
      <Skeleton className="w-72 h-72 rounded-lg" />
      <div className="flex-1">
        <div className="space-y-2 ">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 w-[80px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
    </div>
  );
}
