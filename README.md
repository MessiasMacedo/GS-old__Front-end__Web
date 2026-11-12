# Lumi — OLD

**OLD — Envelhecer acompanhado, viver com autonomia.**

A Lumi é uma assistente de companhia e bem-estar para pessoas idosas, rodando em uma tela com câmera e microfone. Projeto da Global Solution 2026.2 (CitizenTech) — FIAP.

## Integrantes
- Fabrício Zanzarine de Oliveira Leme — RM 572631
- Messias Macedo de Souza — RM 573247
- Ryan Romagnoli Santos — RM 568845
- João Pedro da Cruz — RM 571827
- Kaue Herculano Guimaraes de Barros — RM 570699

## Tecnologias
React 19 + Vite, React Router, Tailwind CSS 4, Web Speech API.

## Como rodar
Pré-requisito: Node.js 20.19 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:5173 **no Google Chrome** (o reconhecimento de voz em pt-BR depende dele). O microfone só funciona em `localhost` ou em HTTPS.

## Estrutura
- `src/pages/` — telas (Início, Lumi, Família)
- `src/layouts/` — layout com a navegação do site
- `src/components/` — componentes visuais, sem regra de negócio
- `src/hooks/` — custom hooks com a lógica (voz, conversa, saudação)
- `src/lib/` — funções puras de regra de negócio (alertas, saudação)
- `src/services/` — acesso aos dados. Hoje fictícios; contrato em `CONTRATO-API.md`

## Status
- Etapa 1: tela da Lumi com conversa por voz (respostas provisórias).
- Etapa 2: navegação (Início, Lumi, Painel da família), camada de serviço com dados fictícios e CRUD de contatos e rotina no painel.
- Etapa 4: migração de Next.js para Vite + React Router.
- Etapa 3: Home completa apresentando o produto e rosto animado da Lumi (olhos e boca).
