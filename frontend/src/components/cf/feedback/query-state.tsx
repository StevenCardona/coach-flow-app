"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import * as React from "react";

import { EmptyState } from "@/components/cf/feedback/empty-state";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/http/api-helpers";

export interface QueryStateProps<TData> {
  query: Pick<UseQueryResult<TData, Error>, "isPending" | "isError" | "error" | "data" | "refetch">;
  skeleton?: React.ReactNode;
  empty?: React.ReactNode;
  errorTitle?: string;
  isEmpty?: (data: TData) => boolean;
  children: (data: TData) => React.ReactNode;
}

export function QueryState<TData>({
  query,
  skeleton,
  empty,
  errorTitle = "No se pudo cargar la información",
  isEmpty,
  children,
}: QueryStateProps<TData>) {
  if (query.isPending) {
    return <>{skeleton}</>;
  }

  if (query.isError) {
    return (
      <EmptyState
        title={errorTitle}
        description={getApiErrorMessage(query.error)}
        action={
          <Button type="button" variant="outline" onClick={() => query.refetch()}>
            Reintentar
          </Button>
        }
      />
    );
  }

  if (query.data == null) {
    return (
      empty ?? (
        <EmptyState title="No hay información disponible" />
      )
    );
  }

  if (isEmpty?.(query.data)) {
    return (
      empty ?? (
        <EmptyState title="No hay registros" />
      )
    );
  }

  return <>{children(query.data)}</>;
}
