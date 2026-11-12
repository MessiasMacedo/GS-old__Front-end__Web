import LumiRosto from "@/components/lumi/LumiRosto";

// Desenho do protótipo físico: tela num suporte, câmera no topo.
export default function IlustracaoAparelho() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center" aria-hidden="true">
      <div className="relative w-full rounded-[2rem] bg-old-azul p-4 pt-7 shadow-xl">
        <span className="absolute left-1/2 top-2.5 size-3 -translate-x-1/2 rounded-full bg-old-ciano ring-4 ring-old-azul/60" />
        <div className="flex aspect-[4/3] flex-col items-center justify-between rounded-2xl bg-white p-4">
          <LumiRosto estado="parada" className="w-24" />
          <p className="text-lg font-bold text-old-azul">Bom dia, Dona Maria</p>
          <div className="grid w-full grid-cols-3 gap-2">
            <span className="h-8 rounded-lg bg-old-verde" />
            <span className="h-8 rounded-lg bg-old-ciano" />
            <span className="h-8 rounded-lg ring-2 ring-inset ring-old-azul" />
          </div>
        </div>
      </div>
      <div className="h-14 w-6 bg-old-azul/80" />
      <div className="h-4 w-48 rounded-full bg-old-azul" />
    </div>
  );
}
