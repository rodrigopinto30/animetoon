"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    Cookies.remove("token");
    localStorage.removeItem("token");

    toast.info("Sesión cerrada", {
      description: "¡Vuelve pronto a Animetoon!",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      className="gap-2 cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden md:inline">Salir</span>
    </Button>
  );
}
