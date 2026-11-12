import { useRef } from "react";
import { useOlharSeguir } from "@/hooks/useOlharSeguir";

/**
 * O rosto da Lumi: um núcleo de luz com halo, olhos e boca, em SVG.
 * "Lumi" vem de luz: o halo é a parte que mais expressa o estado (ver index.css).
 *  parada   → halo respira, ela pisca e olha em volta
 *  ouvindo  → halo pulsa para fora, olhos atentos, boca pequena
 *  pensando → um ponto orbita o halo, olhar para o alto, boca de "hmm"
 *  falando  → halo vibra, boca abre e fecha
 * Componente só visual: recebe o estado, não sabe nada de voz.
 * `seguirOlhar` faz o rosto acompanhar o mouse (usado no site).
 */
export default function LumiRosto({ estado = "parada", seguirOlhar = false, className = "" }) {
  const ref = useRef(null);
  useOlharSeguir(ref, seguirOlhar);

  return (
    <div
      ref={ref}
      data-estado={estado}
      data-seguir={seguirOlhar || undefined}
      className={`lumi-rosto aspect-square ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle className="lumi-halo lumi-halo-fora" cx="100" cy="100" r="98" />
        <circle className="lumi-halo lumi-halo-dentro" cx="100" cy="100" r="84" />

        <circle cx="100" cy="100" r="68" fill="#76e67e" />
        {/* reflexo de luz */}
        <ellipse cx="76" cy="64" rx="20" ry="10" fill="#ffffff" opacity=".45" transform="rotate(-32 76 64)" />

        <g className="lumi-orbita"><circle cx="100" cy="8" r="7" fill="#192b83" /></g>

        <g className="lumi-face">
          <g className="lumi-olhos">
            <rect className="lumi-olho" x="73" y="78" width="16" height="30" rx="8" fill="#192b83" />
            <rect className="lumi-olho" x="111" y="78" width="16" height="30" rx="8" fill="#192b83" />
          </g>
          <g fill="none" stroke="#192b83" strokeWidth="7" strokeLinecap="round">
            <path className="lumi-boca lumi-boca-sorriso" d="M85 124 Q100 138 115 124" />
            <path className="lumi-boca lumi-boca-pensando" d="M89 130 Q100 125 111 129" />
          </g>
          <ellipse className="lumi-boca lumi-boca-falando" cx="100" cy="129" rx="12" ry="10" fill="#192b83" />
        </g>
      </svg>
    </div>
  );
}
