"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  Save,
  Loader2,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function NewEpisodePage() {
  const { id: comicId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");

  const [pages, setPages] = useState<
    { id: string; file: File; preview: string }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));
      setPages([...pages, ...newFiles]);
    }
  };

  const removePage = (id: string) => {
    setPages(pages.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (!title || !number || pages.length === 0) {
      return toast.error("Faltan datos", {
        description: "Título, número y al menos una página son obligatorios.",
      });
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("¡Episodio publicado!");
      router.push(`/admin`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">
              Nuevo Contenido
            </p>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
              Crear Episodio
            </h1>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="px-8 font-black italic uppercase tracking-widest gap-2 h-12 rounded-xl shadow-lg shadow-primary/20"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          Publicar Capítulo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INFO DEL EPISODIO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            <div className="space-y-2">
              <Label className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Número del Episodio
              </Label>
              <Input
                type="number"
                placeholder="Ej: 1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Título del Episodio
              </Label>
              <Input
                placeholder="Ej: El despertar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 p-8 rounded-3xl border shadow-xl flex flex-col items-center justify-center border-dashed border-slate-700 group hover:border-primary/50 transition-all cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <div className="bg-primary/10 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Plus className="text-primary" size={32} />
            </div>
            <p className="font-black italic uppercase text-white tracking-widest text-sm">
              Añadir Páginas
            </p>
            <p className="text-slate-500 text-[10px] uppercase font-bold mt-2">
              Formatos: JPG, PNG, WEBP (Máx 5MB c/u)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="relative aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white shadow-md group"
              >
                <img
                  src={page.preview}
                  alt={`Page ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <span className="text-white font-black italic text-2xl">
                    #{index + 1}
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => removePage(page.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
