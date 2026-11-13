import LumiRosto from "./LumiRosto";
import BalaoFala from "./BalaoFala";

const inicial = (nome) => nome.trim()[0]?.toUpperCase() ?? "?";

/**
 * "Minha família" no tablet. Sem ninguém escolhido: os contatos do painel em
 * cartões grandes (dá para tocar OU falar o nome). Com alguém escolhido: a
 * tela de chamada, que é DEMONSTRAÇÃO e diz isso na própria tela.
 */
export default function TelaFamilia({ contatos, ligandoPara, lumi, onLigar, onDesligar, onVoltar }) {
  if (ligandoPara) {
    return (
      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-6 py-8 text-center">
        <div className="relative flex size-44 items-center justify-center sm:size-52">
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-old-verde/40 motion-safe:animate-ping" />
          <span className="relative flex size-full items-center justify-center rounded-full bg-old-verde text-7xl font-extrabold text-old-azul ring-8 ring-white">
            {inicial(ligandoPara.nome)}
          </span>
        </div>
        <div>
          <p aria-live="polite" className="text-2xl font-bold text-old-azul/80">Chamando…</p>
          <h1 className="mt-1 text-5xl font-extrabold text-old-azul">{ligandoPara.nome}</h1>
          <p className="mt-2 text-2xl text-old-azul/85">
            {[ligandoPara.parentesco, ligandoPara.telefone].filter(Boolean).join(" · ")}
          </p>
        </div>
        <button
          type="button"
          onClick={onDesligar}
          className="min-h-20 w-full max-w-sm rounded-2xl bg-old-azul text-2xl font-extrabold text-white active:scale-[0.98]"
        >
          Desligar
        </button>
        <p className="text-lg text-old-azul/70">Ligação de demonstração: nenhuma chamada real é feita.</p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 md:px-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl font-extrabold leading-tight text-old-azul lg:text-5xl">Para quem você quer ligar?</h1>
        <button
          type="button"
          onClick={onVoltar}
          className="min-h-16 shrink-0 rounded-2xl bg-white px-6 text-xl font-bold text-old-azul ring-2 ring-inset ring-old-azul active:scale-[0.98]"
        >
          Voltar
        </button>
      </div>

      <div className="flex items-start gap-3">
        <LumiRosto estado={lumi.estado} className="w-16 shrink-0" />
        <BalaoFala autor="lumi" texto={lumi.falaLumi} />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {contatos.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onLigar(c)}
              className="flex min-h-28 w-full items-center gap-5 rounded-[1.75rem] bg-white p-5 text-left text-old-azul shadow-md ring-1 ring-old-azul/10 active:scale-[0.98]"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-old-ciano text-3xl font-extrabold" aria-hidden="true">
                {inicial(c.nome)}
              </span>
              <span>
                <span className="block text-2xl font-extrabold">{c.nome}</span>
                <span className="text-xl text-old-azul/80">{c.parentesco}</span>
              </span>
              <span className="ml-auto rounded-full bg-old-verde px-5 py-2 text-xl font-bold">Ligar</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
