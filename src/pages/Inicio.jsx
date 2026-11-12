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
        {/* Abertura */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] text-old-azul text-balance sm:text-6xl">
              Envelhecer acompanhado, viver com autonomia.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-old-azul/85">
              A Lumi é uma assistente que fica numa tela em casa. Ela conversa, propõe exercícios leves
              e mantém a família por perto, sem tirar do idoso o controle da própria rotina.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/lumi" className="rounded-full bg-old-azul px-6 py-3 text-lg font-bold text-white">
                Conversar com a Lumi
              </Link>
              <Link to="/familia" className="rounded-full px-6 py-3 text-lg font-bold text-old-azul ring-2 ring-inset ring-old-azul">
                Ver o painel da família
              </Link>
            </div>
          </div>
          <HeroLumi />
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
