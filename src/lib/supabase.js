import { createClient } from "@supabase/supabase-js";

// Chave PÚBLICA (publishable/anon): pode ir para o navegador. Quem protege os dados
// são as regras de RLS em supabase/schema.sql. Os valores vêm do .env.local (fora do git).
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_KEY;
const supabase = url && chave ? createClient(url, chave) : null;

/** Uma tabela do banco. Avisa com clareza se o .env.local não foi preenchido. */
export function tabela(nome) {
  if (!supabase) throw new Error("O banco ainda não foi configurado. Confira o arquivo .env.local.");
  return supabase.from(nome);
}

/**
 * Executa a consulta e devolve os dados. Em erro, guarda o detalhe técnico no console
 * (para quem programa) e lança a mensagem simples que o contrato promete à família.
 */
export async function consultar(consulta, mensagem) {
  const { data, error } = await consulta;
  if (error) {
    console.error(error);
    throw new Error(mensagem);
  }
  return data;
}
