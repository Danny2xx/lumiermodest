import type { ReactNode } from "react";

/** Shimmering placeholder block. */
export function Skeleton({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div aria-hidden className={`${dark ? "skeleton-dark" : "skeleton"} ${className}`} />
  );
}

/**
 * Wrapper for route loading states. Fades in after a short delay so fast
 * navigations never flash a skeleton.
 */
export function LoadingPage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`animate-fade-in [animation-delay:140ms] ${className}`}
    >
      <span className="sr-only">Loading</span>
      {children}
    </div>
  );
}

export function FlourishSkeleton({
  dark = false,
  align = "center",
}: {
  dark?: boolean;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === "start" ? "justify-start" : "justify-center"}`}
    >
      <Skeleton dark={dark} className="h-px w-9" />
      <Skeleton dark={dark} className="h-2 w-2 rotate-45" />
      <Skeleton dark={dark} className="h-px w-9" />
    </div>
  );
}

export function ProductCardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <Skeleton dark={dark} className="aspect-[3/4] w-full" />
      <div className="mt-3 flex flex-col items-center gap-2">
        <Skeleton dark={dark} className="h-4 w-2/5" />
        <Skeleton dark={dark} className="h-3 w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 6,
  dark = false,
  cols = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  count?: number;
  dark?: boolean;
  cols?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-10 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} dark={dark} />
      ))}
    </div>
  );
}

export function CollectionHeaderSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mb-10 pb-10">
      <Skeleton dark={dark} className="mb-3 h-3 w-28" />
      <Skeleton dark={dark} className="h-12 w-64 sm:h-14 sm:w-80" />
      <Skeleton dark={dark} className="mt-4 h-4 w-full max-w-md" />
      <div className="mt-8">
        <FlourishSkeleton dark={dark} />
      </div>
    </div>
  );
}

export function FilterBarSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-4">
        <Skeleton dark={dark} className="h-7 w-32" />
        <Skeleton dark={dark} className="h-7 w-24" />
        <Skeleton dark={dark} className="h-7 w-36" />
      </div>
      <Skeleton dark={dark} className="h-4 w-16" />
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Skeleton className="h-12 w-56" />
      <div className="mt-4">
        <FlourishSkeleton align="start" />
      </div>
      <div className="mt-8 space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="mt-6 h-3 w-full" />
        <Skeleton className="h-3 w-10/12" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <Skeleton className="aspect-[3/4] w-full" />
        <div className="mt-3 flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-16" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="mt-3 h-5 w-28" />
        <Skeleton className="mt-2 h-3 w-48" />
        <Skeleton className="mt-10 h-3 w-10" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-12" />
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-[52px] flex-1 sm:w-64 sm:flex-none" />
          <Skeleton className="h-[52px] w-[52px]" />
        </div>
        <Skeleton className="mt-6 h-3 w-72" />
        <div className="mt-8 space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
