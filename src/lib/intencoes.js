/**
 * Camada 1 do cérebro da Lumi: descobrir O QUE a pessoa quis dizer.
 * Roda no tablet, sem internet e sem custo.
 *
 * A tabela é lida de cima para baixo e a primeira que bater vence,
 * por isso a ordem é a prioridade: segurança vem antes de tudo.
 * Para ensinar uma frase nova à Lumi, basta acrescentar uma palavra aqui.
 */
const INTENCOES = [
  // Comando da apresentação. Vem antes da segurança porque a frase combinada tem
  // "desmaio"; ninguém diz "câmera computacional" numa emergência de verdade.
  ["demonstracao", /\b(modo demonstracao|camera computacional)\b/],
  // Nunca vai para a IA: resposta fixa, testada, que indica ajuda humana.
  ["seguranca", /\b(cai|caiu|caido|caida|cair|tombo|socorro|emergencia)\b|dor no peito|falta de ar|nao consigo (respirar|levantar)|desmai/],
  // "Não" antes dos assuntos: "não quero exercício" é recusa, não pedido.
  ["nao", /^(nao|agora nao|depois|mais tarde)\b/],
  ["exercicio", /\b(exercic|alonga|mexer|ginastica|movimentar|treino)/],
  ["familia", /\b(familia|filh|net[oa]|ligar|saudade)/],
  // "Sim" depois dos assuntos: "quero fazer exercício" é pedido, não só um sim.
  ["sim", /^(sim|claro|quero|pode|vamos|bora|ok|uhum|aham|isso|com certeza)\b/],
  ["horas", /\b(que horas|hora[s]? (e|sao))\b/],
  ["comoVai", /\b(tudo bem|como (voce )?(esta|vai))\b/],
  ["cumprimento", /\b(oi|ola|bom dia|boa tarde|e ai)\b/],
  ["tchau", /\b(tchau|ate logo|ate mais|boa noite)\b/],
];

// "Caí", "cai" e "CAÍ" viram a mesma coisa: o reconhecimento de voz
// nem sempre acerta acento, então a comparação ignora acentos e maiúsculas.
export const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();

/** Retorna o tipo da intenção, ou "conversa" quando nenhuma regra bate. */
export function detectarIntencao(texto) {
  const t = normalizar(texto);
  return INTENCOES.find(([, regra]) => regra.test(t))?.[0] ?? "conversa";
}
