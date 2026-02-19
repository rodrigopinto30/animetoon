"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  ImageIcon,
  Save,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-slate-50">
      <Button
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
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-200" : ""}
      >
        <Bold size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-slate-200" : ""}
      >
        <Italic size={16} />
      </Button>
      <Button
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
    setLoading(true);
    const htmlContent = editor?.getHTML();

    setTimeout(() => {
      console.log("Contenido a guardar:", htmlContent);
      toast.success("¡Cómic creado con éxito!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              placeholder="Ej: Solo Leveling"
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
              Género
            </Label>
            <Input
              placeholder="Acción, Aventura..."
              className="rounded-xl border-slate-200"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b">
            <h3 className="font-black italic uppercase tracking-tighter text-slate-800">
              Descripción Enriquecida
            </h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">
              Usa estilos para resaltar la historia
            </p>
          </div>

          <MenuBar editor={editor} />

          <div className="flex-1 overflow-y-auto">
            <EditorContent editor={editor} />
          </div>

          <div className="p-6 border-t bg-slate-50 flex justify-end">
            <Button
              disabled={loading}
              onClick={handleSave}
              className="px-8 font-black italic uppercase tracking-widest gap-2 h-12 rounded-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Publicar Cómic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
