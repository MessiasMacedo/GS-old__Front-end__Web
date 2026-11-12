const TEXTOS = {
  parada: "Toque em mim para conversar",
  ouvindo: "Estou ouvindo…",
  pensando: "Deixa eu pensar…",
  falando: "Falando…",
};

// aria-live: leitores de tela anunciam a mudança de estado (heurística 1 de Nielsen)
export default function StatusLumi({ estado, erro }) {
  return (
    <p aria-live="polite" className="text-2xl font-bold text-old-azul min-h-9 text-center">
      {erro ?? TEXTOS[estado]}
    </p>
  );
}
