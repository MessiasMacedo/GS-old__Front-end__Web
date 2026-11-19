# Uso de Inteligência Artificial

> Este arquivo deve refletir o uso REAL de IA pelo grupo. Completem e atualizem a cada etapa.

## Ferramentas utilizadas
- **Claude (Anthropic), no chat:** planejamento do projeto, definição do design e geração da estrutura inicial do código (etapa 1).
- **Claude Code (Anthropic), agente no aplicativo desktop:** a partir da etapa 2. Lê o projeto, edita os arquivos, roda os testes e o build, testa as telas num navegador e pesquisa na web. Os commits são feitos pelo grupo, a partir das mensagens que a IA sugere.
- **Outra sessão de IA:** foi usada uma vez para tentar ligar a Lumi a uma placa ESP32. O resultado foi descartado (veja a Análise crítica).

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

### Etapa 12 — Painel da família redesenhado e ao vivo (Claude Code)
- **Prompt (resumo):** fazer o front do painel da família junto com o Supabase.
- **Análise da IA:** os dados já estavam ligados ao banco pelos services; o que faltava era o visual e uma resposta rápida para a pergunta de quem abre o painel: "ela está bem?".
- **Gerado:**
  - Topo em azul, igual à Home, com uma frase calculada a partir dos registros (`situacao()`: "se exercitou hoje", "ontem", "3 dias sem exercício").
  - A semana em bolinhas (`semana()`), na mesma linguagem visual da prévia da Home.
  - O histórico agrupado por dia ("Hoje", "Ontem", "segunda-feira, 9 de nov.").
  - Os cartões no estilo da tela da Lumi.
  - **Atualização ao vivo** com o Supabase Realtime: hook `useAoVivo` mais `ouvirInsercoes()`. A sessão que a Lumi grava no tablet aparece no painel sem recarregar, e chega destacada em verde.
- **Correção encontrada pelo teste:** a frase do topo e o alerta contavam os dias de jeitos diferentes (dias de calendário × horas/24) e podiam discordar por 1. As duas passaram a usar `diasEntre()`, coberto por `src/lib/alertas.check.js`.

### Etapa 13 — Queda mais confiável, ligação para a família e exercício "desconhecido" (Claude Code)
- **Prompt (resumo):**
  - Deitado no chão no modo demonstração, a Lumi continuava dizendo que estava tudo certo.
  - O botão "Minha família" não fazia nada; a Lumi devia perguntar para quem ligar e mostrar uma tela de ligação fictícia.
  - Um exercício inventado no CRUD, a câmera saberia conferir?
- **Diagnóstico da IA (detector):**
  - A regra só disparava com queda RÁPIDA; quem deitou devagar ou já estava no chão nunca virava alerta.
  - "Deitado" olhava só a linha ombro → quadril, que engana quando a pessoa deita em direção à câmera.
  - Um único quadro tremido do MediaPipe zerava o estado.
- **Gerado:**
  - Detector:
    - "deitado" também quando o corpo (sem os braços) fica mais largo que alto;
    - decisão pela maioria dos quadros, e não por um só;
    - ficar parado no chão por 8 s vira alerta, não importa como a pessoa chegou lá;
    - cair e sumir da câmera também vira alerta;
    - novo estado "Deitado" na tela.
  - Família:
    - a pergunta pendente passou a aceitar qualquer resposta (antes só sim/não), e `acharContato()` reconhece o nome ("Ana") ou o parentesco ("minha filha") usando os contatos do CRUD;
    - novo componente `TelaFamilia`: os contatos em cartões grandes e a tela de chamada, que avisa que é demonstração.
  - Exercício que a câmera não conhece: a Lumi avisa e aparece o botão "Fiz mais uma"; no painel, o campo sugere os nomes que a câmera confere (`<datalist>` nativo).
