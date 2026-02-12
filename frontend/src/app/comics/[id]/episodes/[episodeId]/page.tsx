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
    <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-slate-900">
      <nav className="sticky backdrop-blur-md top-0 z-50 p-4 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-slate-900">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href={`/comics/${id}`}
            className="text-slate-600 hover:text-primary transition-colors flex items-center gap-2 font-medium"
          >
            ← <span className="hidden md:inline">Volver al cómic</span>
          </Link>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Leyendo ahora
            </p>
            <h1 className="font-bold truncate max-w-[200px] md:max-w-md text-slate-800">
              Cap. {episode.number}: {episode.title}
            </h1>
          </div>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="flex flex-col items-center py-6 gap-4">
        {episode.pages && episode.pages.length > 0 ? (
          episode.pages.map((page: any, index: number) => (
            <div
              key={page.id}
              className="relative w-full max-w-3xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200"
            >
              <Image
                src={page.imageUrl}
                alt={`Página ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto block"
                priority={index < 2}
                unoptimized
              />
              <span className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded">
                {index + 1} / {episode.pages.length}
              </span>
            </div>
          ))
        ) : (
          <div className="py-40 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <p className="text-slate-500 italic font-medium">
              Este episodio aún no tiene imágenes cargadas.
            </p>
          </div>
        )}
      </main>

      <footer className="p-20 bg-white/50 backdrop-blur-sm mt-10 border-t border-slate-200">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
              Fin del Capítulo {episode.number}
            </p>
            <h3 className="text-2xl font-black text-slate-800 italic uppercase">
              {episode.title}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href={`/comics/${id}`}
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-center"
            >
              MENÚ DE CAPÍTULOS
            </Link>

            {nextEpisodeId ? (
              <Link
                href={`/comics/${id}/episodes/${nextEpisodeId}`}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-95 text-center flex items-center justify-center gap-2 group"
              >
                SIGUIENTE CAPÍTULO
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ) : (
              <div className="px-10 py-4 bg-slate-100 text-slate-400 font-bold rounded-2xl cursor-not-allowed">
                PRÓXIMAMENTE
              </div>
            )}
          </div>

          <ScrollToTop />
        </div>
      </footer>
    </div>
  );
}
