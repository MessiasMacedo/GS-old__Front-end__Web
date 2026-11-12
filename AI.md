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

### Etapa 3 — Resto da Home (Claude Code)
- **Prompt (resumo):** terminar o redesenho da Home usando as fotos que o grupo baixou.
- **Resposta (resumo):** a IA copiou as fotos para `public/imagens`, reescreveu os textos alternativos conforme o que cada foto mostra de fato e pesquisou um dado oficial para a seção do problema (IBGE, PNAD Contínua 2025: 15,6 milhões de pessoas moram sozinhas, e 41% delas têm 60 anos ou mais).
- **Gerado:** componente `Rotulo` (etiqueta das seções com o anel da marca), ícones de "sim" e "não", pilares numerados em cards, prévia do painel com a semana em bolinhas, seção de privacidade em azul.
- **A validar pelo grupo:** conferir o dado na tabela oficial do IBGE (a IA o encontrou em reportagens sobre a divulgação); a foto de exercício mostra uma postura de equilíbrio em uma perna, que não combina com "exercícios leves e seguros".

### Etapa 4 — Ajustes da Home pedidos pelo grupo (Claude Code)
- **Prompt (resumo):** tirar as etiquetas acima dos títulos; tirar o desenho do aparelho, que parecia um monitor (o hardware será próprio); tirar o item "não fica vigiando"; usar mais 3 fotos de idosos sozinhos, porque o texto ficava maior que a foto; colocar mais dados, com números grandes.
- **Gerado:** seção do problema com o texto em cima e um mosaico de 4 fotos embaixo; nova faixa azul com 4 números do IBGE (32 mi com 60+ no Censo 2022; +56% de idosos de 2010 a 2022; 15,6 mi morando sozinhos, 41% idosos, na PNAD 2025; 75 mi de idosos previstos para 2070 nas Projeções 2024); seção "Feita para quem não quer aprender tecnologia", com a própria Lumi seguindo o mouse no lugar do desenho. Foram removidos `Rotulo` e `IlustracaoAparelho`.
- **Decisão:** a IA não desenhou outro formato de aparelho porque o hardware ainda não existe; desenhar um formato inventado criaria uma promessa visual falsa.

### Etapa 5 — Seção de exercícios e câmera (Claude Code)
- **Prompt (resumo):** faltava explicar os exercícios e a câmera que percebe coisas fora do normal, com mais dados.
- **Resposta (resumo):** a IA alertou que a câmera só liga durante os exercícios (regra do projeto), então ela não pode prometer detectar quedas ao longo do dia. O que dá para prometer é perceber mudanças no desempenho: menos repetições ou dias sem exercício, que são as regras de `lib/alertas.js`. O texto deixa claro que isso não é diagnóstico.
- **Gerado:** componente `PreviaExercicio` (indicador de câmera ligada, botão de parar, esqueleto com os pontos do corpo levantando os braços em animação CSS, contador 8/10) e seção com 3 passos e 3 números: 60% dos idosos insuficientemente ativos (IBGE, PNS 2019); 28% caem ao menos uma vez por ano (OMS, citada pelo Ministério da Saúde); 23% menos quedas com exercício regular (revisão Cochrane, 2019).
- **A validar:** conferir as três fontes. O dado de 23% veio do conhecimento do modelo, não da busca.

## Aplicação no projeto
- [preencher: quais arquivos foram gerados, quais vocês alteraram]

## Validação das respostas
- [preencher: como testaram no tablet, o que não funcionou, o que corrigiram]

## Análise crítica
- [preencher: benefícios, limitações e dificuldades]
