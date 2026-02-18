import { cookies } from "next/headers";
import { getUserFavorites } from "@/services/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Comic } from "@/lib/validations/comic";
import Image from "next/image";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold">¡Ups! No estás identificado</h2>
        <p className="text-muted-foreground">
          Inicia sesión para ver tu colección.
        </p>
      </div>
    );
  }

  const favorites = await getUserFavorites(token);
  console.log(favorites[0]);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mis Favoritos ❤️</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-secondary/5 rounded-xl border-2 border-dashed">
          <p className="text-muted-foreground">
            Aún no has guardado ningún cómic.
          </p>
          <Link
            href="/"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Explorar cómics
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((comic: Comic) => (
            <Link href={`/comics/${comic.id}`} key={comic.id}>
              <Card className="group overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge
                      variant="secondary"
                      className="bg-black/60 text-white backdrop-blur-md"
                    >
                      {comic.genre}
                    </Badge>
                  </div>
                  <Image
                    src={comic.coverImage}
                    alt={comic.title}
                    height={50}
                    width={20}
                    className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  />
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-bold line-clamp-1">
                    {comic.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
