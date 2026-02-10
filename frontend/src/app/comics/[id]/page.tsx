"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getComicById, Comic } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ComicDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getComicById(id);
        setComic(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return <div className="p-20 text-center">Cargando detalles...</div>;
  if (error || !comic)
    return (
      <div className="p-20 text-center text-red-500">
        No se pudo cargar el cómic.
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-6 left-6 z-30">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer bg-background/50 backdrop-blur-md border-none hover:bg-background/80 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la Galería
          </Button>
        </Link>
      </div>
      <div className="relative h-[450px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img
          src={comic.coverImage}
          className="w-full h-full object-cover blur-md opacity-40"
          alt="background"
        />

        <div className="container mx-auto px-6 absolute inset-0 z-20 flex flex-col md:flex-row items-end pb-12 gap-8">
          <img
            src={comic.coverImage}
            className="w-48 md:w-64 rounded-xl shadow-2xl border-4 border-background aspect-[2/3] object-cover"
            alt={comic.title}
          />
          <div className="space-y-4 mb-4">
            <Badge className="bg-primary hover:bg-primary/80">
              {comic.genre}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              {comic.title}
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg line-clamp-3">
              {comic.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold border-b pb-2 mb-6">
          Información General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <p className="font-bold text-muted-foreground uppercase">Estado</p>
            <p>En publicación</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-muted-foreground uppercase">Idioma</p>
            <p>Español</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-3xl font-black italic tracking-tighter">
            EPISODIOS
          </h2>
          <span className="text-sm text-muted-foreground uppercase font-bold">
            Total: 3 Capítulos
          </span>
        </div>

        <div className="grid gap-3">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-secondary flex items-center justify-center font-bold text-lg group-hover:text-primary transition-colors">
                  {num}
                </div>
                <div>
                  <p className="font-bold">
                    Capítulo {num}: El despertar del poder
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Publicado hace 2 días
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Leer
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
