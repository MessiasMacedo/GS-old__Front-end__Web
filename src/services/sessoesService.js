import { esperar, novoId } from "./_fake";

/**
 * CONTRATO — sessões de exercício registradas pela Lumi
 * Formato: { id, exercicio, repeticoes, data }   (data em ISO 8601)
 * A Lumi CRIA sessões; o dashboard LISTA.
 *
 * >>> Parte da API/Supabase: substituir SOMENTE o corpo das funções. <<<
 */
const diasAtras = (n, h = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, 15, 0, 0);
  return d.toISOString();
};

let sessoes = [
  { id: "s1", exercicio: "Elevação dos braços", repeticoes: 10, data: diasAtras(6) },
  { id: "s2", exercicio: "Sentar e levantar da cadeira", repeticoes: 9, data: diasAtras(5) },
  { id: "s3", exercicio: "Elevação dos braços", repeticoes: 10, data: diasAtras(4, 16) },
  { id: "s4", exercicio: "Sentar e levantar da cadeira", repeticoes: 6, data: diasAtras(4) },
];

export async function listar() {
  await esperar();
  return [...sessoes].sort((a, b) => b.data.localeCompare(a.data));
}

export async function criar({ exercicio, repeticoes }) {
  await esperar();
  const nova = { id: novoId(), exercicio, repeticoes, data: new Date().toISOString() };
  sessoes = [...sessoes, nova];
  return nova;
}
