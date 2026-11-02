import {
  LoadingPage,
  ProductDetailSkeleton,
  ProductGridSkeleton,
  Skeleton,
} from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <LoadingPage>
      <ProductDetailSkeleton />
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <Skeleton className="mb-8 h-6 w-48" />
        <ProductGridSkeleton count={3} cols="sm:grid-cols-3" />
      </div>
    </LoadingPage>
  );
}
