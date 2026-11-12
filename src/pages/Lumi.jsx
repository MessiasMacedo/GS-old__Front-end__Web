import { useState } from "react";

import BarraTopo from "@/components/lumi/BarraTopo";
import Saudacao from "@/components/lumi/Saudacao";
import BotaoVoz from "@/components/lumi/BotaoVoz";
import StatusLumi from "@/components/lumi/StatusLumi";
import BalaoFala from "@/components/lumi/BalaoFala";
import BotaoAcao from "@/components/lumi/BotaoAcao";
import CartaoSugestao from "@/components/lumi/CartaoSugestao";
import AvisoSemSuporte from "@/components/lumi/AvisoSemSuporte";
import TelaExercicio from "@/components/lumi/TelaExercicio";
import AlertaQueda from "@/components/lumi/AlertaQueda";
import { IconeConversar, IconeExercicios, IconeFamilia } from "@/components/lumi/Icones";

import { useLumi } from "@/hooks/useLumi";
import { useSaudacao } from "@/hooks/useSaudacao";
import { useColecao } from "@/hooks/useColecao";
import * as rotinaService from "@/services/rotinaService";
import { PERFIL_DEMO } from "@/lib/config";

export default function Lumi() {
  const { saudacao, hora, data } = useSaudacao();
  const rotina = useColecao(rotinaService);
  const [sugestaoDispensada, setSugestaoDispensada] = useState(false);

  // ponytail: sugestão provisória = 1º exercício ativo da rotina.
  // Na próxima etapa quem escolhe é lib/proximaSugestao.js (hora, histórico, rotina).
  const sugestao = rotina.itens.find((r) => r.ativo);
  const lumi = useLumi({ sugestao });

  const exercitar = () =>
    sugestao ? lumi.comecarExercicio(sugestao) : lumi.dizer("Ainda não tem exercício na sua rotina. A sua família pode montar uma pelo painel.");

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-old-azul-claro/50">
      {/* halo da marca atrás da Lumi */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 size-[44rem] -translate-y-1/2 rounded-full border-[3.5rem] border-old-ciano/10" />

      <BarraTopo hora={hora} />

      {lumi.modo === "conversa" ? (
        <>
          <section className="relative mx-auto grid min-h-0 w-full max-w-7xl flex-1 items-center gap-8 overflow-y-auto px-6 py-4 lg:grid-cols-[1fr_1.05fr] md:px-10">
            {/* Esquerda: a Lumi e a conversa */}
            <div className="flex flex-col items-center gap-5">
              <BotaoVoz
                estado={lumi.estado}
                onOuvir={lumi.ouvir}
                onParar={lumi.parar}
                desabilitado={!lumi.suportaOuvir}
              />
              <StatusLumi estado={lumi.estado} erro={lumi.erro} />
              <div className="flex w-full flex-col gap-3">
                <BalaoFala autor="usuario" texto={lumi.falaUsuario} />
                <BalaoFala autor="lumi" texto={lumi.falaLumi} />
              </div>
            </div>

            {/* Direita: onde a pessoa está no dia e o que a Lumi propõe */}
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 lg:max-w-none">
              <Saudacao saudacao={saudacao} nome={PERFIL_DEMO.nome} data={data} />
              {!lumi.suportaOuvir && <AvisoSemSuporte />}
              {sugestao && !sugestaoDispensada && (
                <CartaoSugestao
                  titulo={sugestao.nome}
                  detalhe={`${sugestao.repeticoes} vezes, no seu ritmo`}
                  onAceitar={exercitar}
                  onRecusar={() => {
                    setSugestaoDispensada(true);
                    lumi.dizer("Tudo bem! Fica para mais tarde. Quando quiser, é só me chamar.");
                  }}
                />
              )}
            </div>
          </section>

          <nav aria-label="O que você quer fazer" className="relative mx-auto grid w-full max-w-7xl grid-cols-3 gap-3 px-4 pb-4 pt-2 sm:gap-4 sm:px-6 sm:pb-6 md:px-10">
            <BotaoAcao
              titulo="Conversar"
              descricao="Bater um papo com a Lumi"
              Icone={IconeConversar}
              cor="verde"
              onClick={lumi.suportaOuvir ? lumi.ouvir : () => lumi.dizer("Para conversar por voz, abra a Lumi no Google Chrome.")}
            />
            <BotaoAcao
              titulo="Exercícios"
              descricao="Movimentar o corpo"
              Icone={IconeExercicios}
              cor="ciano"
              onClick={exercitar}
            />
            <BotaoAcao
              titulo="Minha família"
              descricao="Falar com quem você ama"
              Icone={IconeFamilia}
              cor="branco"
              onClick={() => lumi.dizer("Logo vou poder te ajudar a falar com a sua família.")}
            />
          </nav>
        </>
      ) : (
        <TelaExercicio
          key={lumi.exercicio?.id ?? "demonstracao"}
          exercicio={lumi.exercicio}
          lumi={lumi}
          aoRepetir={lumi.aoRepetir}
          aoCair={lumi.aoCair}
          aoFicarParado={lumi.aoFicarParado}
          onParar={lumi.terminarExercicio}
        />
      )}

      {lumi.alerta && <AlertaQueda onEstouBem={lumi.fecharAlerta} />}
    </main>
  );
}
