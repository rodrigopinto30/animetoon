"use client";

import Link from "next/link";
import { BookOpen, Github, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white/50 backdrop-blur-md mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-black italic tracking-tighter uppercase">
                ANIMETOON
              </span>
            </Link>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              La plataforma definitiva para lectores de manga y cómics. Explora
              historias increíbles en cualquier lugar.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">
              Navegación
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors italic uppercase"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors italic uppercase"
                >
                  Mis Favoritos
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors italic uppercase"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">
              Plataforma
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors italic uppercase"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors italic uppercase"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">
              Síguenos
            </h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Github size={18} />
              </Link>
            </div>
            <div className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <Mail size={16} />
              <span className="text-xs font-bold">soporte@animetoon.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
            © {currentYear} ANIMETOON PROJECT. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
            Hecho con ⚡ por un lector para lectores
          </p>
        </div>
      </div>
    </footer>
  );
}
