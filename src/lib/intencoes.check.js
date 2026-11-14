// Checagem rápida das intenções: `npm run check`. Falha alto se alguma regra quebrar.
import assert from "node:assert/strict";
import { acharContato, detectarIntencao, juntarNomes, limparDadosPessoais } from "./intencoes.js";

const casos = {
  "Eu caí no banheiro": "seguranca",
  "CAI": "seguranca",
  "estou com dor no peito": "seguranca",
  "socorro": "seguranca",
  "sim": "sim",
  "Claro, vamos": "sim",
  "não": "nao",
  "agora não, Lumi": "nao",
  "quero fazer exercício": "exercicio",
  "não quero exercício agora": "nao",
  "minha vizinha caiu": "seguranca",
  "vamos alongar": "exercicio",
  "quero ligar para minha filha": "familia",
  "liga pro Pedro": "familia",
  "ligue para a Ana": "familia",
  "a ligação caiu": "seguranca", // "caiu" ganha: na dúvida, a Lumi pergunta se está tudo bem
  "que horas são?": "horas",
  "tudo bem com você?": "comoVai",
  "Olá, Lumi": "cumprimento",
  "câmera computacional desmaio": "demonstracao",
  "modo demonstração": "demonstracao",
  "tchau": "tchau",
  "o jogo do Corinthians foi bom": "conversa",
  "a caixa está cheia": "conversa", // "cai" dentro de outra palavra não é queda
};

for (const [frase, esperado] of Object.entries(casos)) {
  assert.equal(detectarIntencao(frase), esperado, `"${frase}"`);
}
// Achar o contato da família citado na fala
const contatos = [
  { nome: "Ana", parentesco: "Filha" },
  { nome: "Pedro Henrique", parentesco: "Neto" },
];
assert.equal(acharContato("liga pra Ana", contatos)?.nome, "Ana");
assert.equal(acharContato("quero falar com o pedro", contatos)?.nome, "Pedro Henrique");
assert.equal(acharContato("minha filha", contatos)?.nome, "Ana");
assert.equal(acharContato("o meu NETO", contatos)?.nome, "Pedro Henrique");
assert.equal(acharContato("comprei banana", contatos), null, "'ana' dentro de banana não conta");
assert.equal(juntarNomes(contatos), "Ana ou Pedro Henrique");
assert.equal(juntarNomes([...contatos, { nome: "João" }]), "Ana, Pedro Henrique ou João");

// O que vai para a IA não leva telefone, CPF nem e-mail
assert.equal(limparDadosPessoais("meu telefone é (11) 98765-4321"), "meu telefone é [número]");
assert.equal(limparDadosPessoais("CPF 123.456.789-00, e-mail maria@gmail.com"), "CPF [número], e-mail [e-mail]");
assert.equal(limparDadosPessoais("tenho 82 anos e 3 netos"), "tenho 82 anos e 3 netos", "números curtos ficam");

console.log(`intencoes: ${Object.keys(casos).length} casos e contatos ok`);
