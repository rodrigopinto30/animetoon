"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token || isLoading) return;

    setIsLoading(true);
    setIsFavorite(!isFavorite);

    try {
      await toggleFavorite(comicId, token);
    } catch (error) {
      setIsFavorite(isFavorite);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative hover:bg-transparent group cursor-pointer"
      disabled={isLoading}
    >
      <motion.div
        whileTap={{ scale: 0.7 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Heart
          className={`h-7 w-7 transition-colors duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              : "text-muted-foreground group-hover:text-red-400"
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {isFavorite && (
          <motion.span
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full bg-red-500/20"
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
