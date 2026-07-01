import { z } from "zod";

import { Gender } from "@/lib/types/entities";

const dateOnlySchema = z
  .string()
  .min(1, "La fecha es obligatoria")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (AAAA-MM-DD)");

export const personalInfoFormSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(5, "El teléfono debe tener al menos 5 caracteres")
    .max(30, "El teléfono no puede superar 30 caracteres"),
  birthday: dateOnlySchema,
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: "Selecciona un género",
  }),
  observations: z.string().trim().max(2000).optional().nullable(),
  medicalCondition: z.string().trim().max(2000).optional().nullable(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

export const personalInfoDefaultValues: PersonalInfoFormValues = {
  phoneNumber: "",
  birthday: "",
  gender: Gender.MALE,
  observations: "",
  medicalCondition: "",
};
