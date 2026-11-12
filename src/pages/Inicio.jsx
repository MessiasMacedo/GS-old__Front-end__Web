import { Link } from "react-router";
import HeroLumi from "@/components/site/HeroLumi";
import Foto from "@/components/site/Foto";
import Rodape from "@/components/site/Rodape";
import LumiRosto from "@/components/lumi/LumiRosto";
import PreviaExercicio from "@/components/site/PreviaExercicio";
import ListaAlertas from "@/components/familia/ListaAlertas";
import { IconeCheck, IconeX } from "@/components/lumi/Icones";
import { PROBLEMA, FOTOS_SOZINHO, DADOS, PILARES, EXERCICIOS, COMO_FUNCIONA, PRIVACIDADE } from "@/lib/conteudoHome";

// Posição de cada foto no mosaico: a primeira ocupa 2×2, a segunda uma faixa larga.
const MOSAICO = [
  "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "col-span-2 aspect-[16/9] md:aspect-auto",
  "aspect-square md:aspect-auto",
  "aspect-square md:aspect-auto",
];

// Exemplo estático do painel: 4 dias ativos e depois 3 parados, o que gera o alerta.
const SEMANA_EXEMPLO = [
  ["Seg", true], ["Ter", true], ["Qua", true], ["Qui", true], ["Sex", false], ["Sáb", false], ["Dom", false],
];
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
              <h1 className="text-5xl font-extrabold leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
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

        {/* Problema: título e texto lado a lado, mosaico de fotos embaixo, ocupando a largura toda */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-end gap-6 md:grid-cols-2 md:gap-12">
            <h2 className="text-4xl font-extrabold leading-tight text-old-azul text-balance sm:text-5xl">{PROBLEMA.titulo}</h2>
            <div>
              {PROBLEMA.paragrafos.map((p) => (
                <p key={p} className="mt-4 text-xl leading-relaxed text-old-azul/85 first:mt-0">{p}</p>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:h-[34rem] md:grid-cols-4 md:grid-rows-2">
            {FOTOS_SOZINHO.map((f, i) => (
              <div key={f.src} className={`overflow-hidden rounded-[2rem] ${MOSAICO[i]}`}>
                <Foto {...f} />
              </div>
            ))}
          </div>
        </section>

        {/* Dados: números grandes sobre o azul */}
        <section className="relative overflow-hidden bg-old-azul text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-40 size-[40rem] rounded-full border-[3.5rem] border-old-ciano/10" />
          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight text-balance sm:text-5xl">{DADOS.titulo}</h2>
            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {DADOS.numeros.map((n) => (
                <li key={n.valor} className="border-t-4 border-old-ciano/40 pt-6">
                  <p className="whitespace-nowrap text-6xl font-extrabold leading-none tabular-nums text-old-verde">{n.valor}</p>
                  <p className="mt-4 text-xl leading-snug">{n.rotulo}</p>
                  <p className="mt-3 text-base text-white/75">{n.fonte}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O que a Lumi faz: três pilares numerados */}
        <section className="bg-old-azul-claro/60">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-old-azul text-balance sm:text-5xl">
              Companhia, movimento e família por perto
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PILARES.map((p, i) => (
                <article key={p.titulo} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-old-azul/10 transition-transform hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Foto {...p.foto} className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="flex size-12 items-center justify-center rounded-full bg-old-verde text-xl font-extrabold text-old-azul ring-4 ring-old-ciano/30">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-tight text-old-azul">{p.titulo}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-old-azul/85">{p.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Exercícios: como a câmera acompanha e o que ela percebe, com dados sobre movimento e quedas */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          {/* título e introdução na largura toda, acima das duas colunas */}
          <h2 className="text-4xl font-extrabold leading-tight text-old-azul sm:text-5xl lg:text-6xl">{EXERCICIOS.titulo}</h2>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-old-azul/85">{EXERCICIOS.texto}</p>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <PreviaExercicio />
            <div>
              <ol className="space-y-6">
                {EXERCICIOS.passos.map((p, i) => (
                  <li key={p.titulo} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-old-verde text-lg font-extrabold text-old-azul ring-4 ring-old-ciano/30">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xl font-bold text-old-azul">{p.titulo}</p>
                      <p className="mt-1 text-lg leading-relaxed text-old-azul/85">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* aviso em faixa fina, ocupando da prévia até o texto */}
          <p className="mt-10 rounded-2xl border-l-8 border-old-ciano bg-old-ciano-claro px-5 py-3 text-lg text-old-azul">
            {EXERCICIOS.aviso}
          </p>

          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {EXERCICIOS.dados.map((d) => (
              <li key={d.valor} className="rounded-[2rem] bg-old-verde-claro p-7">
                <p className="text-6xl font-extrabold leading-none tabular-nums text-old-azul">{d.valor}</p>
                <p className="mt-4 text-xl leading-snug text-old-azul">{d.rotulo}</p>
                <p className="mt-3 text-base text-old-azul/75">{d.fonte}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Painel da família: prévia com a semana e um alerta */}
        <section className="bg-old-ciano-claro">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight text-old-azul text-balance sm:text-5xl">
                A família sabe quando precisa ligar
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-old-azul/85">
                O painel mostra as atividades da semana e avisa quando algo foge do normal, como dias
                seguidos sem exercício ou uma queda nas repetições. A decisão do que fazer é sempre da família.
              </p>
              <Link to="/familia" className="mt-8 inline-block rounded-full bg-old-azul px-7 py-3.5 text-lg font-bold text-white transition-transform hover:-translate-y-0.5">
                Abrir o painel de exemplo
              </Link>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-old-azul/10 sm:p-8" role="group" aria-label="Exemplo do painel da família">
              <p className="text-xl font-bold text-old-azul">Dona Maria esta semana</p>
              <ol className="mt-4 grid grid-cols-7 gap-2">
                {SEMANA_EXEMPLO.map(([dia, ativo]) => (
                  <li key={dia} className="flex flex-col items-center gap-2">
                    <span
                      className={`aspect-square w-full max-w-10 rounded-full ${ativo ? "bg-old-verde ring-2 ring-old-ciano/40 sm:ring-4" : "bg-old-azul-claro ring-2 ring-inset ring-old-azul/15"}`}
                      aria-hidden="true"
                    />
                    <span className="text-base font-bold text-old-azul">{dia}</span>
                    <span className="sr-only">{ativo ? "fez exercício" : "sem exercício"}</span>
                  </li>
                ))}
              </ol>
              <p className="mb-3 mt-6 text-lg font-bold text-old-azul">Pontos de atenção</p>
              <ListaAlertas alertas={ALERTA_EXEMPLO} />
            </div>
          </div>
        </section>

        {/* Como funciona: a própria Lumi no lugar de um desenho do aparelho
            (o hardware ainda está sendo construído, então não desenhamos um formato que não existe) */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex justify-center rounded-[2.5rem] bg-old-verde-claro p-10 sm:p-14">
            <LumiRosto seguirOlhar className="w-56 sm:w-72" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-old-azul text-balance sm:text-5xl">
              Feita para quem não quer aprender tecnologia
            </h2>
            <dl className="mt-8 space-y-6">
              {COMO_FUNCIONA.map((a) => (
                <div key={a.titulo} className="flex gap-4">
                  <span className="mt-1 size-6 shrink-0 rounded-full border-[6px] border-old-ciano bg-old-verde" aria-hidden="true" />
                  <div>
                    <dt className="text-xl font-bold text-old-azul">{a.titulo}</dt>
                    <dd className="mt-1 text-lg text-old-azul/85">{a.texto}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Privacidade: segundo momento em azul, fecha a página com a promessa */}
        <section className="bg-old-azul text-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
              Cuidado <span className="text-old-verde">sem vigilância</span>
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-7 text-old-azul sm:p-9">
                <h3 className="text-2xl font-bold">A Lumi faz</h3>
                <ul className="mt-5 space-y-4 text-lg">
                  {PRIVACIDADE.faz.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 size-7 shrink-0 rounded-full bg-old-verde p-1.5"><IconeCheck /></span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] p-7 ring-2 ring-inset ring-white/25 sm:p-9">
                <h3 className="text-2xl font-bold">A Lumi não faz</h3>
                <ul className="mt-5 space-y-4 text-lg text-white/90">
                  {PRIVACIDADE.naoFaz.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 size-7 shrink-0 rounded-full bg-white/15 p-1.5"><IconeX /></span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </>
  );
}
