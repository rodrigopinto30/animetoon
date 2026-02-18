"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/api";

const loginSchema = z.object({
  email: z.string().email("Introduce un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(null);
    try {
      await login(values);
      toast.success("¡Bienvenido de nuevo!");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      setServerError(error.message || "Credenciales incorrectas");
      resetField("password");
      toast.error("Error al entrar");
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-xl text-center border border-destructive/20 animate-shake">
            {serverError}
          </div>
        )}

        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="tu@email.com"
              className={
                errors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "bg-background/50"
              }
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] font-black uppercase italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "bg-background/50 pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-black uppercase italic">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full font-bold h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? "INICIANDO..." : "ENTRAR"}
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
    </motion.div>
  );
}
