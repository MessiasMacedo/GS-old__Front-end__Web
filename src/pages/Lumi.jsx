import BarraTopo from "@/components/lumi/BarraTopo";
import Saudacao from "@/components/lumi/Saudacao";
import BotaoVoz from "@/components/lumi/BotaoVoz";
import StatusLumi from "@/components/lumi/StatusLumi";
import BalaoFala from "@/components/lumi/BalaoFala";
import BotaoAcao from "@/components/lumi/BotaoAcao";
import AvisoSemSuporte from "@/components/lumi/AvisoSemSuporte";
import { IconeConversar, IconeExercicios, IconeFamilia } from "@/components/lumi/Icones";

import { useConversa } from "@/hooks/useConversa";
import { useSaudacao } from "@/hooks/useSaudacao";
import { PERFIL_DEMO } from "@/lib/config";

export default function Lumi() {
  const { saudacao, hora, data } = useSaudacao();
  const lumi = useConversa();

  return (
    <main className="h-dvh flex flex-col overflow-hidden">
      <BarraTopo hora={hora} />

      <section className="flex-1 flex flex-col items-center justify-center gap-6 px-6 min-h-0">
        <BotaoVoz
          estado={lumi.estado}
          onOuvir={lumi.ouvir}
          onParar={lumi.parar}
          desabilitado={!lumi.suportaOuvir}
        />
        <StatusLumi estado={lumi.estado} erro={lumi.erro} />
        <Saudacao saudacao={saudacao} nome={PERFIL_DEMO.nome} data={data} />

        {!lumi.suportaOuvir && <AvisoSemSuporte />}

        <div className="flex flex-col gap-3 w-full max-w-2xl">
          <BalaoFala autor="usuario" texto={lumi.falaUsuario} />
          <BalaoFala autor="lumi" texto={lumi.falaLumi} />
        </div>
      </section>

      <nav aria-label="O que você quer fazer" className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6 pt-2">
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
          onClick={() => lumi.dizer("Os exercícios chegam na próxima versão. Vamos nos movimentar juntos!")}
        />
        <BotaoAcao
          titulo="Minha família"
          descricao="Falar com quem você ama"
          Icone={IconeFamilia}
          cor="branco"
          onClick={() => lumi.dizer("Logo vou poder te ajudar a falar com a sua família.")}
        />
      </nav>
    </main>
  );
}
