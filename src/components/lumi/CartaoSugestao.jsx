/**
 * O que a Lumi propõe por iniciativa própria (ex.: um exercício da rotina).
 * Duas respostas grandes e claras: aceitar ou deixar para depois.
 * Componente só visual: quem decide a sugestão é a lógica de negócio.
 */
export default function CartaoSugestao({ titulo, detalhe, onAceitar, onRecusar, textoAceitar = "Vamos lá", textoRecusar = "Agora não" }) {
  return (
    <section aria-label="Sugestão da Lumi" className="rounded-[2rem] bg-old-verde-claro p-6 ring-1 ring-old-verde/40">
      <p className="text-lg font-bold text-old-azul/80">A Lumi sugere</p>
      <p className="mt-1 text-3xl font-extrabold leading-tight text-old-azul">{titulo}</p>
      {detalhe && <p className="mt-1 text-xl text-old-azul/85">{detalhe}</p>}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button type="button" onClick={onAceitar}
          className="min-h-16 rounded-2xl bg-old-azul px-5 text-xl font-bold text-white transition-transform active:scale-[0.98]">
          {textoAceitar}
        </button>
        <button type="button" onClick={onRecusar}
          className="min-h-16 rounded-2xl bg-white px-5 text-xl font-bold text-old-azul ring-2 ring-inset ring-old-azul transition-transform active:scale-[0.98]">
          {textoRecusar}
        </button>
      </div>
    </section>
  );
}
