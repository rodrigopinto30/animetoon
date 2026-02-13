"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/services/api";

interface FavoriteButtonProps {
  comicId: string;
  initialIsFavorite: boolean;
  token?: string;
}

export default function FavoriteButton({
  comicId,
  initialIsFavorite,
  token,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (!token) return alert("Debes iniciar sesión");

    setIsLoading(true);
    try {
      await toggleFavorite(comicId, token);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
        isFavorite
          ? "bg-red-50 text-red-500 border-2 border-red-200"
          : "bg-slate-900 text-white hover:bg-primary"
      }`}
    >
      <Heart className={isFavorite ? "fill-current" : ""} size={20} />
      {isFavorite ? "EN FAVORITOS" : "AÑADIR A FAVORITOS"}
    </button>
  );
}
