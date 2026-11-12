import { detectarIntencao } from "./intencoes";

export const RESPOSTA_SEGURANCA =
  "Você está bem? Se for urgente, ligue agora para o SAMU, no 192. Quer que eu avise a sua família?";

/**
 * Um comentário leve sobre a hora, para a Lumi não soar como um relógio falante.
 * Recebe a hora (0 a 23) e devolve uma frase curta, ou "" para não comentar.
 * Ex.: 12 -> "Hora do almoço, né? O que tem de bom hoje?"
 */
export function comentarioHora(hora) {
  // [até esta hora (exclusivo), frase]. Lida de cima para baixo, como as intenções.
  const FAIXAS = [
    [5, "Ainda de pé a essa hora? Se o sono não vem, posso conversar um pouco com você."],
    [8, "Bem cedinho! Já tomou o seu café?"],
    [11, "Manhã é uma boa hora para um alongamento leve, né?"],
    [14, "Hora do almoço, né? O que tem de bom hoje?"],
    [17, "Horário do cafezinho da tarde. Acompanhado de um pão de queijo, melhor ainda."],
    [19, "O dia está acabando. Que tal ligar para alguém da família?"],
    [22, "Hora de jantar e descansar do dia."],
    [24, "Já está tarde! Uma boa noite de sono faz muito bem."],
  ];
  return FAIXAS.find(([ate]) => hora < ate)?.[1] ?? "";
}

/**
 * Resposta da camada 1 quando não há contexto (pergunta pendente, modo exercício):
 * isso é com o useLumi. "conversa" (nada reconhecido) é onde a IA vai entrar.
 */
export function respostaLocal(texto) {
  switch (detectarIntencao(texto)) {
    case "seguranca":
      return RESPOSTA_SEGURANCA;
    case "cumprimento":
      return "Olá! Que bom ouvir a sua voz. Quer conversar um pouco ou fazer um exercício?";
    case "comoVai":
      return "Estou bem, obrigada por perguntar! E o seu dia, como está sendo?";
    case "exercicio":
      return "Que ótimo que você quer se movimentar! Vamos fazer um exercício leve juntos?";
    case "familia":
      return "Adoro quando você fala da sua família. Quer que eu ajude você a falar com eles?";
    case "horas": {
      const agora = new Date();
      const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return `Agora são ${hora}. ${comentarioHora(agora.getHours())}`.trim();
    }
    case "tchau":
      return "Até logo! Quando quiser conversar, é só tocar em mim.";
    default:
      return "Ainda estou aprendendo a conversar sobre isso. Quer fazer um exercício ou falar com a sua família?";
  }
}
