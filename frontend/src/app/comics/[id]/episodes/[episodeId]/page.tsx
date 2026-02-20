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
import Image from "next/image";
import { Episode } from "@/lib/validations/comic";

export default function ComicReaderPage() {
  const { id: comicId, episodeId } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);
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
              Volver a episodios
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

      <div className="text-white flex-1 mt-16 max-w-3xl mx-auto w-full flex flex-col items-center">
        {episode?.description && (
          <div
            className="w-full p-8 prose prose-slate dark:prose-invert max-w-none 
             text-white prose-headings:text-white prose-p:text-slate-300 
             font-medium leading-relaxed bg-slate-900/50 rounded-b-3xl mb-8"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        )}

        {(episode?.pages?.length ?? 0) > 0
          ? episode?.pages?.map((page: any, index: number) => (
              <Image
                width={800}
                height={1200}
                key={page.id || index}
                src={
                  page.imageUrl.startsWith("http")
                    ? page.imageUrl
                    : `${process.env.NEXT_PUBLIC_API_URL}/${page.imageUrl}`
                }
                alt={`Página ${index + 1}`}
                className="w-full h-auto select-none"
                unoptimized
              />
            ))
          : !episode?.description && (
              <div className="p-20 text-slate-500 text-center font-bold uppercase italic tracking-widest">
                El episodio no tiene contenido cargado.
              </div>
            )}
      </div>
      <footer className="bg-slate-900/90 backdrop-blur-xl p-8 border-t border-slate-800 sticky bottom-0">
        <div className="max-w-xl mx-auto flex gap-4">
          <Button
            disabled={!episode?.prevEpisodeId}
            onClick={() =>
              episode?.prevEpisodeId &&
              router.push(
                `/comics/${comicId}/episodes/${episode.prevEpisodeId}`,
              )
            }
            className={`flex-1 h-14 rounded-2xl font-black uppercase italic tracking-widest transition-all duration-300 ${
              episode?.prevEpisodeId
                ? "bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-slate-500/20 cursor-pointer border border-slate-700"
                : "bg-slate-950 text-slate-700 border border-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeft
              className={`mr-2 ${episode?.prevEpisodeId ? "text-primary" : "text-slate-800"}`}
            />
            Anterior
          </Button>

          <Button
            disabled={!episode?.nextEpisodeId}
            onClick={() =>
              episode?.nextEpisodeId &&
              router.push(
                `/comics/${comicId}/episodes/${episode.nextEpisodeId}`,
              )
            }
            className={`flex-1 h-14 rounded-2xl font-black uppercase italic tracking-widest transition-all duration-300 ${
              episode?.nextEpisodeId
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                : "bg-slate-950 text-slate-700 border border-slate-900 opacity-50 cursor-not-allowed"
            }`}
          >
            Siguiente
            <ChevronRight
              className={`ml-2 ${episode?.nextEpisodeId ? "text-white" : "text-slate-800"}`}
            />
          </Button>
        </div>
      </footer>
    </div>
  );
}
