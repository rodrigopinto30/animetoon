"use client";

import { useEffect, useState } from "react";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { ControllerRenderProps, useForm } from "react-hook-form";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(null);
    try {
      await login(values);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      setServerError("Credenciales incorrectas o error de servidor.");
      toast.error("Credenciales incorrectas", {
        description: "Por favor, verifica tu correo y contraseña.",
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 bg-background/40 backdrop-blur-md border rounded-3xl shadow-2xl"
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase">
          Bienvenido
        </h2>
        <p className="text-muted-foreground text-sm">
          Introduce tus credenciales para acceder
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {serverError && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-xl text-center border border-destructive/20">
              {serverError}
            </div>
          )}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({
                field,
              }: {
                field: ControllerRenderProps<any, "email">;
              }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      type="email"
                      className="bg-background/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({
                field,
              }: {
                field: ControllerRenderProps<any, "password">;
              }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        className="bg-background/50 pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full font-bold h-12"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "INICIANDO..." : "ENTRAR"}
            </Button>

            <div className="flex flex-col gap-2 text-center text-sm">
              <Link
                href="/forgot-password"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <p className="text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="text-primary font-bold hover:underline"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
