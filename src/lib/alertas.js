/**
 * Regras de alerta (RF12). Funções puras: recebem sessões, devolvem alertas.
 * Regras explícitas para o alerta nunca ser "inventado".
 */
const DIA = 24 * 60 * 60 * 1000;
export const DIAS_SEM_ATIVIDADE = 3;
export const QUEDA_MINIMA = 0.3; // 30%

// Dias de CALENDÁRIO: algo de ontem às 23h já é "ontem", mesmo que hoje sejam 8h.
const inicioDoDia = (d) => new Date(d).setHours(0, 0, 0, 0);
export const diasEntre = (data, agora) => Math.round((inicioDoDia(agora) - inicioDoDia(data)) / DIA);
const ultimaSessao = (sessoes) => sessoes.reduce((a, b) => (a.data > b.data ? a : b));

export function gerarAlertas(sessoes, agora = new Date()) {
  const alertas = [];
  if (sessoes.length === 0) return alertas;

  // Regra 1: muitos dias sem nenhuma atividade
  const dias = diasEntre(ultimaSessao(sessoes).data, agora);
  if (dias >= DIAS_SEM_ATIVIDADE) {
    alertas.push({
      id: "sem-atividade",
      titulo: `${dias} dias sem exercícios`,
      detalhe: "Que tal ligar e perguntar como vão as coisas?",
    });
  }

  // Regra 2: queda de repetições em relação à média anterior, por exercício
  const porExercicio = Object.groupBy
    ? Object.groupBy(sessoes, (s) => s.exercicio)
    : sessoes.reduce((acc, s) => ((acc[s.exercicio] ??= []).push(s), acc), {});

  for (const [exercicio, lista] of Object.entries(porExercicio)) {
    if (lista.length < 2) continue;
    const ordenadas = [...lista].sort((a, b) => a.data.localeCompare(b.data));
    const atual = ordenadas.at(-1).repeticoes;
    const anteriores = ordenadas.slice(0, -1);
    const media = anteriores.reduce((t, s) => t + s.repeticoes, 0) / anteriores.length;
    if (media > 0 && atual <= media * (1 - QUEDA_MINIMA)) {
      alertas.push({
        id: `queda-${exercicio}`,
        titulo: `Menos repetições em "${exercicio}"`,
        detalhe: `Fez ${atual}, a média era ${media.toFixed(0)}. Vale observar nos próximos dias.`,
      });
    }
  }
  return alertas;
}

const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

/** Os últimos 7 dias (o último é hoje): se teve exercício e quantas repetições. */
export function semana(sessoes, agora = new Date()) {
  return Array.from({ length: 7 }, (_, i) => {
    const dia = new Date(agora);
    dia.setDate(agora.getDate() - (6 - i));
    const doDia = sessoes.filter((s) => diasEntre(s.data, dia) === 0);
    return {
      rotulo: i === 6 ? "hoje" : DIAS_SEMANA[dia.getDay()],
      ativo: doDia.length > 0,
      repeticoes: doDia.reduce((t, s) => t + s.repeticoes, 0),
    };
  });
}

/**
 * A frase do topo do painel: responde "ela está bem?" só com o que a Lumi registrou.
 * tom: "bem" | "atencao" | "neutro". Nunca é diagnóstico, é registro de movimento.
 */
export function situacao(sessoes, nome, agora = new Date()) {
  if (sessoes.length === 0)
    return { tom: "neutro", titulo: `Ainda não há registros de ${nome}`, detalhe: "O primeiro exercício feito com a Lumi aparece aqui na hora." };

  const ultima = ultimaSessao(sessoes);
  const dias = diasEntre(ultima.data, agora);
  if (dias === 0)
    return { tom: "bem", titulo: `${nome} se exercitou hoje`, detalhe: `Última atividade: ${ultima.exercicio.toLowerCase()}, ${ultima.repeticoes} vezes.` };
  if (dias === 1)
    return { tom: "bem", titulo: `${nome} se exercitou ontem`, detalhe: "Hoje ainda não teve atividade." };
  if (dias >= DIAS_SEM_ATIVIDADE)
    return { tom: "atencao", titulo: `${dias} dias sem exercício`, detalhe: "Que tal ligar e perguntar como vão as coisas?" };
  return { tom: "neutro", titulo: `Última atividade há ${dias} dias`, detalhe: "Dentro do normal até aqui." };
}

export function resumoSemana(sessoes, agora = new Date()) {
  const daSemana = sessoes.filter((s) => agora - new Date(s.data) <= 7 * DIA);
  const dias = new Set(daSemana.map((s) => new Date(s.data).toDateString()));
  return {
    sessoes: daSemana.length,
    diasAtivos: dias.size,
    repeticoes: daSemana.reduce((t, s) => t + s.repeticoes, 0),
  };
}
