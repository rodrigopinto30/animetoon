"use client";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-slate-400 text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest mt-4"
    >
      ↑ Volver al inicio
    </button>
  );
}
