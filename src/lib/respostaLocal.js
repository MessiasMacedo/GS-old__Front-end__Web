/**
 * Respostas provisórias da Lumi (etapa 1).
 * Na etapa 2 esta função é trocada pela chamada à IA via API route,
 * sem mexer em nenhum componente.
 */
export function respostaLocal(texto) {
  const t = texto.toLowerCase();

  if (/(exerc|alongar|mexer|ginástica)/.test(t))
    return "Que ótimo que você quer se movimentar! Os exercícios chegam na próxima versão.";
  if (/(família|filh|net|ligar)/.test(t))
    return "Adoro quando você fala da sua família. Logo vou poder te ajudar a falar com eles.";
  if (/(tudo bem|como (você )?está|como vai)/.test(t))
    return "Estou bem, obrigada por perguntar! E o seu dia, como está sendo?";
  if (/(tchau|até logo|boa noite)/.test(t))
    return "Até logo! Quando quiser conversar, é só tocar em mim.";

  return `Entendi: "${texto}". Em breve vou conseguir conversar sobre qualquer assunto com você.`;
}
