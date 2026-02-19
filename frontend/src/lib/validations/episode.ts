import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const episodeSchema = z.object({
  number: z.coerce.number().min(1, "El número de episodio debe ser mayor a 0"),
  title: z.string().min(2, "El título debe tener al menos 2 caracteres").max(100),
  pages: z
    .array(
      z.any()
        .refine((file) => file instanceof File, "Debe ser un archivo válido")
        .refine((file) => file.size <= MAX_FILE_SIZE, `El tamaño máximo es de 5MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Solo se aceptan formatos .jpg, .jpeg, .png y .webp"
        )
    )
    .min(1, "Debes subir al menos una página para el episodio"),
});

export type EpisodeInput = z.infer<typeof episodeSchema>;