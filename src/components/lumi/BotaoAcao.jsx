const CORES = {
  verde: "bg-old-verde",
  ciano: "bg-old-ciano",
  branco: "bg-white ring-4 ring-inset ring-old-azul",
};

/**
 * Botão grande de ação. Texto sempre azul: verde e ciano
 * não têm contraste suficiente com texto branco.
 */
export default function BotaoAcao({ titulo, descricao, Icone, cor = "verde", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${CORES[cor]} flex items-center gap-4 rounded-3xl px-6 py-5 min-h-24 text-left
                  text-old-azul active:scale-[0.98] transition-transform`}
    >
      <span className="size-12 shrink-0"><Icone /></span>
      <span>
        <span className="block text-2xl font-bold leading-tight">{titulo}</span>
        <span className="block text-lg leading-snug">{descricao}</span>
      </span>
    </button>
  );
}
