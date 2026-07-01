"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { Role } from "@/lib/types/entities";
import { toast } from "@/lib/toast";
import { useAuthContext } from "@/providers/auth-provider";

import { useRegisterMutation } from "../hooks/mutations";

const signUpSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Ingresa un correo válido").max(255),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { setSessionToken } = useAuthContext();
  const registerMutation = useRegisterMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    registerMutation.mutate(
      { ...values, role: Role.COACH },
      {
        onSuccess: (data) => {
          setSessionToken(data.token);
          toast.success("Cuenta creada correctamente");

          const path = resolvePostAuthPath({
            role: data.user.role,
            mustChangePassword: data.mustChangePassword,
          });

          window.location.assign(path);
        },
        onError: (error) => {
          toast.error("No se pudo crear la cuenta", {
            description: getApiErrorMessage(error),
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear cuenta de coach</CardTitle>
        <CardDescription>
          Registra tu perfil de entrenador. Los alumnos son creados por su
          coach desde el panel de estudiantes.
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
              name="name"
              label="Nombre"
              type="text"
              placeholder="Tu nombre completo"
              required
            />
            <FormField
              control={form.control}
              name="email"
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              required
            />
            <FormField
              control={form.control}
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
