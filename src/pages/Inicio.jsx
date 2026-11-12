import { Link } from "react-router";
import HeroLumi from "@/components/site/HeroLumi";
import Foto from "@/components/site/Foto";
import IlustracaoAparelho from "@/components/site/IlustracaoAparelho";
import Rodape from "@/components/site/Rodape";
import ListaAlertas from "@/components/familia/ListaAlertas";
import { PROBLEMA, PILARES, APARELHO, PRIVACIDADE } from "@/lib/conteudoHome";

const ALERTA_EXEMPLO = [
  { id: "ex", titulo: "3 dias sem exercícios", detalhe: "Que tal ligar e perguntar como ela está?" },
];

export default function Inicio() {
  return (
    <>
      <main>
        {/* Abertura: fundo azul para a luz da Lumi aparecer.
            Sobre o azul, verde (7,8:1) e ciano (5,7:1) passam no contraste WCAG para texto. */}
        <section className="relative overflow-hidden bg-old-azul text-white [&_:focus-visible]:outline-old-verde">
          {/* anéis decorativos: o halo da Lumi vira grafismo da marca */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-1/2 size-[60rem] -translate-y-1/2 rounded-full border-[4rem] border-old-ciano/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full border-[2.5rem] border-old-verde/10" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-base font-bold">
                <span className="size-2.5 rounded-full bg-old-verde" aria-hidden="true" />
                Assistente para quem mora sozinho
              </p>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
                Envelhecer acompanhado, <span className="text-old-verde">viver com autonomia.</span>
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">
                A Lumi é uma assistente que fica numa tela em casa. Ela conversa, propõe exercícios leves
                e mantém a família por perto, sem tirar do idoso o controle da própria rotina.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/lumi" className="rounded-full bg-old-verde px-7 py-3.5 text-lg font-bold text-old-azul transition-transform hover:-translate-y-0.5">
                  Conversar com a Lumi
                </Link>
                <Link to="/familia" className="rounded-full px-7 py-3.5 text-lg font-bold text-white ring-2 ring-inset ring-white/70 transition-colors hover:bg-white/10">
                  Ver o painel da família
                </Link>
              </div>
            </div>
            <HeroLumi />
          </div>
        </section>

        {/* Problema */}
        <section className="bg-old-azul-claro/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Foto {...PROBLEMA.foto} />
            </div>
            <div>
              <h2 className="text-4xl font-bold leading-tight text-old-azul text-balance">{PROBLEMA.titulo}</h2>
              {PROBLEMA.paragrafos.map((p) => (
                <p key={p} className="mt-5 text-xl leading-relaxed text-old-azul/85">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* O que a Lumi faz */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-old-azul text-balance">
            O que a Lumi faz no dia a dia
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {PILARES.map((p) => (
              <article key={p.titulo}>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                  <Foto {...p.foto} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-old-azul">{p.titulo}</h3>
                <p className="mt-2 text-lg leading-relaxed text-old-azul/85">{p.texto}</p>
              </article>
            ))}
          </div>
        </section>

        {/* O aparelho */}
        <section className="bg-old-verde-claro">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <IlustracaoAparelho />
            <div>
              <h2 className="text-4xl font-bold leading-tight text-old-azul text-balance">
                Uma tela simples, feita para quem não quer aprender tecnologia
              </h2>
              <dl className="mt-8 space-y-6">
                {APARELHO.map((a) => (
                  <div key={a.titulo}>
                    <dt className="text-xl font-bold text-old-azul">{a.titulo}</dt>
                    <dd className="mt-1 text-lg text-old-azul/85">{a.texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Painel da família */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-old-azul text-balance">
              A família sabe quando precisa ligar
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-old-azul/85">
              O painel mostra as atividades da semana e avisa quando algo foge do normal, como dias
              seguidos sem exercício ou uma queda nas repetições. A decisão do que fazer é sempre da família.
            </p>
            <Link to="/familia" className="mt-8 inline-block rounded-full bg-old-azul px-6 py-3 text-lg font-bold text-white">
              Abrir o painel de exemplo
            </Link>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-old-azul/10">
            <p className="mb-4 text-xl font-bold text-old-azul">Pontos de atenção</p>
            <ListaAlertas alertas={ALERTA_EXEMPLO} />
          </div>
        </section>

        {/* Privacidade */}
        <section className="bg-old-azul-claro/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-old-azul text-balance">
              Cuidado sem vigilância
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                { titulo: "A Lumi faz", itens: PRIVACIDADE.faz, cor: "bg-old-verde-claro" },
                { titulo: "A Lumi não faz", itens: PRIVACIDADE.naoFaz, cor: "bg-white" },
              ].map((bloco) => (
                <div key={bloco.titulo} className={`rounded-3xl p-7 ${bloco.cor}`}>
                  <h3 className="text-2xl font-bold text-old-azul">{bloco.titulo}</h3>
                  <ul className="mt-4 space-y-3 text-lg text-old-azul">
                    {bloco.itens.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </>
  );
}
