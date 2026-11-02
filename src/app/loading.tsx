import { ContentSkeleton, LoadingPage } from "@/components/motion/Skeleton";

export default function Loading() {
  return (
    <LoadingPage>
      <ContentSkeleton />
    </LoadingPage>
  );
}
