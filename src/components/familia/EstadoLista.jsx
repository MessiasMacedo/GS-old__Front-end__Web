// Carregando, erro e vazio num lugar só: toda lista trata os três.
export default function EstadoLista({ carregando, erro, vazio, mensagemVazio, children }) {
  if (carregando) return <p className="text-old-azul/70">Carregando…</p>;
  return (
    <>
      {erro && <p role="alert" className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-red-700">{erro}</p>}
      {vazio ? <p className="text-old-azul/70">{mensagemVazio}</p> : children}
    </>
  );
}
