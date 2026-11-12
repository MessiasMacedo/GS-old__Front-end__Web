/**
 * O rosto da Lumi: dois olhos e uma boca, desenhados em SVG.
 * Cada estado tem um comportamento (ver globals.css):
 *  parada   → respira e pisca
 *  ouvindo  → olhos abertos e atentos, anel pulsando
 *  pensando → olhar vai de um lado para o outro
 *  falando  → boca abre e fecha
 * Componente só visual: recebe o estado, não sabe nada de voz.
 */
export default function LumiRosto({ estado = "parada", className = "" }) {
  return (
    <div data-estado={estado} className={`lumi-rosto aspect-square rounded-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <radialGradient id="lumi-pele" cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#9ff0a5" />
            <stop offset="100%" stopColor="#00c4cd" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="96" fill="url(#lumi-pele)" />

        {/* bochechas */}
        <circle cx="52" cy="122" r="11" fill="#ffffff" opacity=".35" />
        <circle cx="148" cy="122" r="11" fill="#ffffff" opacity=".35" />

        <g className="lumi-olhos">
          <rect className="lumi-olho" x="58" y="64" width="24" height="38" rx="12" fill="#192b83" />
          <rect className="lumi-olho" x="118" y="64" width="24" height="38" rx="12" fill="#192b83" />
          {/* brilho nos olhos */}
          <circle cx="74" cy="74" r="4" fill="#ffffff" />
          <circle cx="134" cy="74" r="4" fill="#ffffff" />
        </g>

        <path className="lumi-boca-sorriso" d="M74 130 Q100 152 126 130"
          fill="none" stroke="#192b83" strokeWidth="8" strokeLinecap="round" />
        <ellipse className="lumi-boca-falando" cx="100" cy="138" rx="15" ry="11" fill="#192b83" />
      </svg>
    </div>
  );
}
