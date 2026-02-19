import ScrollToTop from "@/components/ScrollToTop";
import { getComicById, getEpisodeById } from "@/services/api";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; episodeId: string }>;
}

export default async function EpisodeViewerPage({ params }: PageProps) {
  const { id, episodeId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const [episode, comic] = await Promise.all([
    getEpisodeById(episodeId, token).catch(() => null),
    getComicById(id, token).catch(() => null),
  ]);

  if (!episode || !comic) notFound();

  const currentIndex = comic.episodes.findIndex((ep) => ep.id === episodeId);
  const nextEpisode = comic.episodes[currentIndex + 1];
  const nextEpisodeId = nextEpisode?.id;

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] text-slate-900">
      <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href={`/comics/${id}`}
            className="group flex items-center gap-2 text-xs font-black uppercase italic tracking-tighter text-slate-500 hover:text-primary transition-all"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Volver
          </Link>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
              Leyendo {comic.title}
            </p>
            <h1 className="max-w-[180px] md:max-w-md truncate font-black uppercase italic tracking-tighter text-slate-800">
              Cap. {episode.number}:{" "}
              <span className="text-slate-500">{episode.title}</span>
            </h1>
          </div>

          <div className="w-12"></div>
        </div>
      </nav>

      <div className="flex flex-col items-center py-10 gap-8">
        {episode.pages && episode.pages.length > 0 ? (
          episode.pages.map((page: any, index: number) => (
            <div
              key={page.id}
              className="group relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.01]"
            >
              <Image
                src={page.imageUrl}
                alt={`Página ${index + 1}`}
                width={800}
                height={1200}
                className="h-auto w-full block"
                priority={index < 2}
                unoptimized
              />
              <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  {index + 1} / {episode.pages.length}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-3xl shadow-inner">
              📖
            </div>
            <p className="font-bold italic uppercase tracking-tighter text-slate-400">
              Este capítulo está vacío por ahora
            </p>
          </div>
        )}
      </div>

      <footer className="mt-20 border-t border-slate-200 bg-white/40 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Capítulo Finalizado
            </span>
            <h3 className="mt-4 text-4xl font-black italic uppercase tracking-tighter text-slate-800">
              {episode.title}
            </h3>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <Link
              href={`/comics/${id}`}
              className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-center text-xs font-black uppercase italic tracking-widest text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-800"
            >
              Lista de Capítulos
            </Link>

            {nextEpisodeId ? (
              <Link
                href={`/comics/${id}/episodes/${nextEpisodeId}`}
                className="flex-[1.5] rounded-2xl bg-slate-900 px-10 py-4 text-center text-xs font-black uppercase italic tracking-widest text-white shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 hover:bg-primary hover:shadow-primary/20 active:scale-95"
              >
                Siguiente Capítulo →
              </Link>
            ) : (
              <div className="flex-1 rounded-2xl bg-slate-100 px-8 py-4 text-center text-xs font-black uppercase italic tracking-widest text-slate-400">
                Próximamente
              </div>
            )}
          </div>

          <ScrollToTop />
        </div>
      </footer>
    </div>
  );
}
