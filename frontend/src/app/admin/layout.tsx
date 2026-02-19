"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg">
              <Library className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">
              ADMIN<span className="text-primary">TOON</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
            Gestión
          </p>

          <Link href="/admin">
            <Button
              variant="ghost"
              className="cursor-pointer w-full justify-start gap-3 hover:bg-white/10 text-slate-300 hover:text-slate-300 font-bold italic uppercase text-xs h-12 rounded-xl"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Button>
          </Link>

          <Link href="/admin/upload">
            <Button
              variant="ghost"
              className="cursor-pointer w-full justify-start gap-3 hover:bg-white/10 text-slate-300 hover:text-slate-300 font-bold italic uppercase text-xs h-12 rounded-xl"
            >
              <PlusCircle size={18} /> Subir Cómic
            </Button>
          </Link>

          <p className="px-4 pt-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
            Comunidad
          </p>

          <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start gap-3 hover:bg-white/10 text-slate-300 hover:text-slate-300 font-bold italic uppercase text-xs h-12 rounded-xl"
          >
            <Users size={18} /> Usuarios
          </Button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/">
            <Button
              variant="ghost"
              className="cursor-pointer w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold italic uppercase text-xs h-12 rounded-xl"
            >
              <LogOut size={18} /> Salir al sitio
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Panel de Control
            </h2>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800">
              Bienvenido, Admin
            </h1>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border flex items-center justify-center font-black text-primary italic">
            A
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
