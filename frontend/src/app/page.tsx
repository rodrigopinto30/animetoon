import ComicGallery from "@/components/ComicGallery";
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Animetoon
          </h1>
          <nav className="space-x-4">
            <span className="text-sm font-medium text-muted-foreground">
              Explorar
            </span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto">
        <ComicGallery />
      </div>
    </main>
  );
}
