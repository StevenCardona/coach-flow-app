import { cookies } from "next/headers";

import { ACCESS_TOKEN_COOKIE } from "./token-storage";

export async function getServerHasAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(ACCESS_TOKEN_COOKIE)?.value);
}
