import jwt, { type SignOptions } from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";
import type { Role } from "../types";

export interface AccessTokenPayload {
  sub: string;
  role: Role;
  mustChangePassword: boolean;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
}
