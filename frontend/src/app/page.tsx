import ComicGallery from "@/components/ComicGallery";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background mx-auto p-6">
      <div className="container mx-auto space-y-12">
        <HeroSection />

        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              Explorar Catálogo
            </h2>
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Descubre tu próxima historia
            </span>
          </div>
          <ComicGallery />
        </div>
      </div>
    </main>
  );
}
