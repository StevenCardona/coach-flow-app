"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormField } from "@/components/cf";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { resolvePostAuthPath } from "@/lib/auth/post-auth-redirect";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";
import { useAuthContext } from "@/providers/auth-provider";

import { useChangePasswordMutation } from "../hooks/mutations";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña debe ser diferente a la actual",
    path: ["newPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const { setSessionToken } = useAuthContext();
  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: (data) => {
          setSessionToken(data.token);
          toast.success("Contraseña actualizada correctamente");

          const path = resolvePostAuthPath({
            role: data.user.role,
            mustChangePassword: data.mustChangePassword,
          });

          window.location.assign(path);
        },
        onError: (error) => {
          toast.error("No se pudo cambiar la contraseña", {
            description: getApiErrorMessage(error),
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Cambia tu contraseña</CardTitle>
        <CardDescription>
          Por seguridad debes establecer una nueva contraseña antes de continuar
          usando la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              label="Contraseña actual"
              type="password"
              placeholder="Tu contraseña actual"
              required
            />
            <FormField
              control={form.control}
              name="newPassword"
              label="Nueva contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              label="Confirmar nueva contraseña"
              type="password"
              placeholder="Repite la nueva contraseña"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending
                ? "Guardando..."
                : "Guardar contraseña"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
