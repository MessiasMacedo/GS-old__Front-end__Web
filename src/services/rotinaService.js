import { consultar, tabela } from "@/lib/supabase";

/**
 * CONTRATO — rotina de exercícios definida pela família (CRUD)
 * Formato: { id, nome, repeticoes, ativo }
 * Banco: tabela `rotina` (supabase/schema.sql).
 */
const CAMPOS = "id, nome, repeticoes, ativo";

export async function listar() {
  return consultar(tabela("rotina").select(CAMPOS).order("criado_em"), "Não foi possível carregar a rotina.");
}

export async function criar({ nome, repeticoes, ativo = true }) {
  return consultar(
    tabela("rotina").insert({ nome, repeticoes: Number(repeticoes), ativo }).select(CAMPOS).single(),
    "Não foi possível salvar o exercício. As repetições vão de 1 a 100."
  );
}

// Pode receber só parte dos campos (ex.: { ativo }). Campo ausente não é alterado.
export async function atualizar(id, { nome, repeticoes, ativo }) {
  const dados = { nome, ativo, repeticoes: repeticoes === undefined ? undefined : Number(repeticoes) };
  return consultar(
    tabela("rotina").update(dados).eq("id", id).select(CAMPOS).single(),
    "Não foi possível atualizar o exercício."
  );
}

export async function excluir(id) {
  await consultar(tabela("rotina").delete().eq("id", id), "Não foi possível excluir o exercício.");
}
