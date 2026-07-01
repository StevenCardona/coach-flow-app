import { z } from "zod";

const booleanFromQuery = z
  .union([z.literal("true"), z.literal("false")])
  .transform((value) => value === "true")
  .optional();

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  isActive: booleanFromQuery,
});

export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;
