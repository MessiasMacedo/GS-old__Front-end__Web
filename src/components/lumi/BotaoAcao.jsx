// Cor do círculo do ícone. O texto fica sempre azul sobre branco.
const CORES = {
  verde: "bg-old-verde",
  ciano: "bg-old-ciano",
  branco: "bg-old-azul-claro",
};

/**
 * Botão grande de ação da tela do tablet: cartão branco, ícone num círculo
 * com a cor da marca, título e uma linha explicando o que acontece.
 * Em tela estreita (retrato, celular) vira ícone + título, para sobrar espaço para a Lumi.
 */
export default function BotaoAcao({ titulo, descricao, Icone, cor = "verde", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-24 flex-col items-center gap-2 rounded-[1.75rem] bg-white p-3 text-center text-old-azul
                 lg:flex-row lg:gap-4 lg:px-5 lg:py-4 lg:text-left shadow-md ring-1 ring-old-azul/10 transition-transform active:scale-[0.98]"
    >
      <span className={`${CORES[cor]} flex size-12 shrink-0 items-center justify-center rounded-full p-2.5 ring-4 ring-white sm:size-14 lg:size-16 lg:p-3.5`}>
        <Icone />
      </span>
      <span>
        <span className="block text-lg font-bold leading-tight sm:text-xl lg:text-2xl">{titulo}</span>
        <span className="hidden text-lg leading-snug text-old-azul/80 lg:block">{descricao}</span>
      </span>
    </button>
  );
}
