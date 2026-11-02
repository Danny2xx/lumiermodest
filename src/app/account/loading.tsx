import { FlourishSkeleton, LoadingPage, Skeleton } from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <LoadingPage className="mx-auto max-w-2xl px-6 py-20">
      <div className="flex flex-col items-center">
        <Skeleton className="h-12 w-48" />
        <div className="mt-4">
          <FlourishSkeleton />
        </div>
        <Skeleton className="mt-8 h-3 w-64" />
      </div>
      <Skeleton className="mt-10 h-28 w-full" />
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-11 w-36" />
      </div>
    </LoadingPage>
  );
}
