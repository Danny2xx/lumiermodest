import {
  CollectionHeaderSkeleton,
  FilterBarSkeleton,
  LoadingPage,
  ProductGridSkeleton,
} from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <LoadingPage className="mx-auto max-w-6xl px-6 py-16">
      <CollectionHeaderSkeleton />
      <FilterBarSkeleton />
      <ProductGridSkeleton count={6} />
    </LoadingPage>
  );
}
