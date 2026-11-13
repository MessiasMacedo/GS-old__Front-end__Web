// Checagem do contador e do detector de queda com corpos "de mentira": `npm run check`.
import assert from "node:assert/strict";
import { amostraDoCorpo, contarRepeticao, estadoDoCorpo, faseDoExercicio } from "./movimento.js";

// Corpo de 33 pontos; só os que importam recebem posição.
function corpo({ punhoY = 0.7, joelho = "reto" } = {}) {
  const p = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5 }));
  p[11] = { x: 0.4, y: 0.3 }; p[12] = { x: 0.6, y: 0.3 }; // ombros
  p[15] = { x: 0.35, y: punhoY }; p[16] = { x: 0.65, y: punhoY }; // punhos
  p[23] = { x: 0.45, y: 0.55 }; p[24] = { x: 0.55, y: 0.55 }; // quadril
  const dobra = joelho === "reto" ? 0 : 0.15;
  p[25] = { x: 0.45 + dobra, y: 0.72 }; p[26] = { x: 0.55 + dobra, y: 0.72 }; // joelhos
  p[27] = { x: 0.45, y: 0.9 }; p[28] = { x: 0.55, y: 0.9 }; // tornozelos
  return p;
}

// Braços: embaixo, meio do caminho (ignorado), em cima, embaixo = 1 repetição
assert.equal(faseDoExercicio("Elevação dos braços", corpo({ punhoY: 0.7 })), "baixo");
assert.equal(faseDoExercicio("Elevação dos braços", corpo({ punhoY: 0.35 })), null);
assert.equal(faseDoExercicio("Elevação dos braços", corpo({ punhoY: 0.1 })), "cima");
assert.equal(faseDoExercicio("Sentar e levantar da cadeira", corpo({ joelho: "reto" })), "cima");
assert.equal(faseDoExercicio("Sentar e levantar da cadeira", corpo({ joelho: "dobrado" })), "baixo");

let r = { fase: null, total: 0 };
for (const f of ["baixo", null, "cima", null, "cima", "baixo", "cima", "baixo"]) r = contarRepeticao(r, f);
assert.equal(r.total, 2, "duas voltas completas = 2 repetições");

// Queda: em pé por 2 s, quadril despenca em 0,5 s e fica deitado e parado por 9 s
const amostras = [];
let estado = "ok";
const historico = [];
for (let t = 0; t <= 11500; t += 100) {
  const caindo = t >= 2000;
  amostras.push({ t, y: caindo ? 0.85 : 0.5, deitado: caindo });
  estado = estadoDoCorpo(estado, amostras);
  if (historico.at(-1) !== estado) historico.push(estado);
}
assert.deepEqual(historico, ["ok", "caiu", "parado"]);

// Deitar devagar (8 s para descer) não é queda: vira "deitado", sem alerta
const devagar = [];
estado = "ok";
for (let t = 0; t <= 8000; t += 100) {
  devagar.push({ t, y: 0.5 + (0.35 * t) / 8000, deitado: t > 6000 });
  estado = estadoDoCorpo(estado, devagar);
}
assert.equal(estado, "deitado");

// Já estava no chão quando a câmera ligou (nenhuma queda vista) e não se mexe: chama ajuda
const noChao = [];
estado = "ok";
for (let t = 0; t <= 9000; t += 100) {
  noChao.push({ t, y: 0.85 + (t % 300 === 0 ? 0.01 : 0), deitado: true }); // tremidinha do MediaPipe
  estado = estadoDoCorpo(estado, noChao);
}
assert.equal(estado, "parado");

// Caído, com 1 quadro errado ("em pé") a cada segundo: o alerta não pode sumir
const tremendo = [];
estado = "ok";
for (let t = 0; t <= 11000; t += 100) {
  const caido = t >= 2000;
  tremendo.push({ t, y: caido ? 0.85 : 0.5, deitado: caido && t % 1000 !== 0 });
  estado = estadoDoCorpo(estado, tremendo);
}
assert.equal(estado, "parado");

// Deitado de lado para a câmera: tronco parece vertical, mas o corpo é mais largo que alto
const deLado = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.8 }));
deLado[11] = { x: 0.48, y: 0.78 }; deLado[12] = { x: 0.5, y: 0.8 }; // ombros
deLado[23] = { x: 0.52, y: 0.82 }; deLado[24] = { x: 0.54, y: 0.83 }; // quadril
deLado[0] = { x: 0.2, y: 0.78 }; deLado[27] = { x: 0.85, y: 0.84 }; deLado[28] = { x: 0.86, y: 0.85 }; // cabeça e pés
assert.equal(amostraDoCorpo(deLado, 0).deitado, true);
assert.equal(amostraDoCorpo(corpo({ punhoY: 0.3 }), 0).deitado, false, "braços abertos não é deitado");

console.log("movimento: contador e detector de queda ok");
