import {
  CollectionHeaderSkeleton,
  FilterBarSkeleton,
  LoadingPage,
  ProductGridSkeleton,
} from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <div className="bg-espresso">
      <LoadingPage className="mx-auto max-w-6xl px-6 py-16">
        <CollectionHeaderSkeleton dark />
        <FilterBarSkeleton dark />
        <ProductGridSkeleton count={6} dark />
      </LoadingPage>
    </div>
  );
}