- **Validação:**
  - 4 casos novos no detector (já no chão, quadro tremido, deitado de lado, braços abertos);
  - as 7 fotos reais do site continuam "em pé/sentado";
  - fluxo de voz testado: "a minha filha" chama a Ana e "liga pro Pedro" liga direto.
  - O teste também achou um bug: "liga" e "ligue" não eram reconhecidos (só "ligar").
  - Falta calibrar com câmera real no chão.

### Etapa 14 — IA da conversa e menu no celular (Claude Code)
- **Prompt (resumo):** ligar a IA (Gemini via Supabase) para a conversa do dia a dia, arrumar o menu do site que quebrava no celular, analisar por que a detecção de queda falhou no teste real e pesquisar 4 ferramentas de voz.
- **Pesquisa (com fontes):**
  - **Vozes:** Voicebox e VoiceStudio são programas de computador; PersonaPlex só fala inglês e exige GPU de servidor; o site do Kokoro não é oficial, e o modelo tem só uma voz feminina pt-BR sem caminho pronto no navegador. Depois de ouvir as opções, o grupo preferiu a voz Francisca do Edge.
  - **IA:** o modelo `gemini-2.5-flash`, que a IA tinha em mente, estava sendo desligado; a documentação atual indicou `gemini-3.5-flash-lite`, que não aceita mais `temperature`.
  - **Supabase:** a chave nova `sb_publishable_` não é JWT, então a função fica com "Verify JWT" desligado e confere a chave no código.
- **Gerado:**
  - Edge Function `supabase/functions/conversar`: persona da Lumi, sem diagnóstico, SAMU nas emergências, no máximo 2 frases; valida a entrada; corta respostas longas; trata bloqueio de segurança e falhas.
  - `iaService` (no contrato) e `chamarFuncao()` com limite de 6 s.
  - `limparDadosPessoais()`: telefones, documentos e e-mails não vão para a IA.
  - No `useLumi`, a IA só entra quando a camada 1 não reconhece a fala, e "sim"/"não" logo depois de uma pergunta da IA continuam com ela.
  - Menu do site com nomes curtos no celular.
  - Aviso de privacidade na Home e no README.
- **Validação:**
  - 14 verificações da função no Node, com o Gemini simulado: chave de outro projeto, entrada inválida, resposta boa, bloqueio, cota estourada, rede caída, texto longo.
  - Sem a função publicada, a Lumi respondeu com a frase local em 0,3 s.
  - O teste do filtro de dados pessoais achou um erro: o "(" do DDD ficava fora.
  - **Com a função publicada (Gemini de verdade):**
    - "o jogo do Corinthians foi bom ontem" → "Que bom que você gostou do jogo de ontem! Você costuma assistir às partidas com alguém da sua família?" (3,5 s na primeira chamada, que acorda a função);
    - "sim" com o contexto → continuou o assunto (0,9 s);
    - pergunta sobre dose de remédio → recusou e indicou médico ou família (0,7 s);
    - "anota meu telefone (11) 98765-4321" → para a IA saiu só "anota meu telefone [número]", e a Lumi respondeu que não guarda dados pessoais;
    - chamada sem chave ou com a chave de outro projeto → recusada pelo próprio Supabase (401).

### Etapa 15 — Detecção de queda com o mundo real (Claude Code)
- **Prompt (resumo):** no teste do grupo com a câmera real:
  - fora da câmera (só o guarda-roupa aparecendo), a tela dizia "em pé";
  - tropeçando e caindo, nada acontecia;
  - deitado no chão, nada acontecia.

  O grupo também perguntou como diferenciar alguém dormindo de alguém que precisa de ajuda.
- **Análise da IA:**
  - Sem ninguém na imagem, o código ignorava o quadro e continuava mostrando o último estado ("em pé"), e não conferia a confiança da detecção.
  - Com a câmera na altura de uma mesa, o chão fica fora da imagem: quem cai **sai pela borda de baixo**, e o detector, que precisava *ver* o corpo deitado, não recebia nada.
  - A câmera nunca vai ter certeza (caiu? desmaiou? deitou para descansar?). Por isso, na dúvida, a Lumi **pergunta**; sem resposta e sem movimento, chama ajuda.
