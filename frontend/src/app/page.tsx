import ComicGallery from "@/components/ComicGallery";
export default function Home() {
  return (
    <main className="min-h-screen bg-background mx-auto p-6 space-y-6">
      <div className="container mx-auto">
        <ComicGallery />
      </div>
    </main>
  );
}
