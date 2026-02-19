"use client";

import { Edit, Trash2, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const MY_COMICS = [
  {
    id: 1,
    title: "Solo Leveling",
    genre: "Acción",
    chapters: 12,
    status: "Publicado",
  },
  {
    id: 2,
    title: "One Piece",
    genre: "Aventura",
    chapters: 1105,
    status: "Publicado",
  },
  {
    id: 3,
    title: "Tower of God",
    genre: "Fantasía",
    chapters: 550,
    status: "Borrador",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Cómics", value: "24", color: "text-blue-600" },
          { label: "Lecturas Hoy", value: "1.2k", color: "text-primary" },
          { label: "Nuevos Usuarios", value: "+12", color: "text-green-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className={`text-3xl font-black italic ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-black italic uppercase tracking-tighter text-slate-700">
            Mis Publicaciones
          </h3>
          <Button
            size="sm"
            className="font-bold italic uppercase text-[10px] tracking-widest"
          >
            Ver todo
          </Button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50/30">
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Cómic
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Género
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Caps
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Estado
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {MY_COMICS.map((comic) => (
              <tr
                key={comic.id}
                className="border-b last:border-0 hover:bg-slate-50/50 transition-colors group"
              >
                <td className="p-4 font-bold text-slate-700 italic uppercase text-sm">
                  {comic.title}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                    {comic.genre}
                  </span>
                </td>
                <td className="p-4 text-sm font-medium text-slate-500">
                  {comic.chapters}
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${comic.status === "Publicado" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {comic.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-primary"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-500"
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
