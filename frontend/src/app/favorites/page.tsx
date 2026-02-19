"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, Trash2, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const INITIAL_FAVORITES = [
  {
    id: 1,
    title: "Solo Leveling",
    chapter: "Cap. 179",
    image:
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400",
  },
  {
    id: 2,
    title: "One Piece",
    chapter: "Cap. 1105",
    image:
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=400",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    chapter: "Cap. 248",
    image:
      "https://images.unsplash.com/photo-1614583225154-5feaba070215?q=80&w=400",
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const removeFavorite = (id: number, title: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    toast.error("Eliminado", {
      description: `${title} ha sido quitado de tus favoritos.`,
    });
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase italic flex items-center gap-3">
            <Heart className="h-10 w-10 text-red-500 fill-red-500" /> Mi
            Biblioteca
          </h1>
          <p className="text-muted-foreground mt-2 uppercase text-xs font-bold tracking-widest">
            {favorites.length} Mangas guardados en tu colección
          </p>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {favorites.map((manga) => (
              <motion.div
                key={manga.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="group relative bg-background/40 backdrop-blur-md border rounded-2xl overflow-hidden shadow-xl hover:border-primary/50 transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={manga.image}
                    alt={manga.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      onClick={() => removeFavorite(manga.id, manga.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm truncate uppercase tracking-tight italic">
                    {manga.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                      {manga.chapter}
                    </span>
                    <Link href={`/manga/${manga.id}`}>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="p-6 bg-muted rounded-full">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              No hay nada por aquí
            </h2>
            <p className="text-muted-foreground max-w-xs">
              Tu biblioteca está vacía. ¡Explora nuevos mangas y añádelos a tus
              favoritos!
            </p>
            <Link href="/">
              <Button className="font-bold">EXPLORAR MANGAS</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
