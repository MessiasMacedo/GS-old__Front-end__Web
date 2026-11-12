import LumiRosto from "@/components/lumi/LumiRosto";
import FiguraExercicio from "@/components/lumi/FiguraExercicio";

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
        <FiguraExercicio className="h-56 sm:h-64" />
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
