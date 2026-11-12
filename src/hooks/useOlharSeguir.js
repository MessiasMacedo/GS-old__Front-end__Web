import { useEffect } from "react";

const ALCANCE = 7;      // quanto o rosto pode se deslocar, em unidades do SVG (viewBox 200)
const DISTANCIA = 320;  // a partir dessa distância (px) o olhar já vai ao máximo

/**
 * useOlharSeguir — faz o rosto da Lumi olhar para o ponteiro do mouse.
 * Escreve as variáveis CSS --ox e --oy direto no elemento: o movimento
 * não passa pelo estado do React, então não causa nova renderização a cada pixel.
 * Em tela de toque não há ponteiro se mexendo, e o rosto fica parado no centro.
 */
export function useOlharSeguir(ref, ativo = true) {
  useEffect(() => {
    const el = ref.current;
    if (!ativo || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    const definir = (x, y) => {
      el.style.setProperty("--ox", `${x}px`);
      el.style.setProperty("--oy", `${y}px`);
    };

    function mover(e) {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        // direção (dx/dist) × intensidade (perto do rosto, olha menos)
        const forca = ALCANCE * Math.min(dist / DISTANCIA, 1);
        definir((dx / dist) * forca, (dy / dist) * forca);
      });
    }
    const voltar = () => definir(0, 0);

    window.addEventListener("pointermove", mover);
    document.documentElement.addEventListener("mouseleave", voltar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("mouseleave", voltar);
    };
  }, [ref, ativo]);
}
