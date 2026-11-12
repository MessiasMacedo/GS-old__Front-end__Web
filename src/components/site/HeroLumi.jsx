import LumiRosto from "@/components/lumi/LumiRosto";
import { useRoteiro } from "@/hooks/useRoteiro";
import { ROTEIRO_HERO } from "@/lib/conteudoHome";

// A Lumi se apresenta sozinha, encenando uma manhã com a Dona Maria,
// e acompanha o mouse do visitante com o olhar.
export default function HeroLumi() {
  const passo = useRoteiro(ROTEIRO_HERO);
  const ehLumi = passo.autor === "lumi";

  return (
    <div className="flex flex-col items-center gap-8">
      <LumiRosto estado={passo.estado} seguirOlhar className="w-64 md:w-80" />
      <p
        key={passo.texto}
        aria-live="polite"
        className={`min-h-20 max-w-sm rounded-3xl px-5 py-3 text-lg leading-snug text-old-azul shadow-lg
          ${ehLumi ? "bg-white rounded-tl-md self-start md:ml-6" : "bg-old-ciano rounded-tr-md self-end md:mr-6"}`}
      >
        <span className="block text-sm font-bold">{ehLumi ? "Lumi" : "Dona Maria"}</span>
        {passo.texto}
      </p>
    </div>
  );
}
