import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const PORT = Number(process.env.PORT) || 5500;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const DATABASE_URL = process.env.DATABASE_URL || "";

function deriveDirectDatabaseUrl(url: string): string {
  if (!url) return "";
  return url.replace("-pooler.", ".");
}

export const DATABASE_URL_DIRECT =
  process.env.DATABASE_URL_DIRECT || deriveDirectDatabaseUrl(DATABASE_URL);

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET es requerido en el archivo .env");
}
