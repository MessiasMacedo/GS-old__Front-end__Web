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

### Etapa 6 — Design da tela da Lumi no tablet (Claude Code)
- **Prompt (resumo):** antes de dar autonomia à Lumi (cérebro local + IA), melhorar o design da tela `/lumi`; manter os botões, mas com outro visual.
- **Gerado:** layout em duas colunas no tablet deitado (Lumi e conversa à esquerda; saudação e sugestão à direita), uma coluna no tablet em pé e no celular; novo componente `CartaoSugestao` ("A Lumi sugere" + "Vamos lá / Agora não"), botões de ação em cartões brancos com ícone colorido, balões no estilo do site, status em pílula, selo do microfone no canto para não cobrir a boca da Lumi.
- **Provisório:** a sugestão é o 1º exercício ativo da rotina; na etapa seguinte quem decide é `lib/proximaSugestao.js`.
- **Validação:** testado em 1280×800 (tablet deitado), 768×1024 (tablet em pé) e 375×812 (celular), sem rolagem lateral.

### Etapa 7 — Cérebro local, parte 1: intenções (Claude Code)
- **Prompt (resumo):** a Lumi só repetia o que a pessoa falava. O grupo aprovou um cérebro em duas camadas: camada 1 local e gratuita, camada 2 com IA (Gemini via Edge Function) só para conversa livre.
- **Gerado:** `lib/intencoes.js`, uma tabela de regras (expressões regulares) lida de cima para baixo; a primeira que bate vence, então a ordem é a prioridade. Segurança vem primeiro ("caí", "dor no peito", "socorro") e tem resposta fixa que indica o SAMU (192), sem nunca passar pela IA. O texto é normalizado (sem acento e minúsculo) porque o reconhecimento de voz erra acentos. `respostaLocal` deixou de repetir a fala e passou a responder por intenção.
- **Validação:** `npm run check` roda 18 frases de teste. Na primeira execução, "quero fazer exercício" foi classificada como "sim" (por causa do "quero"), e "caixa" seria lida como "caí". A ordem e os limites de palavra foram corrigidos até todos os casos passarem.

### Etapa 8 — Exercício com visão computacional e detecção de queda (Claude Code)
- **Prompt (resumo):** a Lumi deveria responder com personalidade ("olá", horas com piadinha), abrir a tela de exercício com o boneco e a câmera conferindo o movimento quando a pessoa pede, e perceber quando alguém cai rápido ou fica muito tempo parado (o grupo chamou de "desmaio"), com um comando de voz para demonstrar.
- **Ajustes propostos pela IA e aceitos:** (1) a Lumi não diz "você desmaiou", porque seria diagnóstico; ela diz "parece que você caiu, você está bem?" e, sem movimento, "vou avisar a sua família" + SAMU 192. (2) A câmera continua ligando só no exercício (regra de privacidade da Home); o comando "câmera computacional" abre um **modo demonstração** assumido, com o aviso de câmera ligada visível.
- **Dependência:** `@mediapipe/tasks-vision` 1.2.0 (Google, Apache-2.0), com versão exata, publicada havia 16 dias, e `npm audit` sem vulnerabilidades. O modelo de pose (5,8 MB) fica em `public/mediapipe`; o WASM (14 MB) é copiado do `node_modules` pelo `postinstall` e não vai para o git. A biblioteca é carregada com `import()` dinâmico, então a Home não baixa nada disso.
- **Gerado:** `lib/movimento.js` (funções puras: fase do exercício por posição do punho ou ângulo do joelho, contador como máquina de 2 estados, detector de queda pela velocidade de descida do quadril + tronco deitado), hooks `usePose` (câmera + MediaPipe + desenho do esqueleto), `useExercicio` (liga os pontos às regras sem re-renderizar a cada quadro) e `useLumi` (modo da tela e pergunta pendente, que dá sentido ao "sim"/"não"); componentes `TelaExercicio`, `AlertaQueda` e `FiguraExercicio` (extraído da prévia da Home). Depois de uma pergunta, a Lumi abre o microfone sozinha. Ao terminar, a sessão é salva com `sessoesService.criar` e aparece no painel da família.
- **Validação:** `npm run check` (contador e queda simulados). O MediaPipe foi testado em fotos do próprio site: braços para cima foram lidos como "cima" e as pessoas sentadas como "sentado". A conversa foi testada com reconhecimento de voz simulado ("Olá, Lumi", "câmera computacional desmaio" e "eu caí" abrem as telas certas). **Falta testar com câmera real:** os valores de `AJUSTES` em `movimento.js` precisam de calibragem no tablet.
- **Pendente:** o aviso de verdade para a família precisa de um `alertasService` (mudança no contrato com a parte da API).

