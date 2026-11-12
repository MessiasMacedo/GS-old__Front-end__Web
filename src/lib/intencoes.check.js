// Checagem rápida das intenções: `npm run check`. Falha alto se alguma regra quebrar.
import assert from "node:assert/strict";
import { detectarIntencao } from "./intencoes.js";

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
console.log(`intencoes: ${Object.keys(casos).length} casos ok`);
