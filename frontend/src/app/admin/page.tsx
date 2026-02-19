"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getComics, deleteComic } from "@/services/api";
import { getCookie } from "cookies-next";
import { Comic } from "@/lib/validations/comic";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar "${title}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmed) return;

    try {
      await deleteComic(id);

      setComics((prev) => prev.filter((comic) => comic.id !== id));

      toast.success("Cómic eliminado", {
        description: `"${title}" ha sido borrado correctamente.`,
      });
    } catch (error: any) {
      toast.error("Error al eliminar", {
        description: error.message,
      });
    }
  };

  useEffect(() => {
    async function fetchComics() {
      try {
        const data = await getComics({});
        if (data && data.items) {
          setComics(data.items);
        } else {
          setComics([]);
        }
      } catch (error) {
        console.error("Error al cargar cómics", error);
      } finally {
        setLoading(false);
      }
    }
    fetchComics();
  }, []);

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400">
                Cómic
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400">
                Género
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {comics.map((comic) => (
              <tr
                key={comic.id}
                className="border-b last:border-0 hover:bg-slate-50/50 transition-colors group"
              >
                <td className="p-4 font-bold text-slate-700 italic uppercase text-sm">
                  {comic.title}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">
                    {comic.genre}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/comics/${comic.id}/episodes/new`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer h-8 gap-2 text-primary hover:text-primary hover:bg-primary/10 font-black italic uppercase text-[10px]"
                      >
                        <PlusCircle size={14} />
                        Añadir Episodio
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer h-8 w-8 text-slate-400 hover:text-slate-900"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comic.id, comic.title)}
                      className="cursor-pointer h-8 w-8 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
