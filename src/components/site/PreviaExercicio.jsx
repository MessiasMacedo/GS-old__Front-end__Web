import LumiRosto from "@/components/lumi/LumiRosto";

/**
 * Prévia da tela de exercício: indicador de câmera, botão de parar,
 * esqueleto com os pontos do corpo (como o MediaPipe Pose enxerga) e contador.
 * É ilustração da Home; a tela real fica em /lumi.
 */
export default function PreviaExercicio() {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-old-azul/10 sm:p-7" role="img"
      aria-label="Prévia da tela de exercício: câmera ligada, o corpo marcado por pontos e o contador em 8 de 10 repetições">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-old-azul px-4 py-2 text-base font-bold text-white">
          <span className="exercicio-camera size-3 rounded-full bg-old-verde" />
          Câmera ligada
        </span>
        <span className="rounded-full px-4 py-2 text-base font-bold text-old-azul ring-2 ring-inset ring-old-azul">Parar</span>
      </div>

      <div className="relative mt-5 flex justify-center rounded-3xl bg-old-azul-claro py-6">
        <svg viewBox="0 0 200 230" className="h-56 sm:h-64" aria-hidden="true">
          <g stroke="#192b83" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M80 72 L120 72 M86 135 L114 135 M100 72 L100 135" />
            <path d="M86 135 L84 180 L82 222 M114 135 L116 180 L118 222" />
            <g className="exercicio-braco exercicio-braco-esq"><path d="M80 72 L76 102 L74 132" /></g>
            <g className="exercicio-braco exercicio-braco-dir"><path d="M120 72 L124 102 L126 132" /></g>
          </g>
          <circle cx="100" cy="42" r="16" fill="#192b83" />
          <g fill="#00c4cd" stroke="#192b83" strokeWidth="2">
            {[[80, 72], [120, 72], [86, 135], [114, 135], [84, 180], [116, 180], [82, 222], [118, 222]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />
            ))}
            <g className="exercicio-braco exercicio-braco-esq"><circle cx="76" cy="102" r="6" /><circle cx="74" cy="132" r="6" /></g>
            <g className="exercicio-braco exercicio-braco-dir"><circle cx="124" cy="102" r="6" /><circle cx="126" cy="132" r="6" /></g>
          </g>
        </svg>
        <LumiRosto estado="falando" className="absolute bottom-3 right-3 w-16 sm:w-20" />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-old-azul">Elevação dos braços</p>
          <p className="text-base text-old-azul/80">“Isso, devagar. Mais duas!”</p>
        </div>
        <p className="text-5xl font-extrabold tabular-nums text-old-azul">8<span className="text-2xl text-old-azul/60">/10</span></p>
      </div>
      <div className="mt-3 h-4 overflow-hidden rounded-full bg-old-azul-claro">
        <div className="h-full w-4/5 rounded-full bg-old-verde" />
      </div>
    </div>
  );
}
