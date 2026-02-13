import { ComicDetail } from "@/lib/validations/comic";
import { getComicById } from "@/services/api";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

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
    <div className="container mx-auto p-6 space-y-10">
      <section className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-80 shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={comic.title}
              width={320}
              height={426}
              priority
              className="w-full rounded-xl shadow-2xl object-cover aspect-[3/4]"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-muted rounded-xl flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sin portada</span>
            </div>
          )}
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
              {comic.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                {comic.genre || "General"}
              </span>

              <FavoriteButton
                comicId={id}
                initialIsFavorite={comic.isFavorite || false}
                token={token}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Sinopsis</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {comic.description}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Episodios</h2>
          <span className="text-muted-foreground font-medium">
            {comic.episodes?.length || 0} capítulos publicados
          </span>
        </div>

        {comic.episodes && comic.episodes.length > 0 ? (
          <div className="grid gap-4">
            {comic.episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/comics/${id}/episodes/${episode.id}`}
                className="group flex items-center justify-between p-5 border rounded-xl hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <span className="text-3xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors italic w-12">
                    #{episode.number}
                  </span>
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {episode.title}
                    </h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      Publicado el{" "}
                      {new Date(episode.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  LEER AHORA
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-2xl">
            <p className="text-muted-foreground italic">
              Próximamente: Nuevos episodios en camino.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
