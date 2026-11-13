import { diasEntre } from "@/lib/alertas";

const hora = (iso) => new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

function nomeDoDia(iso, agora) {
  const dias = diasEntre(iso, agora);
  if (dias === 0) return "Hoje";
  if (dias === 1) return "Ontem";
  return new Date(iso).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "short" });
}

/** Histórico agrupado por dia ("Hoje", "Ontem", "segunda-feira, 9 de nov."). Chega em ordem, do mais novo. */
export default function HistoricoSessoes({ sessoes }) {
  const agora = new Date();
  const grupos = new Map();
  for (const s of sessoes) {
    const dia = nomeDoDia(s.data, agora);
    grupos.set(dia, [...(grupos.get(dia) ?? []), s]);
  }

  return (
    <div className="flex flex-col gap-6">
      {[...grupos].map(([dia, lista]) => (
        <section key={dia}>
          <h3 className="mb-2 text-lg font-bold text-old-azul first-letter:uppercase">{dia}</h3>
          <ul className="flex flex-col gap-2">
            {lista.map((s) => {
              const agoraMesmo = agora - new Date(s.data) < 60_000; // destaque para quem acompanha ao vivo
              return (
                <li
                  key={s.id}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-old-azul ${agoraMesmo ? "bg-old-verde-claro ring-2 ring-old-verde" : "bg-old-azul-claro/50"}`}
                >
                  <span className="w-14 shrink-0 tabular-nums text-old-azul/75">{hora(s.data)}</span>
                  <span className="flex-1 font-bold">{s.exercicio}</span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 font-bold tabular-nums ring-1 ring-old-azul/10">
                    {s.repeticoes} rep.
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
