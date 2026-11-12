import LumiRosto from "@/components/lumi/LumiRosto";
import { useRoteiro } from "@/hooks/useRoteiro";
import { ROTEIRO_HERO } from "@/lib/conteudoHome";

// A Lumi se apresenta sozinha, encenando uma manhã com a Dona Maria.
export default function HeroLumi() {
  const passo = useRoteiro(ROTEIRO_HERO);
  const ehLumi = passo.autor === "lumi";

  return (
    <div className="flex flex-col items-center gap-6">
      <LumiRosto estado={passo.estado} className="w-60 md:w-72" />
      <p
        key={passo.texto}
        aria-live="polite"
        className={`min-h-20 max-w-sm rounded-3xl px-5 py-3 text-lg leading-snug text-old-azul
          ${ehLumi ? "bg-old-ciano-claro rounded-tl-md" : "bg-old-azul-claro rounded-tr-md self-end"}`}
      >
        <span className="block text-sm font-bold">{ehLumi ? "Lumi" : "Dona Maria"}</span>
        {passo.texto}
      </p>
    </div>
  );
}
