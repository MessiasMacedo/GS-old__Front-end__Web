import { chamarFuncao } from "@/lib/supabase";

/**
 * CONTRATO — conversa livre com a IA (camada 2 do cérebro da Lumi)
 * responder({ texto, historico }) -> { texto }
 *   texto:     a fala da pessoa, já SEM dados pessoais (limparDadosPessoais)
 *   historico: últimas trocas, [{ papel: "pessoa" | "lumi", texto }]
 * Em erro ou demora (> 6 s), lança Error. Quem chama usa a resposta local:
 * a Lumi nunca fica muda.
 * Servidor: Edge Function `conversar` (supabase/functions/conversar), que guarda a chave do Gemini.
 */
export async function responder({ texto, historico = [] }) {
  const resposta = await chamarFuncao("conversar", { texto, historico }, 6000);
  if (!resposta?.texto) throw new Error("A IA não mandou resposta.");
  return { texto: resposta.texto };
}