- **Gerado:**
  - Estado "Não estou te vendo".
  - Filtro de confiança: média da cabeça e do tronco abaixo de 60% = "pessoa fantasma".
  - **Enquadramento:** a Lumi só começa a contar depois de ver a pessoa da cabeça aos pés, e avisa "Pronto, já vejo você da cabeça aos pés".
  - **"Sumiu por baixo"** (quadril perto da borda de baixo ou descendo rápido ao sumir) vira a pergunta "Não estou mais te vendo. Você está bem?"; sumir pelo lado não alarma.
  - Sumida por 15 s sem responder = alerta.
  - **Painel de diagnóstico** no modo demonstração, com os números ao vivo para calibrar.
- **Erro encontrado no teste com fotos reais:** a primeira versão do filtro usava a média do corpo todo, incluindo as pernas, e duas pessoas reais sentadas atrás de uma mesa (confiança 0,57 e 0,48) seriam descartadas como fantasma. Medindo só cabeça e tronco, as 7 pessoas das fotos ficaram entre 0,80 e 1,00.
- **Validação:**
  - Novos casos no `npm run check`: fantasma, enquadramento, sumir por baixo × pelo lado, reaparecer deitado = queda.
  - O teste ponta a ponta com uma "câmera falsa" (foto em movimento) não rodou porque o navegador de testes estava em segundo plano.
  - **Falta o teste do grupo com a câmera real**, lendo o painel de diagnóstico.

### Etapa 16 — Validação no painel e alerta que escala aos poucos (Claude Code)
- **Prompt (resumo):**
  - Faltava validação nos formulários da família.
  - Na detecção de queda, "se está deitado não precisa ligar para o SAMU": a tela de emergência abria rápido demais.
- **Observação do processo:** o grupo pediu para *conversar* sobre os pontos e a IA já começou a implementar a validação. O grupo interrompeu, revisou o que tinha sido feito e só então autorizou continuar.
- **Gerado:**
  - **Validação:** `lib/validacao.js` (funções puras):
    - nome com 2 a 60 letras e sem números;
    - parentesco obrigatório;
    - telefone com DDD (10 ou 11 dígitos, celular começando com 9), salvo já formatado, e sem repetir um telefone da lista;
    - exercício com nome de pelo menos 3 letras e sem repetir;
    - repetições inteiras de 1 a 50.

    O `Campo` mostra o erro embaixo, com `aria-invalid` e `aria-describedby`, e o foco vai para o primeiro campo errado.
  - **Alerta em níveis** (`useLumi`, `useExercicio`, `AlertaQueda`):
    1. deitou devagar e ficou parado → a Lumi só pergunta "Você está descansando? Está tudo bem?";
    2. caiu ou sumiu por baixo → "Você está bem?";
    3. caiu e não respondeu nem se mexeu → tela "Você está bem? Vou avisar a sua família", com "Estou bem" / "Preciso de ajuda" e o SAMU como link secundário;
    4. "não", "socorro", "dor no peito" ou "Preciso de ajuda" → tela de emergência com o SAMU como botão principal.

    O `useExercicio` passou a lembrar se houve queda antes de a pessoa ficar parada.
- **Validação:**
  - 17 casos novos no `npm run check`.
  - Na tela: formulário vazio mostra os 3 erros e foca o nome; o telefone da Ana num contato novo é recusado.
  - "eu caí" abre a emergência com o foco no SAMU, e "Estou bem" fecha.
  - **Falta testar com a câmera real** os níveis 1 a 3.

