// Checagem do contador e do detector de queda com corpos "de mentira": `npm run check`.
import assert from "node:assert/strict";
import { contarRepeticao, estadoDoCorpo, faseDoExercicio } from "./movimento.js";

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

// Deitar devagar (8 s para descer) não é queda
const devagar = [];
estado = "ok";
for (let t = 0; t <= 8000; t += 100) {
  devagar.push({ t, y: 0.5 + (0.35 * t) / 8000, deitado: t > 6000 });
  estado = estadoDoCorpo(estado, devagar);
}
assert.equal(estado, "ok");

console.log("movimento: contador e detector de queda ok");
