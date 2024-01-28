import { Fragment } from "react";
import { Skeleton } from "~/components/ui/Skeleton";

interface MetricCardSkeletonProps {}

export function MetricCardSkeleton({}: MetricCardSkeletonProps): JSX.Element | null {
  return (
    <Fragment>
      <Skeleton className="mt-1 h-7 w-36" />
      <Skeleton className="h-4 w-52" />
    </Fragment>
  );
}
