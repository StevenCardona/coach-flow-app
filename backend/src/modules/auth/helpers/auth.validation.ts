import { z } from "zod";

import { Role } from "../../../types";

export const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const registerSchema = z.object({
  role: z.literal(Role.COACH),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z
    .string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
});

export type LoginBody = z.infer<typeof loginSchema>;
export type RegisterBody = z.infer<typeof registerSchema>;
export type ChangePasswordBody = z.infer<typeof changePasswordSchema>;
