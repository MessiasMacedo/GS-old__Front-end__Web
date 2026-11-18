// Checagem da validação dos formulários do painel: `npm run check`.
import assert from "node:assert/strict";
import { formatarTelefone, validarContato, validarExercicio } from "./validacao.js";

// Telefone: aceita do jeito que a pessoa digitar e guarda formatado
assert.equal(formatarTelefone("11987654321"), "(11) 98765-4321");
assert.equal(formatarTelefone("(11) 3456-7890"), "(11) 3456-7890");

let r = validarContato({ nome: "  Ana   Maria ", parentesco: " Filha ", telefone: "11 98765 4321" });
assert.deepEqual(r.erros, {});
assert.deepEqual(r.dados, { nome: "Ana Maria", parentesco: "Filha", telefone: "(11) 98765-4321" });

assert.ok(validarContato({ nome: "A", parentesco: "Filha", telefone: "11987654321" }).erros.nome);
assert.ok(validarContato({ nome: "Ana2", parentesco: "Filha", telefone: "11987654321" }).erros.nome);
assert.ok(validarContato({ nome: "Ana", parentesco: "", telefone: "11987654321" }).erros.parentesco);
assert.ok(validarContato({ nome: "Ana", parentesco: "Filha", telefone: "98765-4321" }).erros.telefone, "sem DDD");
assert.ok(validarContato({ nome: "Ana", parentesco: "Filha", telefone: "11187654321" }).erros.telefone, "celular sem o 9");
assert.equal(
  validarContato({ nome: "Bia", parentesco: "Neta", telefone: "(11) 98765-4321" }, [{ telefone: "11987654321" }]).erros.telefone,
  "Esse telefone já está na lista."
);

// Exercício
r = validarExercicio({ nome: " Elevação dos braços ", repeticoes: "10" });
assert.deepEqual(r.erros, {});
assert.equal(r.dados.repeticoes, 10);
assert.ok(validarExercicio({ nome: "Ab", repeticoes: 10 }).erros.nome);
assert.ok(validarExercicio({ nome: "Alongar", repeticoes: "" }).erros.repeticoes);
assert.ok(validarExercicio({ nome: "Alongar", repeticoes: 0 }).erros.repeticoes);
assert.ok(validarExercicio({ nome: "Alongar", repeticoes: 51 }).erros.repeticoes);
assert.ok(validarExercicio({ nome: "Alongar", repeticoes: 2.5 }).erros.repeticoes);
assert.ok(validarExercicio({ nome: "elevação DOS braços", repeticoes: 5 }, [{ nome: "Elevação dos braços" }]).erros.nome, "nome repetido");

console.log("validacao: contatos e exercícios ok");
