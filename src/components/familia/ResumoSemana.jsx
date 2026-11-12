export default function ResumoSemana({ resumo }) {
  const itens = [
    { valor: resumo.diasAtivos, rotulo: "dias com exercício" },
    { valor: resumo.sessoes, rotulo: "atividades feitas" },
    { valor: resumo.repeticoes, rotulo: "repetições no total" },
  ];
  return (
    <dl className="grid grid-cols-3 gap-3">
      {itens.map(({ valor, rotulo }) => (
        <div key={rotulo} className="rounded-2xl bg-old-verde-claro p-4">
          <dd className="text-4xl font-bold text-old-azul tabular-nums">{valor}</dd>
          <dt className="text-old-azul/80 leading-snug">{rotulo}</dt>
        </div>
      ))}
    </dl>
  );
}
