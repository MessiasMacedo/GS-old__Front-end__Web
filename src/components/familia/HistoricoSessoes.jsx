const formatar = (iso) =>
  new Date(iso).toLocaleString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export default function HistoricoSessoes({ sessoes }) {
  return (
    <ul className="divide-y divide-old-azul/10">
      {sessoes.map((s) => (
        <li key={s.id} className="flex items-center justify-between gap-4 py-3 text-old-azul">
          <span>
            <span className="block font-bold">{s.exercicio}</span>
            <span className="text-old-azul/70">{formatar(s.data)}</span>
          </span>
          <span className="shrink-0 rounded-full bg-old-ciano-claro px-3 py-1 font-bold tabular-nums">
            {s.repeticoes} rep.
          </span>
        </li>
      ))}
    </ul>
  );
}
