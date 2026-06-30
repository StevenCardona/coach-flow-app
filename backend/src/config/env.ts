import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const PORT = Number(process.env.PORT) || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 900000;

export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || "";

export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || "";