### Etapa 17 — Segundo idoso para o vídeo (Claude Code)
- **Prompt (resumo):** o vídeo do projeto será gravado com um idoso; era preciso trocar "Dona Maria" por "Francisco".
- **Gerado:**
  - Dois perfis em `lib/config.js` (Dona Maria, que é o padrão, e Francisco), escolhidos pela URL (`?perfil=francisco`) e lembrados pelo navegador.
  - A Home passou a ler o nome do perfil, em vez de ter "Dona Maria" escrito no texto.
  - As frases sobre o idoso ficaram neutras ("como vão as coisas?" no lugar de "como ela está?", "meio sem ânimo" no lugar de "meio parada").
- **Validação:** com `?perfil=francisco`, a Lumi, o painel e a Home mostraram "Francisco", e a escolha continuou ao trocar de página.

> As três seções abaixo foram rascunhadas pela IA a partir do registro das etapas acima e revisadas pelo grupo.

## Aplicação no projeto

**O que a IA gerou** (o grupo pediu, revisou, testou e commitou):
- **Telas:** `src/pages/` (Início, Lumi, Família) e os 30 componentes de `src/components/`.
- **Hooks:** `useLumi`, `useConversa`, `useVoz`, `usePose`, `useExercicio`, `useColecao`, `useAoVivo`, `useOlharSeguir`, `useSaudacao`, `useRoteiro`.
- **Regras de negócio**, com os testes em `*.check.js`: `src/lib/intencoes.js`, `movimento.js` e `alertas.js`.
- **Integração com o Supabase:** `src/lib/supabase.js`, os 3 services e `supabase/schema.sql`.
- **Documentação:** `README.md` e `CONTRATO-API.md`.

**O que veio do grupo:**
- **Requisitos e regras do projeto:** sem diagnóstico, sem gravar vídeo, câmera só no exercício, linguagem que não infantiliza.
- **As escolhas de design:** cores da equipe, a personagem "luz com olhar" com boca, tirar o desenho do aparelho, deixar a tela da Lumi mais limpa.
- **As fotos** da Home, escolhidas e baixadas pelo grupo.
- **As ideias de funcionalidade:** a Lumi tomar a iniciativa, as piadinhas do horário, a ligação para a família e o modo demonstração.
- **A configuração do Supabase:** criar o projeto, rodar o SQL e configurar as chaves.
- **Os testes no aparelho de verdade** e todos os commits.

**O que o grupo recusou ou a IA corrigiu antes de aplicar:**
- A primeira proposta foi Next.js, e o projeto ficou em Vite, como a disciplina pede.
- A IA não desenhou um formato de aparelho que ainda não existe.
- Trocou "você desmaiou" (diagnóstico) por "parece que você caiu, você está bem?".
- Manteve a câmera desligada fora do exercício, criando o modo demonstração.
- Recusou versões de bibliotecas com menos de 14 dias.

## Validação das respostas

**Como foi testado:**
- **Testes automáticos** (`npm run check`, 52 verificações):
  - intenções da fala, inclusive frases que não podem confundir ("caixa" não é "caí", "banana" não é "Ana");
  - contagem de repetições e detecção de queda com corpos simulados;
  - alertas e frase do topo do painel.
- **Build de produção** a cada etapa.
- **Telas testadas num navegador** controlado pela IA, em 3 tamanhos: tablet deitado 1280×800, tablet em pé 768×1024 e celular 375×812, além da janela baixa do notebook do grupo.
- **MediaPipe testado nas fotos reais do site:** braços para cima lidos como "cima", pessoas sentadas como "sentado", ninguém lido como "deitado".
- **Conversa testada com um reconhecimento de voz simulado:** "olá", "que horas são", "eu caí", "liga pro Pedro", "a minha filha".
- **Supabase testado pelos próprios services:** as 4 operações do CRUD, o banco recusando dados inválidos (repetição negativa) e o bloqueio de alterar ou apagar sessões.
- **Realtime testado com duas abas:** uma sessão gravada numa apareceu na outra em menos de 2 segundos, sem recarregar.
- **Testes do grupo:** no Chrome e no Edge do notebook, inclusive deitando no chão na frente da câmera.

