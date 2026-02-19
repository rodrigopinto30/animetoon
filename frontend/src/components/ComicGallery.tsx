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
import { motion } from "framer-motion";
import { getComics, Comic } from "@/services/api";
import { Badge } from "./ui/badge";
import Link from "next/link";

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
            <SelectItem value="Fantasia">Fantasia</SelectItem>
            <SelectItem value="Terror">Terror</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {" "}
        {comics.map((comic) => (
          <Link href={`/comics/${comic.id}`} key={comic.id}>
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative bg-background/40 backdrop-blur-md border rounded-2xl overflow-hidden shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[2/3] overflow-hidden relative">
                <img
                  src={comic.coverImage}
                  alt={comic.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-primary/90 text-primary-foreground font-black italic uppercase text-[10px]">
                    {comic.genre}
                  </Badge>
                </div>
              </div>

              <div className="p-3 space-y-1">
                <h3 className="font-bold text-sm truncate uppercase italic tracking-tight group-hover:text-primary transition-colors">
                  {comic.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-bold">
                    12 CAPÍTULOS
                  </span>
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
