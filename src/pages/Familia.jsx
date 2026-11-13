import { useMemo } from "react";

import LumiRosto from "@/components/lumi/LumiRosto";
import PainelSecao from "@/components/familia/PainelSecao";
import ResumoSemana from "@/components/familia/ResumoSemana";
import ListaAlertas from "@/components/familia/ListaAlertas";
import HistoricoSessoes from "@/components/familia/HistoricoSessoes";
import EstadoLista from "@/components/familia/EstadoLista";
import GerenciarContatos from "@/components/familia/GerenciarContatos";
import GerenciarRotina from "@/components/familia/GerenciarRotina";

import { useColecao } from "@/hooks/useColecao";
import { useAoVivo } from "@/hooks/useAoVivo";
import * as contatosService from "@/services/contatosService";
import * as rotinaService from "@/services/rotinaService";
import * as sessoesService from "@/services/sessoesService";
import { gerarAlertas, resumoSemana, semana, situacao } from "@/lib/alertas";
import { PERFIL_DEMO } from "@/lib/config";

export default function Familia() {
  const contatos = useColecao(contatosService);
  const rotina = useColecao(rotinaService);
  const sessoes = useColecao(sessoesService);

  // A Lumi grava uma sessão no tablet -> o painel atualiza sozinho, sem piscar "Carregando…"
  const aoVivo = useAoVivo("sessoes", () => sessoes.recarregar({ silencioso: true }));

  const alertas = useMemo(() => gerarAlertas(sessoes.itens), [sessoes.itens]);
  const resumo = useMemo(() => resumoSemana(sessoes.itens), [sessoes.itens]);
  const dias = useMemo(() => semana(sessoes.itens), [sessoes.itens]);

  const topo = sessoes.carregando
    ? { tom: "neutro", titulo: "Carregando os registros…", detalhe: "" }
    : sessoes.erro
      ? { tom: "neutro", titulo: "Não deu para carregar agora", detalhe: sessoes.erro }
      : situacao(sessoes.itens, PERFIL_DEMO.nome);

  return (
    <main className="min-h-dvh bg-old-azul-claro/50">
      {/* Topo: a resposta para "ela está bem?" e a semana em bolinhas */}
      <section className="relative overflow-hidden bg-old-azul text-white [&_:focus-visible]:outline-old-verde">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full border-[3.5rem] border-white/5" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-lg font-bold text-old-ciano">Como está {PERFIL_DEMO.nome}</p>
              {aoVivo && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold" title="O painel atualiza sozinho quando a Lumi registra algo">
                  <span className="exercicio-camera size-2.5 rounded-full bg-old-verde" aria-hidden="true" />
                  Ao vivo
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-5">
              <LumiRosto estado={topo.tom === "atencao" ? "pensando" : "parada"} className="w-20 shrink-0 sm:w-24" />
              <h1 aria-live="polite" className="text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
                {topo.titulo}
              </h1>
            </div>
            {topo.detalhe && <p className="mt-4 text-xl text-white/85">{topo.detalhe}</p>}
          </div>
          <ResumoSemana semana={dias} resumo={resumo} />
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl items-start gap-6 px-6 py-10 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col gap-6">
          <PainelSecao titulo="Pontos de atenção" descricao="Registros de movimento, não diagnóstico.">
            <EstadoLista carregando={sessoes.carregando}>
              <ListaAlertas alertas={alertas} />
            </EstadoLista>
          </PainelSecao>
          <GerenciarRotina colecao={rotina} />
          <GerenciarContatos colecao={contatos} />
        </div>

        <PainelSecao titulo="Histórico" descricao="Cada exercício que a Lumi acompanhou.">
          <EstadoLista carregando={sessoes.carregando} erro={sessoes.erro}
            vazio={sessoes.itens.length === 0} mensagemVazio="Nenhuma atividade registrada ainda.">
            <HistoricoSessoes sessoes={sessoes.itens} />
          </EstadoLista>
        </PainelSecao>
      </div>
    </main>
  );
}
