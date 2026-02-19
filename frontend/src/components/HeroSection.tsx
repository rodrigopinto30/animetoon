"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl mb-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-12 space-y-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <span className="text-primary font-black uppercase italic tracking-widest text-sm">
            Destacado de la semana
          </span>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
            Solo Leveling: <br /> Ragnarok
          </h1>
          <p className="text-muted-foreground text-lg line-clamp-2">
            El sistema ha regresado. Jin-Woo debe enfrentar una nueva amenaza
            que pone en peligro el equilibrio entre los mundos.
          </p>
        </motion.div>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="cursor-pointer font-bold gap-2 h-12 px-8"
          >
            <Play className="fill-current h-4 w-4" /> LEER AHORA
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="cursor-pointer font-bold gap-2 h-12 px-8 backdrop-blur-md bg-white/10"
          >
            <Info className="h-4 w-4" /> DETALLES
          </Button>
        </div>
      </div>
    </div>
  );
}
