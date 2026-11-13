import { consultar, tabela } from "@/lib/supabase";

/**
 * CONTRATO — sessões de exercício registradas pela Lumi
 * Formato: { id, exercicio, repeticoes, data }   (data em ISO 8601)
 * A Lumi CRIA sessões; o dashboard LISTA. O banco não deixa alterar nem apagar.
 * Banco: tabela `sessoes` (supabase/schema.sql).
 */
const CAMPOS = "id, exercicio, repeticoes, data";

export async function listar() {
  return consultar(
    tabela("sessoes").select(CAMPOS).order("data", { ascending: false }),
    "Não foi possível carregar o histórico de exercícios."
  );
}

export async function criar({ exercicio, repeticoes }) {
  return consultar(
    tabela("sessoes").insert({ exercicio, repeticoes }).select(CAMPOS).single(),
    "Não foi possível guardar o exercício."
  );
}
