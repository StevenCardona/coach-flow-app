import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type CfSkeletonVariant =
  | "page"
  | "table"
  | "card"
  | "form"
  | "header"
  | "list"
  | "metric";

export interface CfSkeletonProps {
  variant?: CfSkeletonVariant;
  rows?: number;
  fields?: number;
  items?: number;
  count?: number;
  className?: string;
}

function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="size-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-4 h-8 w-20" />
      <Skeleton className="mt-2 h-4 w-40" />
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="rounded-lg border border-border">
        <div className="border-b border-border p-3">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="border-b border-border p-3 last:border-0">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <Skeleton className="h-5 w-40" />
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
      <div className="flex justify-end gap-2 pt-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}

function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-border p-3"
        >
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

function MetricSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <HeaderSkeleton />
      <MetricSkeleton count={3} />
      <TableSkeleton rows={4} />
    </div>
  );
}

export function CfSkeleton({
  variant = "card",
  rows,
  fields,
  items,
  count,
  className,
}: CfSkeletonProps) {
  return (
    <div className={cn(className)} aria-busy="true" aria-label="Cargando contenido">
      {variant === "page" && <PageSkeleton />}
      {variant === "header" && <HeaderSkeleton />}
      {variant === "card" && <CardSkeleton />}
      {variant === "table" && <TableSkeleton rows={rows} />}
      {variant === "form" && <FormSkeleton fields={fields} />}
      {variant === "list" && <ListSkeleton items={items} />}
      {variant === "metric" && <MetricSkeleton count={count} />}
    </div>
  );
}
