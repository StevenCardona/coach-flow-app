"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

import { useLoginMutation } from "../hooks/mutations";

const signInSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido").max(255),
  password: z.string().min(1, "La contraseña es requerida"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const { setSessionToken } = useAuthContext();
  const loginMutation = useLoginMutation();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        setSessionToken(data.token);
        toast.success("Bienvenido de nuevo");

        const path = resolvePostAuthPath({
          role: data.user.role,
          mustChangePassword: data.mustChangePassword,
          redirectUrl: searchParams.get("redirect_url"),
        });

        window.location.assign(path);
      },
      onError: (error) => {
        toast.error("No se pudo iniciar sesión", {
          description: getApiErrorMessage(error),
        });
      },
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Accede con tu correo y contraseña. Coaches y alumnos usan esta misma
          pantalla.
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
              placeholder="Tu contraseña"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Ingresando..." : "Iniciar sesión"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Eres coach y aún no tienes cuenta?{" "}
              <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
                Regístrate
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
