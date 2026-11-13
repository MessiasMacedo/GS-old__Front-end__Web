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

## Banco (Supabase)
- Tabelas, regras de segurança (RLS) e dados de exemplo: `supabase/schema.sql`. Cole no SQL Editor e rode.
  - `contatos` e `rotina`: CRUD completo.
  - `sessoes`: só leitura e criação. O histórico não pode ser alterado nem apagado.
- Conexão: `src/lib/supabase.js`. Os services usam `tabela()` e `consultar()`, que transformam o erro técnico na mensagem do contrato.
- Chaves: copie `.env.example` para `.env.local` (já está no `.gitignore`) e, na Vercel, cadastre as mesmas variáveis em Settings → Environment Variables.
  - Use **só a chave pública** (publishable/anon). **Nunca** a secret/service_role, e nunca commite chave.
