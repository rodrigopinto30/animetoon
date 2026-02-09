"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getComics, Comic } from "@/services/api";
import { Badge } from "./ui/badge";

export default function ComicGallery() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    const fetchComics = async () => {
      const data = await getComics({
        title: search,
        genre: genre === "all" ? "" : genre,
      });
      setComics(data.items);
    };
    fetchComics();
  }, [search, genre]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar cómic..."
          className="md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={(value) => setGenre(value)}>
          <SelectTrigger className="md:w-[200px]">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los géneros</SelectItem>
            <SelectItem value="Accion">Acción</SelectItem>
            <SelectItem value="Ciencia Ficcion">Ciencia Ficción</SelectItem>
            <SelectItem value="Terror">Terror</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {" "}
        {comics.map((comic) => (
          <Card
            key={comic.id}
            className="group overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <div className="absolute top-2 left-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-black/60 text-white backdrop-blur-md border-none"
                >
                  {comic.genre}
                </Badge>
              </div>

              <img
                src={comic.coverImage}
                alt={comic.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-xs text-gray-200 line-clamp-2">
                  {comic.description || "Haz clic para ver más detalles..."}
                </p>
              </div>
            </div>

            <CardHeader className="p-3">
              <CardTitle className="text-md font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                {comic.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Capítulos: 12
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
