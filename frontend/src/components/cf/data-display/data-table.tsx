"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import * as React from "react";

import { EmptyState } from "@/components/cf/feedback/empty-state";
import { Pagination } from "@/components/cf/data-display/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginationMeta, SortOrder } from "@/lib/types/pagination.types";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

export type StatusFilterValue = "all" | "active" | "inactive";

export interface DataTableSorting {
  sortBy?: string;
  sortOrder?: SortOrder;
  onSortChange: (sortBy: string) => void;
}

export interface DataTablePagination {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  mode?: "client" | "server";
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  statusFilter?: StatusFilterValue;
  onStatusFilterChange?: (value: StatusFilterValue) => void;
  sorting?: DataTableSorting;
  pagination?: DataTablePagination;
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => string;
  className?: string;
}

function getNestedValue<T>(row: T, key: keyof T | string): unknown {
  return row[key as keyof T];
}

function formatCellValue(value: unknown): React.ReactNode {
  if (value == null || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  return String(value);
}

export function DataTable<T extends object>({
  columns,
  data,
  mode = "client",
  searchKeys,
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sorting,
  pagination,
  emptyMessage = "No hay registros",
  getRowKey,
  className,
}: DataTableProps<T>) {
  const isServer = mode === "server";
  const [clientSearch, setClientSearch] = React.useState("");
  const searchable = Boolean(searchKeys?.length) || isServer;

  const search = isServer ? (searchValue ?? "") : clientSearch;

  const filteredData = React.useMemo(() => {
    if (isServer || !searchKeys?.length || !search.trim()) {
      return data;
    }

    const query = search.trim().toLowerCase();

    return data.filter((row) =>
      searchKeys.some((key) => {
        const value = getNestedValue(row, key);
        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      }),
    );
  }, [data, isServer, search, searchKeys]);

  const recordLabel = isServer
    ? pagination
      ? `${pagination.meta.total} ${pagination.meta.total === 1 ? "registro" : "registros"}`
      : `${data.length} ${data.length === 1 ? "registro" : "registros"}`
    : searchable && search.trim()
      ? `${filteredData.length} de ${data.length} registros`
      : `${data.length} ${data.length === 1 ? "registro" : "registros"}`;

  const handleSearchChange = (value: string) => {
    if (isServer) {
      onSearchChange?.(value);
      return;
    }

    setClientSearch(value);
  };

  const renderSortIcon = (columnKey: string) => {
    if (!sorting || sorting.sortBy !== columnKey) {
      return <ArrowUpDown className="size-3.5 text-muted-foreground" />;
    }

    return sorting.sortOrder === "asc" ? (
      <ArrowUp className="size-3.5" />
    ) : (
      <ArrowDown className="size-3.5" />
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {searchable ? (
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
              />
            </div>
          ) : null}

          {onStatusFilterChange ? (
            <Select
              value={statusFilter ?? "all"}
              onValueChange={(value) =>
                onStatusFilterChange(value as StatusFilterValue)
              }
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          ) : null}
        </div>

        <p className="text-body-sm text-muted-foreground">{recordLabel}</p>
      </div>

      {filteredData.length === 0 ? (
        <EmptyState
          title={emptyMessage}
          description={
            searchable && search.trim()
              ? "Prueba con otro término de búsqueda."
              : undefined
          }
        />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => {
                  const columnKey = String(column.key);
                  const isSortable = Boolean(column.sortable && sorting);

                  return (
                    <TableHead
                      key={columnKey}
                      className={column.className}
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => sorting!.onSortChange(columnKey)}
                        >
                          {column.header}
                          {renderSortIcon(columnKey)}
                        </button>
                      ) : (
                        column.header
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={
                    getRowKey?.(row, index) ??
                    `${String(columns[0]?.key ?? "row")}-${index}`
                  }
                >
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.className}
                    >
                      {column.render
                        ? column.render(row)
                        : formatCellValue(
                            row[column.key as keyof T] as unknown,
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination ? (
        <Pagination
          meta={pagination.meta}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      ) : null}
    </div>
  );
}
