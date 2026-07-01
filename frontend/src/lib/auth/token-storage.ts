import Cookies from "js-cookie";

export const ACCESS_TOKEN_COOKIE = "cf_access_token";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_COOKIE, token, COOKIE_OPTIONS);
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_COOKIE);
}

export function clearAccessToken() {
  Cookies.remove(ACCESS_TOKEN_COOKIE, { path: "/" });
}

export function hasAccessToken(): boolean {
  return Boolean(getAccessToken());
}
