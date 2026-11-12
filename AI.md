# Uso de Inteligência Artificial

> Este arquivo deve refletir o uso REAL de IA pelo grupo. Completem e atualizem a cada etapa.

## Ferramentas utilizadas
- **Claude (Anthropic)** — planejamento do projeto, definição do design e geração da estrutura inicial do código.

## Interações realizadas
### Etapa 1 — Estrutura e tela inicial
- **Prompt (resumo):** pedido para analisar os requisitos da disciplina de Front-end Design, propor identidade visual com as cores da equipe (#76e67e, #00c4cd, #192b83 e branco) e começar o projeto por etapas.
- **Resposta (resumo):** proposta de usar Next.js para proteger a chave da IA no servidor; alerta de que verde e ciano não têm contraste suficiente para texto; geração da tela inicial, dos componentes e dos hooks `useVoz`, `useConversa` e `useSaudacao`.

### Etapa 2 — Identidade visual (Claude Code)
- **Prompt (resumo):** o grupo achou o visual básico, sem identidade, e a Lumi "só uma bola verde". Pediu análise, pesquisa e melhoria do site, da tela da Lumi e do painel.
- **Resposta (resumo):** a IA rodou o app, diagnosticou as três áreas e pesquisou referências (o robô ElliQ, que evita rosto de brinquedo e usa luz como expressão; a fonte Atkinson Hyperlegible Next, de 2025). Propôs três direções para a personagem, e o grupo escolheu "luz com olhar" e pediu que ela mantivesse a boca.
- **Gerado:** novo `LumiRosto` (núcleo de luz com halo; os estados aparecem no halo, nos olhos e na boca), hook `useOlharSeguir` (o rosto acompanha o mouse sem re-renderizar), componente `Logo` (o "O" de OLD é o halo da Lumi), troca para a fonte Next e hero da Home em fundo azul.
- **Decisão revista:** a regra "verde e ciano nunca como texto" vale para fundo branco (contraste 1,6:1 e 2,2:1). Sobre o azul `#192b83`, o verde dá 7,8:1 e o ciano 5,7:1 (passam no WCAG AA), por isso o destaque do título em verde é permitido.

## Aplicação no projeto
- [preencher: quais arquivos foram gerados, quais vocês alteraram]

## Validação das respostas
- [preencher: como testaram no tablet, o que não funcionou, o que corrigiram]

## Análise crítica
- [preencher: benefícios, limitações e dificuldades]
