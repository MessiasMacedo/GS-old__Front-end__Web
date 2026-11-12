# Contrato entre front-end e API

Quem faz a API/Supabase altera **somente o corpo** das funções em `services/`.
Nomes das funções, parâmetros e formato dos objetos **não mudam** sem combinar com o front.

## Regras gerais
- Toda função é `async`.
- Em erro, `throw new Error("mensagem que a família possa ler")`. O front mostra essa mensagem na tela.
- `id` é string. Datas são strings ISO 8601 (`2026-11-11T10:15:00.000Z`).

## contatosService.js — CRUD completo
| Função | Recebe | Devolve |
|---|---|---|
| `listar()` | — | `[{ id, nome, parentesco, telefone }]` |
| `criar(dados)` | `{ nome, parentesco, telefone }` | o contato criado, com `id` |
| `atualizar(id, dados)` | id + campos alterados | o contato atualizado completo |
| `excluir(id)` | id | nada |

## rotinaService.js — CRUD completo
| Função | Recebe | Devolve |
|---|---|---|
| `listar()` | — | `[{ id, nome, repeticoes, ativo }]` |
| `criar(dados)` | `{ nome, repeticoes, ativo }` | o exercício criado, com `id` |
| `atualizar(id, dados)` | id + campos alterados (pode ser só `{ ativo }`) | o exercício atualizado completo |
| `excluir(id)` | id | nada |

## sessoesService.js — Lumi cria, dashboard lista
| Função | Recebe | Devolve |
|---|---|---|
| `listar()` | — | `[{ id, exercicio, repeticoes, data }]`, mais recentes primeiro |
| `criar(dados)` | `{ exercicio, repeticoes }` | a sessão criada (a API preenche `id` e `data`) |

## Tabelas sugeridas no Supabase
- `contatos` (id uuid, nome text, parentesco text, telefone text)
- `rotina` (id uuid, nome text, repeticoes int, ativo bool)
- `sessoes` (id uuid, exercicio text, repeticoes int, data timestamptz default now())

Chaves do Supabase vão em `.env.local` (já está no `.gitignore`). **Nunca** commitar chave.
