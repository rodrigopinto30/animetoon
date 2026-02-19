"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Heart } from "lucide-react";
import { LogoutButton } from "../LogoutButton";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
                      <span className="hidden md:inline font-bold">
                        Favoritos
                      </span>
                    </Button>
                  </Link>

                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-primary/10 transition-all rounded-xl border border-transparent hover:border-primary/20 cursor-pointer"
                    >
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col items-start leading-none gap-1">
                        <span className="text-sm font-black italic uppercase tracking-tighter">
                          {user?.username || "Usuario"}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {user?.email || "Cargando..."}
                        </span>
                      </div>
                    </Button>
                  </Link>

                  <LogoutButton />
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    size="sm"
                    className="cursor-pointer font-bold uppercase italic tracking-tighter"
                  >
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
