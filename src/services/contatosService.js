import { esperar, novoId } from "./_fake";

/**
 * CONTRATO — contatos da família (CRUD)
 * Formato: { id, nome, parentesco, telefone }
 * Todas as funções são assíncronas. Em erro, lançam Error com mensagem legível.
 *
 * >>> Parte da API/Supabase: substituir SOMENTE o corpo das funções. <<<
 */
let contatos = [
  { id: "c1", nome: "Ana", parentesco: "Filha", telefone: "(11) 98765-4321" },
  { id: "c2", nome: "Pedro", parentesco: "Neto", telefone: "(11) 91234-5678" },
];

export async function listar() {
  await esperar();
  return [...contatos];
}

export async function criar({ nome, parentesco, telefone }) {
  await esperar();
  const novo = { id: novoId(), nome, parentesco, telefone };
  contatos = [...contatos, novo];
  return novo;
}

export async function atualizar(id, dados) {
  await esperar();
  const existe = contatos.some((c) => c.id === id);
  if (!existe) throw new Error("Contato não encontrado.");
  contatos = contatos.map((c) => (c.id === id ? { ...c, ...dados, id } : c));
  return contatos.find((c) => c.id === id);
}

export async function excluir(id) {
  await esperar();
  contatos = contatos.filter((c) => c.id !== id);
}
