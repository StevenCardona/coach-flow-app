"use client";

import { Search } from "lucide-react";
import * as React from "react";

import { EmptyState } from "@/components/cf/feedback/empty-state";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => string;
  className?: string;
}

function getNestedValue<T>(row: T, key: keyof T): unknown {
  return row[key];
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
  searchKeys,
  searchPlaceholder = "Buscar...",
  emptyMessage = "No hay registros",
  getRowKey,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const searchable = searchKeys && searchKeys.length > 0;

  const filteredData = React.useMemo(() => {
    if (!searchable || !search.trim()) {
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
  }, [data, search, searchKeys, searchable]);

  const recordLabel =
    searchable && search.trim()
      ? `${filteredData.length} de ${data.length} registros`
      : `${data.length} ${data.length === 1 ? "registro" : "registros"}`;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {searchable ? (
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8"
            />
          </div>
        ) : (
          <div />
        )}
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
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={column.className}
                  >
                    {column.header}
                  </TableHead>
                ))}
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
                        : formatCellValue(row[column.key] as unknown)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
