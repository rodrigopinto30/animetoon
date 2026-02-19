"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getComicById, updateComic } from "@/services/api";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comic } from "@/lib/validations/comic";

export default function EditComicPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    async function loadComic() {
      try {
        const comic: Comic = await getComicById(id as string);
        setTitle(comic.title);
        setGenre(comic.genre ? comic.genre : "");
      } catch (error) {
        toast.error("No se pudo cargar el cómic");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }
    loadComic();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateComic(id as string, { title, genre });
      toast.success("¡Cómic actualizado!");
      router.push("/admin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-black italic uppercase">Editar Cómic</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <Input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Género"
        />
        <Button disabled={saving} className="w-full cursor-pointer">
          {saving ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={18} className="mr-2" />
          )}
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}
