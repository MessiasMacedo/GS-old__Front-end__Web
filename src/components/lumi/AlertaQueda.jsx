import { useEffect, useRef } from "react";

/**
 * Tela cheia de alerta, em dois níveis. Não diagnostica nada: pergunta e mostra onde pedir ajuda.
 * - "familia":    caiu e não respondeu. A Lumi avisa a família; a pessoa pode dizer que está
 *                 bem ou pedir ajuda. O SAMU fica à mão, mas não é o primeiro botão.
 * - "emergencia": a pessoa pediu ajuda ("não", "socorro", "dor no peito", "Preciso de ajuda").
 *                 O SAMU vira o botão principal.
 */
export default function AlertaQueda({ nivel = "familia", onEstouBem, onPedirAjuda }) {
  const botaoRef = useRef(null);
  const emergencia = nivel === "emergencia";

  // Foco no primeiro botão: teclado e leitor de tela já começam no lugar certo
  useEffect(() => {
    botaoRef.current?.focus();
  }, [nivel]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alerta-titulo"
      aria-describedby="alerta-texto"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-old-azul p-8 text-center text-white"
    >
      <h2 id="alerta-titulo" className="text-5xl font-extrabold lg:text-6xl">
        {emergencia ? "Vamos pedir ajuda" : "Você está bem?"}
      </h2>
      <p id="alerta-texto" className="max-w-2xl text-2xl text-white/90">
        {emergencia
          ? "Se for urgente, ligue agora para o SAMU. A Lumi também vai avisar a sua família."
          : "Não ouvi você responder, então vou avisar a sua família."}
      </p>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {emergencia ? (
          <a
            ref={botaoRef}
            href="tel:192"
            className="flex min-h-20 items-center justify-center rounded-2xl bg-white px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-old-verde"
          >
            Ligar para o SAMU · 192
          </a>
        ) : (
          <button
            ref={botaoRef}
            type="button"
            onClick={onEstouBem}
            className="min-h-20 rounded-2xl bg-old-verde px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-white"
          >
            Estou bem
          </button>
        )}
        {emergencia ? (
          <button
            type="button"
            onClick={onEstouBem}
            className="min-h-20 rounded-2xl bg-old-verde px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-white"
          >
            Estou bem
          </button>
        ) : (
          <button
            type="button"
            onClick={onPedirAjuda}
            className="min-h-20 rounded-2xl bg-white px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-old-verde"
          >
            Preciso de ajuda
          </button>
        )}
      </div>

      {!emergencia && (
        <a href="tel:192" className="text-xl font-bold text-white underline underline-offset-4 [&:focus-visible]:outline-old-verde">
          Emergência? Ligar para o SAMU · 192
        </a>
      )}
    </div>
  );
}
