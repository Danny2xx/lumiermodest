import { LoadingPage, Skeleton } from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <LoadingPage>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-4">
            <Skeleton className="h-16 w-14 flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-2 h-3 w-32" />
            </div>
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    </LoadingPage>
  );
}