### Etapa 9 — Voz da Lumi (Claude Code)
- **Prompt (resumo):** a voz estava "assustadora"; o grupo queria uma voz suave, feminina, talvez de alguma biblioteca.
- **Resposta (resumo):** a IA mostrou que não precisava de biblioteca. A voz vem do navegador, e o código pegava a primeira voz em português da lista; no Windows do grupo havia "Daniel" (masculina, antiga) e "Maria". Cada navegador já traz vozes femininas melhores: no Edge, as neurais Francisca e Thalita; no Chrome, "Google português do Brasil"; no iPad, Luciana.
- **Gerado:** em `useVoz`, uma lista de vozes preferidas procurada por nome, na ordem da mais natural para a menos, caindo para qualquer voz pt-BR se nenhuma existir.
- **Plano B, não feito:** voz de nuvem (Google Cloud TTS ou Azure) via Edge Function, se a voz do navegador ainda não agradar.

### Etapa 10 — Tela da Lumi mais limpa (Claude Code)
- **Prompt (resumo):** a tela estava "poluída para um idoso" (botões embaixo e do lado) e "quebrava do lado" quando chegava uma conversa (aparecia uma barra de rolagem).
- **Análise da IA:** havia três jeitos de começar a conversar (tocar na Lumi, o selo do microfone e o botão "Conversar") e dois de começar o exercício (o cartão de sugestão e o botão "Exercícios"). Para quem tem pouca familiaridade com tecnologia, cada opção a mais é uma decisão a mais.
- **Gerado:** saíram o botão "Conversar" (a própria Lumi é o botão) e o `CartaoSugestao` (a sugestão virou a linha de baixo do botão "Exercícios": "Elevação dos braços, 10 vezes"). Ficaram a Lumi, a conversa e 2 botões grandes. O tamanho da Lumi passou a respeitar também a altura da tela (`min(18rem, 42dvh)`), o título encolhe em telas baixas e a centralização usa `safe center`, que não corta o topo quando o conteúdo não cabe.
- **Validação:** testado em 1170×526 (a janela do print do grupo, sem rolagem), 1280×800 (tablet) e 375×812 (celular, sem cortar a Lumi).

### Etapa 11 — Banco de dados no Supabase (Claude Code)
- **Prompt (resumo):** ligar o painel da família ao Supabase. O CRUD é de verdade, e o histórico mistura dados reais (criados pela Lumi) com uma semana fictícia para o painel não começar vazio.
- **Dependência:** `@supabase/supabase-js` 2.118.0 (MIT), com versão exata. A 2.119.0 tinha só 8 dias e ficou de fora. `npm audit` sem vulnerabilidades.
- **Gerado:**
  - `supabase/schema.sql`: tabelas do contrato, validação no próprio banco (`check`) e RLS, em que sessões só podem ser lidas e criadas. O seed só entra com a tabela vazia e usa datas relativas a hoje.
  - `src/lib/supabase.js`: cliente, `tabela()` e `consultar()`.
  - Novo corpo dos 3 services, **sem mudar nomes, parâmetros nem formatos do contrato**.
  - `.env.example`.
  - `_fake.js` foi removido, porque deixou de ser usado.
- **Decisões:**
  - Só a chave pública vai no site; a proteção é a RLS.
  - Sem login, quem tem o link pode editar. É uma limitação assumida, registrada no README.
  - Os services escolhem os campos explicitamente, então um campo a mais vindo do formulário nunca chega ao banco.
- **Validação:** sem o `.env.local`, o painel mostra "O banco ainda não foi configurado" em cada lista, sem quebrar. Com o projeto real, os testes passaram pelos próprios services:
  - contatos e rotina: criar, editar, mudar só o `ativo` e excluir, tudo certo;
  - o banco recusou repetição negativa;
  - uma sessão criada apareceu no painel e entrou no resumo da semana.
- **Erro encontrado no teste e corrigido:** o Supabase dá todas as permissões ao papel público em tabelas novas, então o `grant` não impedia apagar sessões. A RLS segurava (0 linhas alteradas), mas era a única trava. Foi acrescentado um `revoke update, delete` nas sessões.

## Aplicação no projeto
- [preencher: quais arquivos foram gerados, quais vocês alteraram]

## Validação das respostas
- [preencher: como testaram no tablet, o que não funcionou, o que corrigiram]

## Análise crítica
- [preencher: benefícios, limitações e dificuldades]
