/**
 * Mostra a última troca: o que a pessoa disse e o que a Lumi respondeu.
 * Texto grande para quem não escutou bem a voz.
 */
export default function BalaoFala({ autor, texto }) {
  if (!texto) return null;
  const ehLumi = autor === "lumi";

  return (
    <div
      className={`max-w-2xl rounded-3xl px-6 py-4 text-xl leading-relaxed text-old-azul
        ${ehLumi ? "bg-old-ciano-claro self-start rounded-tl-md" : "bg-old-azul-claro self-end rounded-tr-md"}`}
    >
      <span className="block text-base font-bold mb-1">{ehLumi ? "Lumi" : "Você"}</span>
      {texto}
    </div>
  );
}
