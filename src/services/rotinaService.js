import { esperar, novoId } from "./_fake";

/**
 * CONTRATO — rotina de exercícios definida pela família (CRUD)
 * Formato: { id, nome, repeticoes, ativo }
 *
 * >>> Parte da API/Supabase: substituir SOMENTE o corpo das funções. <<<
 */
let rotina = [
  { id: "r1", nome: "Elevação dos braços", repeticoes: 10, ativo: true },
  { id: "r2", nome: "Sentar e levantar da cadeira", repeticoes: 8, ativo: true },
  { id: "r3", nome: "Marcha parada, sentado", repeticoes: 20, ativo: false },
];

export async function listar() {
  await esperar();
  return [...rotina];
}

export async function criar({ nome, repeticoes, ativo = true }) {
  await esperar();
  const novo = { id: novoId(), nome, repeticoes: Number(repeticoes), ativo };
  rotina = [...rotina, novo];
  return novo;
}

export async function atualizar(id, dados) {
  await esperar();
  if (!rotina.some((r) => r.id === id)) throw new Error("Exercício não encontrado.");
  rotina = rotina.map((r) =>
    r.id === id ? { ...r, ...dados, id, repeticoes: Number(dados.repeticoes ?? r.repeticoes) } : r
  );
  return rotina.find((r) => r.id === id);
}

export async function excluir(id) {
  await esperar();
  rotina = rotina.filter((r) => r.id !== id);
}
