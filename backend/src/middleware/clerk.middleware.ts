import { clerkMiddleware as clerkAuthMiddleware } from "@clerk/express";

import { CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY } from "../config/env";

export const clerkMiddleware = clerkAuthMiddleware({
  secretKey: CLERK_SECRET_KEY,
  publishableKey: CLERK_PUBLISHABLE_KEY,
});
