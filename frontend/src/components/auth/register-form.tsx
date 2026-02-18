"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { signup } from "@/services/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Introduce un correo válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = values;
      await signup(signupData);

      toast.success("¡Cuenta creada!", {
        description: "Bienvenido a Animetoon. Redirigiendo...",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Error al registrarse", {
        description: error.message || "Credenciales inválidas.",
      });
      resetField("password");
      resetField("confirmPassword");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 bg-background/40 backdrop-blur-md border rounded-3xl shadow-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">
            Registro
          </h2>
          <p className="text-muted-foreground text-sm">
            Crea tu cuenta de lector hoy
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="Tu alias"
              className={
                errors.username
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {errors.username && (
              <p className="text-red-500 text-xs font-bold italic uppercase">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="ejemplo@correo.com"
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-bold italic uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-bold italic uppercase">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Repite tu contraseña"
              className={
                errors.confirmPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs font-bold italic uppercase">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full font-bold h-12"
          disabled={loading}
        >
          {loading ? "Procesando..." : "CREAR CUENTA"}
        </Button>
      </form>
    </motion.div>
  );
}
