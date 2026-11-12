import { useMemo } from "react";

import PainelSecao from "@/components/familia/PainelSecao";
import ResumoSemana from "@/components/familia/ResumoSemana";
import ListaAlertas from "@/components/familia/ListaAlertas";
import HistoricoSessoes from "@/components/familia/HistoricoSessoes";
import EstadoLista from "@/components/familia/EstadoLista";
import GerenciarContatos from "@/components/familia/GerenciarContatos";
import GerenciarRotina from "@/components/familia/GerenciarRotina";

import { useColecao } from "@/hooks/useColecao";
import * as contatosService from "@/services/contatosService";
import * as rotinaService from "@/services/rotinaService";
import * as sessoesService from "@/services/sessoesService";
import { gerarAlertas, resumoSemana } from "@/lib/alertas";
import { PERFIL_DEMO } from "@/lib/config";

export default function Familia() {
  const contatos = useColecao(contatosService);
  const rotina = useColecao(rotinaService);
  const sessoes = useColecao(sessoesService);

  const alertas = useMemo(() => gerarAlertas(sessoes.itens), [sessoes.itens]);
  const resumo = useMemo(() => resumoSemana(sessoes.itens), [sessoes.itens]);

  return (
    <main className="min-h-dvh bg-old-azul-claro/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold text-old-azul">Como está {PERFIL_DEMO.nome}</h1>
        <p className="mt-1 text-lg text-old-azul/80">Registros da Lumi nos últimos dias.</p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
          <PainelSecao titulo="Esta semana">
            <EstadoLista carregando={sessoes.carregando} erro={sessoes.erro}>
              <ResumoSemana resumo={resumo} />
            </EstadoLista>
          </PainelSecao>

          <PainelSecao titulo="Pontos de atenção" descricao="Registros de movimento, não diagnóstico.">
            <EstadoLista carregando={sessoes.carregando}>
              <ListaAlertas alertas={alertas} />
            </EstadoLista>
          </PainelSecao>

          <GerenciarRotina colecao={rotina} />

          <PainelSecao titulo="Histórico de atividades" className="lg:row-span-2">
            <EstadoLista carregando={sessoes.carregando} erro={sessoes.erro}
              vazio={sessoes.itens.length === 0} mensagemVazio="Nenhuma atividade registrada ainda.">
              <HistoricoSessoes sessoes={sessoes.itens} />
            </EstadoLista>
          </PainelSecao>

          <GerenciarContatos colecao={contatos} />
        </div>
      </div>
    </main>
  );
}
