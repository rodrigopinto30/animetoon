// 1. ELIMINAMOS "use client"
import { getComicById } from "@/services/api";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";
// 2. Importamos un componente que crearemos para la animación
import { FadeInImage } from "@/components/FadeInImage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ComicDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const comic = await getComicById(id, token).catch(() => null);

  if (!comic) {
    notFound();
  }

  const imageSrc =
    "https://fastly.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU";

  return (
    <div className="container mx-auto py-10 px-6 space-y-12">
      <section className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-80 shrink-0">
          <Image
            src={comic.coverImage || imageSrc}
            alt={comic.title}
            width={320}
            height={426}
            priority
            className="w-full rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 object-cover aspect-[3/4]"
          />
        </div>

        <div className="space-y-8 flex-1">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
              {comic.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full uppercase italic">
                {comic.genre || "General"}
              </span>
              <FavoriteButton
                comicId={id}
                initialIsFavorite={comic.isFavorite || false}
                token={token}
              />
            </div>
          </div>

          <div className="p-8 bg-background/40 backdrop-blur-md border rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic">
              Sinopsis
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {comic.description}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            Episodios
          </h2>
          <span className="text-primary font-bold text-xs uppercase tracking-widest">
            {comic.episodes?.length || 0} Entregas
          </span>
        </div>

        <div className="grid gap-3">
          {comic.episodes?.map((episode: any) => (
            <Link
              key={episode.id}
              href={`/comics/${id}/episodes/${episode.id}`}
            >
              <div className="group flex items-center justify-between p-6 bg-background/30 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="flex gap-8 items-center">
                  <span className="text-4xl font-black italic text-primary/50 group-hover:text-gray/20 transition-colors w-16">
                    #{episode.number}
                  </span>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic group-hover:text-primary transition-colors">
                      {episode.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                      Lanzamiento:{" "}
                      {new Date(episode.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="cursor-pointer font-black italic uppercase text-xs group-hover:bg-gray-200 group-hover:text-black transition-colors hover:bg-black hover:text-white"
                >
                  Leer ahora
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
