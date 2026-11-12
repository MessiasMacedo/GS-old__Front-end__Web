import LumiRosto from "./LumiRosto";
import { IconeMicrofone, IconeParar } from "./Icones";

/**
 * A própria Lumi é o botão de falar: tocar nela = começar a conversar.
 * O selo com o microfone deixa claro que ela é tocável.
 */
export default function BotaoVoz({ estado, onOuvir, onParar, desabilitado }) {
  const ocupada = estado !== "parada";
  const rotulo = ocupada ? "Parar a Lumi" : "Tocar na Lumi para falar";

  return (
    <button
      type="button"
      onClick={ocupada ? onParar : onOuvir}
      disabled={desabilitado}
      aria-label={rotulo}
      className="relative rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <LumiRosto estado={estado} className="w-44 sm:w-56 lg:w-72" />
      <span
        className="absolute bottom-[4%] right-[4%] flex items-center justify-center
                   size-16 rounded-full bg-old-azul text-white shadow-lg ring-[6px] ring-white"
      >
        <span className="size-8">{ocupada ? <IconeParar /> : <IconeMicrofone />}</span>
      </span>
    </button>
  );
}
