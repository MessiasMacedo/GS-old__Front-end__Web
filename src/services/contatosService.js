import { consultar, tabela } from "@/lib/supabase";

/**
 * CONTRATO — contatos da família (CRUD)
 * Formato: { id, nome, parentesco, telefone }
 * Todas as funções são assíncronas. Em erro, lançam Error com mensagem legível.
 * Banco: tabela `contatos` (supabase/schema.sql).
 */
const CAMPOS = "id, nome, parentesco, telefone";

export async function listar() {
  return consultar(tabela("contatos").select(CAMPOS).order("criado_em"), "Não foi possível carregar os contatos.");
}

export async function criar({ nome, parentesco, telefone }) {
  return consultar(
    tabela("contatos").insert({ nome, parentesco, telefone }).select(CAMPOS).single(),
    "Não foi possível salvar o contato. Confira o nome."
  );
}

export async function atualizar(id, { nome, parentesco, telefone }) {
  return consultar(
    tabela("contatos").update({ nome, parentesco, telefone }).eq("id", id).select(CAMPOS).single(),
    "Não foi possível atualizar o contato."
  );
}

export async function excluir(id) {
  await consultar(tabela("contatos").delete().eq("id", id), "Não foi possível remover o contato.");
}
