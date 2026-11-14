// Edge Function `conversar`: a camada 2 do cérebro da Lumi.
// Roda no servidor do Supabase. Recebe a fala (já sem dados pessoais), pergunta ao
// Gemini e devolve uma resposta curta para ser falada. A chave do Gemini fica SÓ aqui,
// num "secret" do Supabase: nunca vai para o navegador.
//
// Publicar pelo painel: Edge Functions > Deploy a new function > Via Editor > nome "conversar".
// Desligar "Verify JWT" desta função (a chave publishable não é um JWT; a conferência é feita abaixo).
// Secret: GEMINI_API_KEY (Edge Functions > Secrets).

const MODELO = "gemini-3.5-flash-lite"; // estável e no plano gratuito (nov/2026)
const URL_GEMINI = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;
const LIMITE_TEXTO = 500;
const LIMITE_HISTORICO = 6;

const PERSONA = `Você é a Lumi, assistente de companhia para pessoas idosas no Brasil. Você fala por voz, num tablet.
Regras:
- Responda em português do Brasil, com no máximo 2 frases curtas e simples: a resposta será falada em voz alta. Sem emojis, listas, markdown ou links.
- Trate a pessoa como adulta, com respeito e carinho, nunca de forma infantil. Use "você".
- Mostre interesse e, às vezes, faça uma pergunta curta sobre o dia, as lembranças ou os gostos da pessoa.
- Você não é médica: não dê diagnóstico, não indique remédios ou doses, não interprete sintomas. Em assunto de saúde, sugira conversar com a família ou um profissional de saúde.
- Se a pessoa falar de emergência, queda, dor forte ou falta de ar, diga para ligar para o SAMU, no 192, e avisar a família.
- Não peça dados pessoais (endereço, documentos, senhas, banco). Se a pessoa oferecer, diga com gentileza que não precisa.
- Se não souber, ou se for notícia recente, diga que não tem certeza. Nunca invente.
- Você não substitui as pessoas: quando fizer sentido, incentive falar com a família e os amigos.
- Você não é humana e não finge ser.
- O aparelho também faz exercícios leves e liga para a família: se combinar com a conversa, pode sugerir.`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (corpo, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// Só aceita chamadas com a chave pública DESTE projeto. Não é login (a chave é pública),
// mas impede que outros sites gastem a cota da IA com a nossa função.
function chaveDoProjeto(req) {
  const chaves = Object.values(JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}"));
  return chaves.length === 0 || chaves.includes(req.headers.get("apikey"));
}

// Entrada vem do navegador: confere tipo e tamanho de tudo antes de gastar a IA.
function validar(corpo) {
  const texto = typeof corpo?.texto === "string" ? corpo.texto.trim() : "";
  if (!texto || texto.length > LIMITE_TEXTO) return null;
  const historico = Array.isArray(corpo.historico) ? corpo.historico.slice(-LIMITE_HISTORICO) : [];
  const valido = historico.every(
    (h) => (h?.papel === "pessoa" || h?.papel === "lumi") && typeof h.texto === "string" && h.texto.length <= LIMITE_TEXTO
  );
  return valido ? { texto, historico } : null;
}

// A resposta vai ser FALADA: tira marcação, junta espaços e corta textos longos na última frase.
export function prepararParaFala(texto) {
  const limpo = texto.replace(/[*_#`>]/g, "").replace(/\s+/g, " ").trim();
  if (limpo.length <= 300) return limpo;
  const corte = limpo.slice(0, 300);
  const fimDeFrase = Math.max(corte.lastIndexOf(". "), corte.lastIndexOf("? "), corte.lastIndexOf("! "));
  return fimDeFrase > 0 ? corte.slice(0, fimDeFrase + 1) : `${corte.trim()}…`;
}

export default {
  async fetch(req) {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
    if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
    if (!chaveDoProjeto(req)) return json({ erro: "Chave não reconhecida." }, 401);

    const entrada = validar(await req.json().catch(() => null));
    if (!entrada) return json({ erro: "Mande { texto, historico } com textos de até 500 caracteres." }, 400);

    const chave = Deno.env.get("GEMINI_API_KEY");
    if (!chave) return json({ erro: "GEMINI_API_KEY não configurada." }, 500);

    const contents = [
      ...entrada.historico.map((h) => ({ role: h.papel === "lumi" ? "model" : "user", parts: [{ text: h.texto }] })),
      { role: "user", parts: [{ text: entrada.texto }] },
    ];

    try {
      const resposta = await fetch(URL_GEMINI, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: PERSONA }] },
          contents,
          // "minimal": quase sem raciocínio interno = resposta mais rápida. O raciocínio
          // também gasta tokens de saída, por isso o limite não é apertado.
          generationConfig: { maxOutputTokens: 512, thinkingConfig: { thinkingLevel: "minimal" } },
        }),
        signal: AbortSignal.timeout(5000), // o navegador desiste em 6 s; aqui, antes
      });
      if (!resposta.ok) {
        console.error("Gemini respondeu", resposta.status, await resposta.text());
        return json({ erro: "A IA não respondeu agora." }, 502);
      }

      const dados = await resposta.json();
      const texto = (dados.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
      if (!texto.trim()) {
        // Bloqueado por segurança (promptFeedback / finishReason SAFETY) ou vazio
        const motivo = dados.promptFeedback?.blockReason ?? dados.candidates?.[0]?.finishReason ?? "vazio";
        console.warn("Resposta sem texto:", motivo);
        return json({ texto: "Prefiro não falar sobre isso. Quer conversar sobre outra coisa?" });
      }
      return json({ texto: prepararParaFala(texto) });
    } catch (e) {
      console.error("Falha ao chamar o Gemini:", e);
      return json({ erro: "A IA demorou ou falhou." }, 504);
    }
  },
};
