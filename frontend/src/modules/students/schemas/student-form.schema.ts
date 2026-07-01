import { z } from "zod";

import { Gender } from "@/lib/types/entities";

const optionalText = z.string().optional();

const planIdField = z
  .string()
  .uuid("Selecciona un plan válido")
  .optional()
  .nullable();

export const createStudentFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido")
    .max(255, "El correo no puede superar 255 caracteres"),
  phoneNumber: optionalText,
  birthday: optionalText,
  gender: z.nativeEnum(Gender).optional().nullable(),
  observations: optionalText,
  medicalCondition: optionalText,
  planId: planIdField,
});

export const editStudentFormSchema = createStudentFormSchema.omit({ email: true });

export type CreateStudentFormValues = z.infer<typeof createStudentFormSchema>;
export type EditStudentFormValues = z.infer<typeof editStudentFormSchema>;

export const createStudentDefaultValues: CreateStudentFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  birthday: "",
  gender: null,
  observations: "",
  medicalCondition: "",
  planId: null,
};

export const editStudentDefaultValues: EditStudentFormValues = {
  name: "",
  phoneNumber: "",
  birthday: "",
  gender: null,
  observations: "",
  medicalCondition: "",
  planId: null,
};
