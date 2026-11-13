// A semana em bolinhas (a mesma linguagem da prévia da Home) e os números dela.
// Feito para o fundo azul do topo do painel.
export default function ResumoSemana({ semana, resumo }) {
  const numeros = [
    [resumo.diasAtivos, "dias com exercício"],
    [resumo.sessoes, "atividades"],
    [resumo.repeticoes, "repetições"],
  ];

  return (
    <div className="rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/15 sm:p-7">
      <p className="text-lg font-bold">Últimos 7 dias</p>
      <ol className="mt-4 grid grid-cols-7 gap-2">
        {semana.map((dia, i) => (
          <li key={i} className="flex flex-col items-center gap-2">
            <span
              aria-hidden="true"
              className={`aspect-square w-full max-w-12 rounded-full ${dia.ativo ? "bg-old-verde ring-4 ring-old-ciano/40" : "ring-2 ring-inset ring-white/30"}`}
            />
            <span className={`text-base ${dia.rotulo === "hoje" ? "font-extrabold" : "font-bold text-white/80"}`}>{dia.rotulo}</span>
            <span className="sr-only">{dia.ativo ? `${dia.repeticoes} repetições` : "sem exercício"}</span>
          </li>
        ))}
      </ol>
      <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
        {numeros.map(([valor, rotulo]) => (
          <li key={rotulo}>
            <p className="text-4xl font-extrabold tabular-nums text-old-verde">{valor}</p>
            <p className="leading-snug text-white/85">{rotulo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
