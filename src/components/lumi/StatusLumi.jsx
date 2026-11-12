const TEXTOS = {
  parada: "Toque em mim para conversar",
  ouvindo: "Estou ouvindo…",
  pensando: "Deixa eu pensar…",
  falando: "Falando…",
};

// aria-live: leitores de tela anunciam a mudança de estado (heurística 1 de Nielsen)
export default function StatusLumi({ estado, erro }) {
  return (
    <p
      aria-live="polite"
      className={`min-h-12 rounded-full px-6 py-2 text-center text-xl font-bold shadow-sm
        ${erro ? "bg-old-azul text-white" : "bg-white text-old-azul ring-1 ring-old-azul/10"}`}
    >
      {erro ?? TEXTOS[estado]}
    </p>
  );
}
