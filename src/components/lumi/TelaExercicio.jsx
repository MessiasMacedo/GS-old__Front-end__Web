import LumiRosto from "./LumiRosto";
import BalaoFala from "./BalaoFala";
import FiguraExercicio from "./FiguraExercicio";
import { IconeParar } from "./Icones";
import { usePose } from "@/hooks/usePose";
import { useExercicio } from "@/hooks/useExercicio";
import { tipoDeMovimento } from "@/lib/movimento";

const CORPO = {
  fora: { texto: "Não estou te vendo", cor: "bg-white text-old-azul" },
  ok: { texto: "Em pé ou sentado", cor: "bg-old-verde text-old-azul" },
  deitado: { texto: "Deitado", cor: "bg-old-ciano text-old-azul" },
  caiu: { texto: "Queda percebida", cor: "bg-white text-old-azul" },
  sumiu: { texto: "Saiu da imagem por baixo", cor: "bg-white text-old-azul" },
  parado: { texto: "Sem movimento", cor: "bg-white text-old-azul" },
};

const pct = (n) => `${Math.round(n * 100)}%`;
const num = (n) => (n === null ? "—" : n.toLocaleString("pt-BR", { maximumFractionDigits: 2 }));

// Números ao vivo para calibrar a detecção (só no modo demonstração): em vez de
// chutar os valores de AJUSTES em lib/movimento.js, o grupo testa e lê aqui.
function PainelDiagnostico({ d }) {
  if (!d) return null;
  const linhas = [
    ["Pessoa na imagem", d.pessoa ? "sim" : "não"],
    ["Confiança (cabeça e tronco)", pct(d.confianca), "mínimo 60%"],
    ["Da cabeça aos pés", d.inteiro ? "sim" : "não"],
    ["Altura do quadril", num(d.quadril), "0 = topo, 1 = chão"],
    ["Deitado (último 1 s)", pct(d.deitado), "50% ou mais = deitado"],
    ["Movimento (8 s)", num(d.movimento), "abaixo de 0,04 = parado"],
  ];
  return (
    <dl className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-4 text-old-azul shadow-md ring-1 ring-old-azul/10 sm:grid-cols-3">
      {linhas.map(([rotulo, valor, dica]) => (
        <div key={rotulo}>
          <dt className="text-base text-old-azul/75">{rotulo}</dt>
          <dd className="text-xl font-extrabold tabular-nums">{valor}</dd>
          {dica && <dd className="text-sm text-old-azul/60">{dica}</dd>}
        </div>
      ))}
    </dl>
  );
}

/**
 * Tela do exercício: à esquerda o que fazer (boneco + Lumi falando),
 * à direita a câmera com o esqueleto e o contador.
 * A câmera liga quando esta tela aparece e desliga quando ela sai.
 * exercicio = null: modo demonstração (só o detector de queda).
 */