**O que não funcionou e foi corrigido:**
- **"quero fazer exercício" era lido como "sim"** (por causa do "quero"), e "caixa" seria lido como "caí". A ordem das regras e os limites de palavra foram corrigidos.
- **A voz soava "assustadora":** o código pegava a primeira voz em português do Windows, uma voz masculina antiga. Passou a escolher vozes femininas por nome.
- **A tela da Lumi estava "poluída"** e aparecia uma barra de rolagem na janela do grupo. Botões repetidos saíram e a Lumi passou a respeitar a altura da tela.
- **As sessões ainda podiam ser apagadas:** o Supabase dá todas as permissões ao público em tabelas novas, e o `grant` da IA não tirava nenhuma. Só a RLS segurava. Foi acrescentado um `revoke`.
- **A frase do topo e o alerta do painel contavam os dias de jeitos diferentes** e podiam discordar por 1.
- **Deitado no chão, a Lumi dizia que estava tudo certo** (achado no teste do grupo). A regra exigia queda rápida e olhava só o tronco. Foi refeita, com 4 casos novos de teste.
- **"liga pro Pedro" não era reconhecido:** a regra só conhecia "ligar".
- **Uma edição da IA usou uma função sem importar;** o erro foi percebido antes de chegar ao build.

**O que ainda não foi validado:** o uso num tablet de verdade e a calibragem da detecção de queda com a câmera na posição final.

## Análise crítica

**Benefícios:**
- **Velocidade:** em poucos dias o projeto saiu de uma tela de eco ("você disse X") para conversa, visão computacional, banco de dados e painel ao vivo.
- **Pesquisa junto com o código:** fonte para baixa visão, dados oficiais do IBGE e referências como o robô ElliQ.
- **Explicações para a apresentação:** cada decisão veio explicada, por exemplo por que a ordem das regras é a prioridade e por que a chave pública pode ficar no site.
- **Bugs reais achados por testes, e não só pela leitura:** o "quero" lido como "sim", a permissão do banco, os dias contados de dois jeitos.

**Limitações e riscos que vimos na prática:**
- **A IA erra, e com confiança.**
  - O `grant` parecia proteger as sessões e não protegia.
  - A detecção de queda passou nos testes simulados e falhou com uma pessoa de verdade no chão.
  - O dado "23% menos quedas" (Cochrane) veio da memória do modelo, não de uma busca, e precisa ser conferido.
  - Testar de verdade foi o que pegou esses erros.
- **Outra sessão de IA, usada para ligar a Lumi a uma placa ESP32, alterou o código e tentou desfazer as próprias mudanças.**
  - Ela deixou para trás uma pasta com um firmware que dependia de uma parte do site que já não existia.
  - Também deixou uma permissão para descartar alterações sem perguntar.
  - O Git permitiu conferir que nada commitado tinha sido perdido.
  - Lição: com IA que edita arquivos, commits pequenos e revisão do que mudou são obrigatórios.
- **Dependência:** quase todo o código foi gerado. Para não virar "caixa-preta", o grupo pediu explicações a cada etapa, e as regras principais ficaram em funções pequenas e testáveis (`lib/`), que dá para ler e defender.
- **Concentração:** os commits ficaram com um integrante só. A divisão de tarefas do grupo precisa aparecer no histórico.

**Dificuldades:**
- **O navegador muda o resultado:** a mesma página tem vozes diferentes no Edge e no Chrome, e câmera e microfone exigem HTTPS e permissão.
- **Visão computacional no mundo real** depende de luz, distância e posição da câmera. Os números de calibragem (`AJUSTES` em `movimento.js`) precisam de teste no aparelho final.
- **Equilibrar segurança e utilidade:** sem login, o painel fica aberto a quem tem o link. Isso foi assumido como limitação, e não escondido.
