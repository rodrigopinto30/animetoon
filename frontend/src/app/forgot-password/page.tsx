"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MailCheck } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Introduce un correo válido"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (values: ForgotValues) => {
    try {
      // await requestPasswordReset(values.email);

      setIsSent(true);
      toast.success("Correo enviado", {
        description: "Revisa tu bandeja de entrada para restablecer tu clave.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "No pudimos procesar tu solicitud. Intenta más tarde.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 bg-background/40 backdrop-blur-md border rounded-3xl shadow-2xl"
      >
        {!isSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                ¿Olvidaste tu clave?
              </h2>
              <p className="text-muted-foreground text-sm">
                Te enviaremos un enlace para que recuperes el acceso.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Tu Email</Label>
              <Input
                id="email"
                {...register("email")}
                placeholder="tu@email.com"
                className={errors.email ? "border-red-500" : "bg-background/50"}
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] font-black uppercase italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-bold h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR ENLACE"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <MailCheck className="h-12 w-12 text-primary animate-bounce" />
              </div>
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              ¡Revisa tu correo!
            </h2>
            <p className="text-muted-foreground text-sm">
              Hemos enviado instrucciones de recuperación a tu bandeja de
              entrada.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSent(false)}
            >
              Intentar con otro email
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
