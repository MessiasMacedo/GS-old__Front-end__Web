// Checagem das regras do painel da família: `npm run check`.
import assert from "node:assert/strict";
import { gerarAlertas, semana, situacao } from "./alertas.js";

const agora = new Date(2026, 10, 12, 9, 0); // quinta, 12/11, 9h
const em = (diasAtras, hora, exercicio = "Elevação dos braços", repeticoes = 10) => {
  const d = new Date(agora);
  d.setDate(d.getDate() - diasAtras);
  d.setHours(hora);
  return { exercicio, repeticoes, data: d.toISOString() };
};

// A semana termina hoje e marca os dias certos
const s = semana([em(0, 8), em(2, 10), em(2, 16, "Sentar", 5)], agora);
assert.deepEqual(s.map((d) => d.rotulo), ["sex", "sáb", "dom", "seg", "ter", "qua", "hoje"]);
assert.deepEqual(s.map((d) => d.ativo), [false, false, false, false, true, false, true]);
assert.equal(s[4].repeticoes, 15);

// A frase do topo
assert.equal(situacao([], "Dona Maria", agora).tom, "neutro");
assert.equal(situacao([em(0, 8)], "Dona Maria", agora).titulo, "Dona Maria se exercitou hoje");
assert.equal(situacao([em(1, 23)], "Dona Maria", agora).titulo, "Dona Maria se exercitou ontem"); // ontem 23h, hoje 9h
assert.equal(situacao([em(3, 10)], "Dona Maria", agora).tom, "atencao");

// Frase do topo e alerta usam a MESMA conta de dias (antes podiam discordar por 1)
assert.equal(gerarAlertas([em(3, 10)], agora)[0].titulo, "3 dias sem exercícios");
assert.equal(gerarAlertas([em(2, 10)], agora).length, 0);

console.log("alertas: semana, frase do topo e alertas ok");
