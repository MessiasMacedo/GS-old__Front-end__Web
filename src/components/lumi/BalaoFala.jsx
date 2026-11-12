/**
 * Mostra a última troca: o que a pessoa disse e o que a Lumi respondeu.
 * Texto grande para quem não escutou bem a voz.
 * Lumi: balão branco à esquerda. Pessoa: balão azul à direita.
 */
export default function BalaoFala({ autor, texto }) {
  if (!texto) return null;
  const ehLumi = autor === "lumi";

  return (
    <div
      className={`max-w-xl rounded-3xl px-6 py-4 text-xl leading-relaxed shadow-sm
        ${ehLumi
          ? "self-start rounded-tl-md bg-white text-old-azul ring-1 ring-old-azul/10"
          : "self-end rounded-tr-md bg-old-azul text-white"}`}
    >
      <span className={`mb-1 block text-base font-bold ${ehLumi ? "text-old-azul/75" : "text-white/80"}`}>
        {ehLumi ? "Lumi" : "Você"}
      </span>
      {texto}
    </div>
  );
}
