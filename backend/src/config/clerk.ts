import { createClerkClient } from "@clerk/backend";

import { CLERK_SECRET_KEY } from "./env";

export const clerkClient = createClerkClient({ secretKey: CLERK_SECRET_KEY });
