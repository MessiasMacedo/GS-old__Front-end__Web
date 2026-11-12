/**
 * Visão computacional, parte "pensante": recebe os 33 pontos do corpo que o
 * MediaPipe Pose devolve e decide (1) em que fase do exercício a pessoa está e
 * (2) se o corpo está bem, caiu ou ficou parado no chão.
 * Funções puras: não sabem nada de câmera, dá para testar com números (`npm run check`).
 *
 * Coordenadas: x e y vão de 0 a 1 na imagem, e y cresce PARA BAIXO.
 */
const P = { ombroE: 11, ombroD: 12, punhoE: 15, punhoD: 16, quadrilE: 23, quadrilD: 24, joelhoE: 25, joelhoD: 26, tornozeloE: 27, tornozeloD: 28 };

// Botões de calibragem: câmera e distância reais mudam esses valores. Ajuste testando.
export const AJUSTES = {
  QUEDA_DESCIDA: 0.2, // quanto o quadril precisa descer (fração da altura da imagem)...
  QUEDA_JANELA_MS: 1500, // ...em quanto tempo, para contar como queda e não como deitar
  PARADO_MS: 8000, // tempo no chão sem se mexer até a Lumi chamar ajuda
  PARADO_TOLERANCIA: 0.04, // respiração e ruído da câmera não contam como movimento
  BRACO_BAIXO: 0.15, // punho tem que descer isso abaixo do ombro para contar "embaixo"
};

const medio = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

// Ângulo no ponto b (em graus), formado por a-b-c. Ex.: quadril-joelho-tornozelo.
function angulo(a, b, c) {
  const graus = Math.abs(Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)) * (180 / Math.PI);
  return graus > 180 ? 360 - graus : graus;
}

/** Qual movimento a Lumi sabe acompanhar para este exercício da rotina. */
export function tipoDeMovimento(nome = "") {
  const n = nome.toLowerCase();
  if (n.includes("braço") || n.includes("braco")) return "bracos";
  if (n.includes("sentar")) return "sentar";
  return null; // ponytail: marcha e outros ainda sem contagem; entram com DTW contra um movimento de referência
}

/**
 * "cima", "baixo" ou null (no meio do caminho). O vão entre os dois limites
 * evita contar duas vezes quando o braço treme bem na linha do ombro.
 */
export function faseDoExercicio(nome, p) {
  const tipo = tipoDeMovimento(nome);
  if (tipo === "bracos") {
    const punhos = [p[P.punhoE].y, p[P.punhoD].y];
    const ombros = [p[P.ombroE].y, p[P.ombroD].y];
    if (Math.max(...punhos) < Math.min(...ombros)) return "cima";
    if (Math.min(...punhos) > Math.max(...ombros) + AJUSTES.BRACO_BAIXO) return "baixo";
  }
  if (tipo === "sentar") {
    const joelho =
      (angulo(p[P.quadrilE], p[P.joelhoE], p[P.tornozeloE]) + angulo(p[P.quadrilD], p[P.joelhoD], p[P.tornozeloD])) / 2;
    if (joelho > 160) return "cima"; // perna esticada: em pé
    if (joelho < 115) return "baixo"; // joelho dobrado: sentado
  }
  return null;
}

/** Máquina de 2 estados: cada volta de "cima" para "baixo" é uma repetição completa. */
export function contarRepeticao({ fase, total }, novaFase) {
  if (!novaFase || novaFase === fase) return { fase, total };
  return { fase: novaFase, total: total + (fase === "cima" && novaFase === "baixo" ? 1 : 0) };
}

/** Resumo de um quadro para o detector de queda: altura do quadril e se o tronco está deitado. */
export function amostraDoCorpo(p, t) {
  const ombros = medio(p[P.ombroE], p[P.ombroD]);
  const quadril = medio(p[P.quadrilE], p[P.quadrilD]);
  return { t, y: quadril.y, deitado: Math.abs(ombros.y - quadril.y) < Math.abs(ombros.x - quadril.x) };
}

/**
 * "ok" -> "caiu" -> "parado". Não é diagnóstico: a câmera só sabe que o corpo
 * desceu rápido e ficou deitado, não o motivo. Por isso a Lumi PERGUNTA.
 * `amostras` em ordem de tempo, cobrindo pelo menos PARADO_MS.
 */
export function estadoDoCorpo(anterior, amostras) {
  const atual = amostras.at(-1);
  if (!atual.deitado) return "ok"; // levantou (ou nunca caiu)

  if (anterior === "ok") {
    const recentes = amostras.filter((a) => a.t >= atual.t - AJUSTES.QUEDA_JANELA_MS);
    const desceu = atual.y - Math.min(...recentes.map((a) => a.y));
    return desceu > AJUSTES.QUEDA_DESCIDA ? "caiu" : "ok"; // deitar devagar não é queda
  }

  if (anterior === "caiu") {
    const janela = amostras.filter((a) => a.t >= atual.t - AJUSTES.PARADO_MS);
    const temTempo = janela[0].t <= atual.t - AJUSTES.PARADO_MS + 500;
    const ys = janela.map((a) => a.y);
    if (temTempo && Math.max(...ys) - Math.min(...ys) < AJUSTES.PARADO_TOLERANCIA) return "parado";
  }
  return anterior;
}
