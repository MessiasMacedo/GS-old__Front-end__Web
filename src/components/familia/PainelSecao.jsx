export default function PainelSecao({ titulo, descricao, acao, children, className = "" }) {
  return (
    <section className={`rounded-[2rem] bg-white p-6 shadow-md ring-1 ring-old-azul/10 sm:p-7 ${className}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-old-azul">{titulo}</h2>
          {descricao && <p className="mt-1 text-old-azul/75">{descricao}</p>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  );
}
