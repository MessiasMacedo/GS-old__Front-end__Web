/**
 * Validação dos formulários do painel da família. Funções puras: devolvem
 * { erros, dados } — `erros` com uma mensagem por campo (vazio = tudo certo) e
 * `dados` já arrumados para salvar (sem espaços sobrando, telefone formatado).
 * O banco também confere (supabase/schema.sql); aqui é para a família entender o erro.
 */
const soDigitos = (texto = "") => String(texto).replace(/\D/g, "");

/** "11987654321" -> "(11) 98765-4321"; fixo com 10 números -> "(11) 3456-7890". */
export function formatarTelefone(texto) {
  const d = soDigitos(texto);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return String(texto).trim();
}

/** `outros`: os contatos que já existem (sem o que está sendo editado), para não repetir telefone. */
export function validarContato({ nome = "", parentesco = "", telefone = "" }, outros = []) {
  const erros = {};
  const n = nome.trim().replace(/\s+/g, " ");
  const p = parentesco.trim();
  const d = soDigitos(telefone);

  if (n.length < 2) erros.nome = "Escreva o nome, com pelo menos 2 letras.";
  else if (n.length > 60) erros.nome = "O nome pode ter até 60 letras.";
  else if (/\d/.test(n)) erros.nome = "O nome não pode ter números.";

  if (!p) erros.parentesco = "Diga o parentesco: filha, neto, vizinha…";
  else if (p.length > 30) erros.parentesco = "Use uma palavra curta, até 30 letras.";

  if (d.length < 10 || d.length > 11) erros.telefone = "Coloque o DDD e o número: 10 ou 11 dígitos, como (11) 98765-4321.";
  else if (d.length === 11 && d[2] !== "9") erros.telefone = "Celular com 11 dígitos começa com 9 depois do DDD.";
  else if (outros.some((c) => soDigitos(c.telefone) === d)) erros.telefone = "Esse telefone já está na lista.";

  return { erros, dados: { nome: n, parentesco: p, telefone: formatarTelefone(telefone) } };
}

export const REPETICOES_MAX = 50;

/** `outros`: os exercícios da rotina (sem o que está sendo editado), para não repetir nome. */
export function validarExercicio({ nome = "", repeticoes, ativo = true }, outros = []) {
  const erros = {};
  const n = nome.trim().replace(/\s+/g, " ");
  const r = Number(repeticoes);

  if (n.length < 3) erros.nome = "Escreva o nome do exercício, com pelo menos 3 letras.";
  else if (n.length > 60) erros.nome = "O nome pode ter até 60 letras.";
  else if (outros.some((e) => e.nome.trim().toLowerCase() === n.toLowerCase())) erros.nome = "Esse exercício já está na rotina.";

  if (String(repeticoes ?? "").trim() === "" || !Number.isInteger(r)) erros.repeticoes = "Coloque um número inteiro de repetições.";
  else if (r < 1 || r > REPETICOES_MAX) erros.repeticoes = `Entre 1 e ${REPETICOES_MAX} repetições: exercícios leves, sem exagero.`;

  return { erros, dados: { nome: n, repeticoes: r, ativo } };
}
