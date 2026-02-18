"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Enlace enviado", {
      description: "Si el correo existe, recibirás instrucciones en breve.",
    });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form onSubmit={handleReset} className="max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold italic">¿Olvidaste tu clave?</h1>
        <Input type="email" placeholder="Introduce tu email" required />
        <Button className="w-full">Enviar enlace de recuperación</Button>
      </form>
    </div>
  );
}
