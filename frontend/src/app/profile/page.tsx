"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Mail, ShieldCheck, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  username: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [setValue]);

  const onUpdateProfile = async (values: ProfileValues) => {
    setLoading(true);
    try {
      // await updateProfile(values);
      localStorage.setItem("user", JSON.stringify(values));
      toast.success("Perfil actualizado", {
        description: "Tus datos se han guardado correctamente.",
      });
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      toast.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 md:grid-cols-3"
      >
        <div className="md:col-span-1 space-y-6">
          <div className="p-8 bg-background/40 backdrop-blur-md border rounded-3xl shadow-xl text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-primary/30">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter italic">
              Mi Perfil
            </h2>
            <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest mt-1">
              Lector Premium
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="p-8 bg-background/40 backdrop-blur-md border rounded-3xl shadow-xl">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <ShieldCheck className="text-primary h-5 w-5" />
              <h3 className="text-xl font-bold uppercase tracking-tighter italic">
                Información Personal
              </h3>
            </div>

            <form
              onSubmit={handleSubmit(onUpdateProfile)}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      {...register("username")}
                      className={`pl-10 bg-background/50 ${errors.username ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-[10px] font-bold italic uppercase">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      {...register("email")}
                      className={`pl-10 bg-background/50 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold italic uppercase">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  disabled={loading}
                  className="font-bold px-8 h-12 gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  GUARDAR CAMBIOS
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
