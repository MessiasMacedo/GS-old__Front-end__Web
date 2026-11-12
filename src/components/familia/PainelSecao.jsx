export default function PainelSecao({ titulo, descricao, acao, children, className = "" }) {
  return (
    <section className={`rounded-3xl bg-white p-6 ring-1 ring-old-azul/10 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-old-azul">{titulo}</h2>
          {descricao && <p className="text-old-azul/75">{descricao}</p>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  );
}
