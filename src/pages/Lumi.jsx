import BarraTopo from "@/components/lumi/BarraTopo";
import Saudacao from "@/components/lumi/Saudacao";
import BotaoVoz from "@/components/lumi/BotaoVoz";
import StatusLumi from "@/components/lumi/StatusLumi";
import BalaoFala from "@/components/lumi/BalaoFala";
import BotaoAcao from "@/components/lumi/BotaoAcao";
import AvisoSemSuporte from "@/components/lumi/AvisoSemSuporte";
import TelaExercicio from "@/components/lumi/TelaExercicio";
import AlertaQueda from "@/components/lumi/AlertaQueda";
import TelaFamilia from "@/components/lumi/TelaFamilia";
import { IconeExercicios, IconeFamilia } from "@/components/lumi/Icones";

import { useLumi } from "@/hooks/useLumi";
import { useSaudacao } from "@/hooks/useSaudacao";
import { useColecao } from "@/hooks/useColecao";
import * as rotinaService from "@/services/rotinaService";
import * as contatosService from "@/services/contatosService";
import { PERFIL_DEMO } from "@/lib/config";

export default function Lumi() {
  const { saudacao, hora, data } = useSaudacao();
  const rotina = useColecao(rotinaService);
  const contatos = useColecao(contatosService); // os mesmos contatos do painel da família

  // ponytail: sugestão provisória = 1º exercício ativo da rotina.
  // Na próxima etapa quem escolhe é lib/proximaSugestao.js (hora, histórico, rotina).
  const sugestao = rotina.itens.find((r) => r.ativo);
  const lumi = useLumi({ sugestao, contatos: contatos.itens });

  const exercitar = () =>
    sugestao ? lumi.comecarExercicio(sugestao) : lumi.dizer("Ainda não tem exercício na sua rotina. A sua família pode montar uma pelo painel.");

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-old-azul-claro/50">
      {/* halo da marca atrás da Lumi */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 size-[44rem] -translate-y-1/2 rounded-full border-[3.5rem] border-old-ciano/10" />

      <BarraTopo hora={hora} />

      {lumi.modo === "conversa" ? (
        <>
          {/* Só o essencial: a Lumi (que é o botão de falar), a conversa e 2 caminhos grandes */}
          <section className="relative mx-auto grid min-h-0 w-full max-w-6xl flex-1 items-center [align-content:safe_center] gap-6 overflow-y-auto px-6 py-4 md:px-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="flex flex-col items-center gap-4">
              <BotaoVoz
                estado={lumi.estado}
                onOuvir={lumi.ouvir}
                onParar={lumi.parar}
                desabilitado={!lumi.suportaOuvir}
              />
              <StatusLumi estado={lumi.estado} erro={lumi.erro} />
            </div>

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 lg:mx-0">
              <Saudacao saudacao={saudacao} nome={PERFIL_DEMO.nome} data={data} />
              {!lumi.suportaOuvir && <AvisoSemSuporte />}
              <div className="flex flex-col gap-3">
                <BalaoFala autor="usuario" texto={lumi.falaUsuario} />
                <BalaoFala autor="lumi" texto={lumi.falaLumi} />
              </div>
            </div>
          </section>

          <nav aria-label="O que você quer fazer" className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 pb-4 pt-2 sm:gap-5 sm:px-6 sm:pb-6 md:px-10">
            <BotaoAcao
              titulo="Exercícios"
              descricao={sugestao ? `${sugestao.nome}, ${sugestao.repeticoes} vezes` : "Movimentar o corpo"}
              Icone={IconeExercicios}
              cor="verde"
              onClick={exercitar}
            />
            <BotaoAcao
              titulo="Minha família"
              descricao="Falar com quem você ama"
              Icone={IconeFamilia}
              cor="ciano"
              onClick={lumi.abrirFamilia}
            />
          </nav>
        </>
      ) : lumi.modo === "familia" ? (
        <TelaFamilia
          contatos={contatos.itens}
          ligandoPara={lumi.ligandoPara}
          lumi={lumi}
          onLigar={lumi.ligarPara}
          onDesligar={lumi.desligar}
          onVoltar={lumi.sairDaFamilia}
        />
      ) : (
        <TelaExercicio
          key={lumi.exercicio?.id ?? "demonstracao"}
          exercicio={lumi.exercicio}
          lumi={lumi}
          aoRepetir={lumi.aoRepetir}
          aoCair={lumi.aoCair}
          aoSumir={lumi.aoSumir}
          aoEnquadrar={lumi.aoEnquadrar}
          aoFicarParado={lumi.aoFicarParado}
          onParar={lumi.terminarExercicio}
        />
      )}

      {lumi.alerta && <AlertaQueda nivel={lumi.alerta} onEstouBem={lumi.fecharAlerta} onPedirAjuda={lumi.pedirAjuda} />}
    </main>
  );
}
