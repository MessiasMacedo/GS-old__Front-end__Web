import { useEffect, useRef } from "react";

/**
 * Tela cheia quando a Lumi percebe uma queda, alguém fica parado no chão ou fala
 * de emergência. Dois caminhos grandes: "Estou bem" ou ligar para o SAMU.
 * Não diagnostica nada: só pergunta e mostra onde pedir ajuda.
 */
export default function AlertaQueda({ onEstouBem }) {
  const botaoRef = useRef(null);

  // Foco no primeiro botão: teclado e leitor de tela já começam no lugar certo
  useEffect(() => {
    botaoRef.current?.focus();
  }, []);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alerta-titulo"
      aria-describedby="alerta-texto"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-old-azul p-8 text-center text-white"
    >
      <h2 id="alerta-titulo" className="text-5xl font-extrabold lg:text-6xl">Você está bem?</h2>
      <p id="alerta-texto" className="max-w-2xl text-2xl text-white/90">
        Se for urgente, ligue agora para o SAMU. A Lumi vai avisar a sua família.
      </p>
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <button
          ref={botaoRef}
          type="button"
          onClick={onEstouBem}
          className="min-h-20 rounded-2xl bg-old-verde px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-white"
        >
          Estou bem
        </button>
        <a
          href="tel:192"
          className="flex min-h-20 items-center justify-center rounded-2xl bg-white px-6 text-2xl font-extrabold text-old-azul [&:focus-visible]:outline-old-verde"
        >
          Ligar para o SAMU · 192
        </a>
      </div>
    </div>
  );
}