export default function TelaExercicio({ exercicio, lumi, aoRepetir, aoCair, aoSumir, aoFicarParado, aoEnquadrar, onParar }) {
  const { total, corpo, enquadrado, diagnostico, aoDetectar, contarNaMao } = useExercicio({
    exercicio, aoRepetir, aoCair, aoSumir, aoFicarParado, aoEnquadrar,
  });
  const { videoRef, canvasRef, status, erro } = usePose(aoDetectar);
  const demo = !exercicio;
  const movimento = demo ? null : tipoDeMovimento(exercicio.nome);
  const meta = exercicio?.repeticoes ?? 0;

  return (
    <section className="relative mx-auto grid min-h-0 w-full max-w-7xl flex-1 content-start gap-6 overflow-y-auto px-6 py-4 md:px-10 lg:grid-cols-[1fr_1.35fr] lg:content-center">
      {/* Câmera (primeiro no celular e no tablet em pé) */}
      <div className="flex flex-col gap-4 lg:order-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-old-azul shadow-xl">
          {/* espelhado: a pessoa se vê como num espelho */}
          <video ref={videoRef} muted playsInline className="absolute inset-0 size-full -scale-x-100 object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 size-full -scale-x-100 object-cover" />

          {status === "pronto" && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-old-azul px-4 py-2 text-lg font-bold text-white">
              <span className="exercicio-camera size-3 rounded-full bg-old-verde" />
              Câmera ligada
            </span>
          )}
          {status !== "pronto" && (
            <p role="status" className="absolute inset-0 flex items-center justify-center p-8 text-center text-2xl font-bold text-white">
              {erro ?? "Ligando a câmera…"}
            </p>
          )}
          {/* Antes de tudo, enquadrar: sem os pés na imagem, uma queda sairia pela borda de baixo */}
          {status === "pronto" && !enquadrado && (corpo === "fora" || corpo === "ok") ? (
            <p aria-live="polite" className="absolute inset-x-4 bottom-4 rounded-2xl bg-old-azul/90 px-5 py-3 text-center text-2xl font-extrabold text-white">
              Afaste-se até eu ver você da cabeça aos pés
            </p>
          ) : (
            status === "pronto" && (demo || corpo !== "ok") && (
              <p aria-live="assertive" className={`absolute bottom-4 left-4 rounded-full px-5 py-2 text-2xl font-extrabold shadow-lg ${CORPO[corpo].cor}`}>
                {CORPO[corpo].texto}
              </p>
            )
          )}
        </div>

        {demo && status === "pronto" && <PainelDiagnostico d={diagnostico} />}

        {!demo && (
          <div>
            <div className="flex items-end justify-between gap-4">
              <p className="text-2xl font-bold text-old-azul">Repetições</p>
              <p aria-live="polite" className="text-6xl font-extrabold tabular-nums text-old-azul">
                {total}<span className="text-3xl text-old-azul/60">/{meta}</span>
              </p>
            </div>
            <div className="mt-2 h-5 overflow-hidden rounded-full bg-white ring-1 ring-old-azul/10">
              <div className="h-full rounded-full bg-old-verde transition-[width] duration-300" style={{ width: `${(total / meta) * 100}%` }} />
            </div>
            {/* A câmera ainda não sabe conferir este exercício: quem conta é a pessoa.
                A câmera continua ligada só para perceber uma queda. */}
            {!movimento && (
              <button
                type="button"
                onClick={contarNaMao}
                className="mt-4 min-h-20 w-full rounded-2xl bg-old-verde text-2xl font-extrabold text-old-azul active:scale-[0.98]"
              >
                Fiz mais uma
              </button>
            )}
          </div>
        )}
      </div>

      {/* O que fazer */}
      <div className="flex flex-col gap-5 lg:order-1">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-extrabold leading-tight text-old-azul text-balance lg:text-5xl">
            {demo ? "Modo demonstração" : exercicio.nome}
          </h1>
          <button
            type="button"
            onClick={() => onParar(total)}
            className="inline-flex min-h-16 shrink-0 items-center gap-3 rounded-2xl bg-old-azul px-6 text-xl font-bold text-white active:scale-[0.98]"
          >
            <span className="size-7"><IconeParar /></span>
            Parar
          </button>
        </div>

        {demo ? (
          <p className="text-2xl text-old-azul/85">
            Fique de corpo inteiro na frente da câmera. Se você cair, sair da imagem por baixo ou ficar parado no chão, eu pergunto se você está bem.
          </p>
        ) : (
          <div className="hidden justify-center rounded-[2rem] bg-white py-4 shadow-md ring-1 ring-old-azul/10 sm:flex">
            <FiguraExercicio movimento={movimento} className="h-48 lg:h-64" />
          </div>
        )}

        <div className="flex items-start gap-3">
          <LumiRosto estado={lumi.estado} className="w-20 shrink-0" />
          <BalaoFala autor="lumi" texto={lumi.falaLumi} />
        </div>
      </div>
    </section>
  );
}
