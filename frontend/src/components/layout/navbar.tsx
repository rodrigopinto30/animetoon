"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Heart } from "lucide-react";
import { LogoutButton } from "../LogoutButton";

export function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = mounted ? Cookies.get("token") : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-black italic tracking-tighter">
            ANIMETOON
          </span>
        </Link>

        <nav className="flex items-center gap-4" suppressHydrationWarning>
          {mounted && (
            <>
              {token ? (
                <div className="flex items-center gap-4">
                  <Link href="/favorites">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 cursor-pointer"
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      <span className="hidden md:inline">Favoritos</span>
                    </Button>
                  </Link>

                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Mi Perfil</span>
                  </Button>
                  <LogoutButton />
                  {/* <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden md:inline">Salir</span>
                  </Button> */}
                </div>
              ) : (
                <Link href="/login">
                  <Button size="sm" className="cursor-pointer">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
