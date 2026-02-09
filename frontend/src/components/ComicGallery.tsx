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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <Card
            key={comic.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg truncate">{comic.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{comic.genre}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
