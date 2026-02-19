"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { getEpisodeById } from "@/services/api";

export default function ComicReaderPage() {
  const { id: comicId, episodeId } = useParams();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisode() {
      if (!episodeId) return;
      try {
        const data = await getEpisodeById(episodeId as string);
        setEpisode(data);
      } catch (error: any) {
        toast.error("Acceso denegado", {
          description: "Debes estar logueado para leer este contenido.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchEpisode();
  }, [episodeId]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/comics/${comicId}`}>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-slate-400 gap-2 hover:text-gray-500 "
            >
              <ArrowLeft size={18} />
              Volver
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-white font-black uppercase italic text-sm tracking-tighter">
              Episodio {episode?.number}: {episode?.title}
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Maximize size={18} />
          </Button>
        </div>
      </nav>

      <div className="flex-1 mt-16 max-w-3xl mx-auto w-full flex flex-col items-center">
        {episode?.pages?.length > 0 ? (
          episode.pages.map((page: any, index: number) => (
            <img
              key={page.id || index}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${page.imageUrl}`}
              alt={`Página ${index + 1}`}
              className="w-full h-auto select-none pointer-events-none"
              loading="lazy"
            />
          ))
        ) : (
          <div className="p-20 text-slate-500 text-center font-bold uppercase italic tracking-widest">
            El episodio no tiene páginas cargadas.
          </div>
        )}
      </div>

      <footer className="bg-slate-900 p-8 border-t border-slate-800">
        <div className="max-w-xl mx-auto flex gap-4">
          <Button
            disabled
            className="cursor-pointer flex-1 h-14 rounded-2xl font-black uppercase italic tracking-widest"
          >
            <ChevronLeft className="mr-2" /> Anterior
          </Button>
          <Button className="cursor-pointer flex-1 h-14 rounded-2xl font-black uppercase italic tracking-widest">
            Siguiente <ChevronRight className="ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
