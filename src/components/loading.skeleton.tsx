import { Skeleton } from "./ui/skeleton";

export const WeatherSkeleton = () => {
  return (
    <div className="grid gap-6">
      {/* Single column of skeletons */}
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />{" "}
        {/* First Skeleton */}
        <Skeleton className="h-[300px] w-full rounded-lg" />{" "}
        {/* Second Skeleton */}
        {/* Responsive grid with 2 columns on medium screens */}
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />{" "}
          {/* Third Skeleton */}
          <Skeleton className="h-[300px] w-full rounded-lg" />{" "}
          {/* Fourth Skeleton */}
        </div>
      </div>
    </div>
  );
};
