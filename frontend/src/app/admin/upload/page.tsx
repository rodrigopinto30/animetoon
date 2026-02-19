"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  Heading1,
  Save,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createComic } from "@/services/api";
import { getCookie } from "cookies-next";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-slate-50">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""
        }
      >
        <Heading1 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-200" : ""}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-slate-200" : ""}
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
      >
        <List size={16} />
      </Button>
    </div>
  );
};

export default function UploadComicPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [coverImage, setCoverImage] = useState("https://picsum.photos/400/600");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Escribe la descripción épica de tu cómic aquí...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none p-4 min-h-[250px] max-w-none",
      },
    },
  });

  const handleSave = async () => {
    const htmlContent = editor?.getHTML();

    if (!title || !htmlContent || htmlContent === "<p></p>") {
      return toast.error("Faltan campos", {
        description: "El título y la descripción son obligatorios.",
      });
    }

    setLoading(true);

    try {
      const token = getCookie("token") as string;

      const payload = {
        title,
        genre: genre || "General",
        description: htmlContent,
        coverImage,
      };

      await createComic(payload, token);

      toast.success("¡Cómic publicado!", {
        description: "Se ha añadido correctamente al catálogo.",
      });

      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast.error("Error al crear", {
        description: error.message || "No se pudo conectar con el servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
          <h3 className="font-black italic uppercase tracking-tighter text-slate-800">
            Portada
          </h3>
          <div className="aspect-[3/4] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:border-primary/50 transition-colors cursor-pointer">
            <UploadCloud
              size={40}
              className="mb-2 group-hover:text-primary transition-colors"
            />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Subir Imagen
            </span>
          </div>

          <div className="space-y-2 pt-4">
            <Label className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
              Título del Cómic
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Solo Leveling"
              className="rounded-xl border-slate-200 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
              Género
            </Label>
            <Input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Acción, Aventura..."
              className="rounded-xl border-slate-200 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col flex-1">
          <div className="p-6 border-b">
            <h3 className="font-black italic uppercase tracking-tighter text-slate-800">
              Descripción Enriquecida
            </h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">
              Usa estilos para resaltar la historia
            </p>
          </div>

          <MenuBar editor={editor} />

          <div className="flex-1 overflow-y-auto min-h-[400px]">
            {editor ? (
              <EditorContent editor={editor} />
            ) : (
              <div className="p-10 text-slate-300 animate-pulse">
                Iniciando editor...
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-slate-50 flex justify-end">
            <Button
              disabled={loading}
              onClick={handleSave}
              className="px-10 font-black italic uppercase tracking-widest gap-2 h-14 rounded-2xl shadow-lg shadow-slate-200 hover:shadow-primary/20 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {loading ? "PUBLICANDO..." : "PUBLICAR CÓMIC"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
