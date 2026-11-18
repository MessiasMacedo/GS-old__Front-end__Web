# Lumi — OLD

**OLD — Envelhecer acompanhado, viver com autonomia.**

A Lumi é uma assistente de companhia e bem-estar para pessoas idosas, pensada para uma tela com câmera e microfone. Ela conversa por voz, propõe exercícios leves que confere pela câmera, ajuda a falar com a família e mostra à família, num painel, como foi a semana.

A Lumi **não diagnostica**, **não grava vídeo** e **não substitui** o contato humano nem profissionais de saúde. A câmera só liga durante os exercícios, com permissão.

Projeto da Global Solution 2026.2 (CitizenTech), FIAP, para as disciplinas de Front-end Design e Web Development.

- **Site publicado:** [preencher com o link da Vercel]
- **Uso de IA no projeto:** [AI.md](AI.md)
- **Contrato entre front-end e banco:** [CONTRATO-API.md](CONTRATO-API.md)

## Integrantes
- Fabrício Zanzarine de Oliveira Leme — RM 572631
- Messias Macedo de Souza — RM 573247
- Ryan Romagnoli Santos — RM 568845
- João Pedro da Cruz — RM 571827
- Kaue Herculano Guimaraes de Barros — RM 570699

## O que tem em cada tela

| Rota | Para quem | O que faz |
|---|---|---|
| `/` | Visitante | Apresenta o problema (dados do IBGE), a Lumi e a privacidade. O rosto da Lumi acompanha o mouse. |
| `/lumi` | Pessoa idosa (tablet) | Conversa por voz, exercício com câmera, ligação para a família, alerta de queda. |
| `/familia` | Família | Frase do dia ("se exercitou hoje"), semana em bolinhas, pontos de atenção, histórico ao vivo e CRUD de contatos e da rotina. |

### Trocar o idoso da demonstração
O padrão é a **Dona Maria**. Para gravar com o **Francisco**, abra qualquer página com `?perfil=francisco` no fim do endereço (ex.: `/lumi?perfil=francisco`). O navegador lembra a escolha; `?perfil=maria` volta ao padrão.

### Para testar a Lumi por voz
Toque no rosto da Lumi e fale:

| Fale | O que acontece |
|---|---|
| "Olá, Lumi" / "tudo bem?" | Ela cumprimenta e responde. |
| "Que horas são?" | A hora + um comentário do horário ("hora do almoço, né?"). |
| "Quero fazer exercício" | Abre a câmera, desenha o esqueleto e conta as repetições em voz alta. No fim, salva a sessão e o painel da família atualiza sozinho. |
| "Quero falar com a família" / "liga pra minha filha" | Pergunta para quem ligar (contatos do painel) e abre uma ligação de demonstração. |
| "Caí" / "socorro" / "dor no peito" | Alerta em tela cheia com o SAMU (192). |
| "Câmera computacional" | Modo demonstração da detecção de queda. |
| Qualquer outro assunto ("o jogo ontem foi bom") | Conversa livre com a IA (Gemini). Sem internet, ela responde com uma frase local. |

## Tecnologias
- **React 19** + **Vite 8** + **React Router 7**
- **Tailwind CSS 4**, fonte **Atkinson Hyperlegible Next** (feita para baixa visão)
- **Supabase**: banco Postgres, regras de segurança (RLS) e atualização ao vivo (Realtime), via `@supabase/supabase-js` 2.118.0
- **Gemini** (`gemini-3.5-flash-lite`, plano gratuito) numa **Edge Function do Supabase**, só para a conversa livre
- **MediaPipe Pose** (`@mediapipe/tasks-vision` 1.2.0): visão computacional rodando no próprio navegador
- **Web Speech API**: reconhecimento e síntese de voz do navegador

As dependências têm versão exata, foram publicadas há pelo menos 14 dias quando instaladas e passaram no `npm audit`.

## Como rodar

Pré-requisito: Node.js 20.19 ou superior.

1. Instale as dependências. O `postinstall` copia os arquivos da visão computacional (WASM) para `public/mediapipe/wasm`:
   ```bash
   npm install
   ```
2. Crie o banco: num projeto do [Supabase](https://supabase.com), abra o **SQL Editor**, cole o arquivo [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**. Ele cria as tabelas, as regras de segurança, o Realtime e os dados de exemplo.
3. Copie `.env.example` para `.env.local` e preencha com a URL do projeto e a chave **publishable** (pública) do Supabase. Nunca use a chave secret/service_role.
4. Rode:
   ```bash
   npm run dev
   ```
5. Abra `http://localhost:5173/lumi` no **Microsoft Edge** (voz mais natural) ou no **Google Chrome**. Microfone e câmera só funcionam em `localhost` ou em HTTPS.

Outros comandos:
- `npm run check`: testes das regras (intenções da fala, contagem de repetições, detecção de queda, alertas do painel).
- `npm run build`: versão de produção em `dist/`.

### IA da conversa (Edge Function)
1. Crie uma chave no [Google AI Studio](https://aistudio.google.com).
2. No Supabase, vá em **Edge Functions → Secrets** e crie `GEMINI_API_KEY` com essa chave.
3. Em **Edge Functions → Deploy a new function → Via Editor**, crie a função `conversar`, cole o código de [`supabase/functions/conversar/index.ts`](supabase/functions/conversar/index.ts) e publique.
4. Na função, **desligue "Verify JWT"**. A chave publishable não é um JWT; a função confere a chave do projeto no próprio código.

Sem a função, a Lumi continua funcionando com as respostas locais.

### Deploy na Vercel
O `vercel.json` já redireciona as rotas para o React Router. Em **Settings → Environment Variables**, cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_KEY` com os mesmos valores do `.env.local` e faça um novo deploy.

## Estrutura
- `src/pages/`: as três telas (Início, Lumi, Família)
- `src/components/`: componentes visuais, sem regra de negócio (`lumi/`, `familia/`, `site/`, `ui/`)
- `src/hooks/`: custom hooks com a lógica
  - `useLumi`: modos da tela, pergunta pendente e quando chamar a IA
  - `useConversa` e `useVoz`: fala
  - `usePose` e `useExercicio`: câmera e contagem
  - `useColecao`: CRUD
  - `useAoVivo`: Realtime
- `src/lib/`: funções puras de regra de negócio, com testes em `*.check.js`
  - `intencoes`: o que a pessoa quis dizer
  - `movimento`: repetições e queda
  - `alertas`: painel da família
- `src/services/`: acesso ao Supabase; o formato está em `CONTRATO-API.md`
- `supabase/schema.sql`: tabelas, segurança e dados de exemplo
- `supabase/functions/conversar/`: Edge Function da IA (Gemini)

## Requisitos da disciplina

| Requisito | Onde está |
|---|---|
| React + Vite e Tailwind | `package.json`, `vite.config.js` |
| Pelo menos 8 componentes reutilizáveis | `src/components/`: 30 componentes (ex.: `LumiRosto` em 5 telas, `BalaoFala`, `Botao`, `Campo`, `PainelSecao`, `ListaAlertas`) |
| `useState` e `useEffect` | em todos os hooks e nos formulários |
| Pelo menos 2 custom hooks | `src/hooks/`: 10 hooks |
| API externa com CRUD completo | Supabase: `contatos` e `rotina` (criar, listar, editar, excluir) em `/familia` |
| Funcionalidade real ligada ao tema | conversa por voz, exercício conferido por visão computacional, detecção de queda, painel ao vivo |
| Pelo menos 15 commits significativos | histórico do Git |
| Registro do uso de IA | [AI.md](AI.md) |

## Privacidade e segurança
- **A câmera só liga na tela de exercício** e mostra o aviso "Câmera ligada". A imagem é analisada no próprio aparelho e descartada: nenhum vídeo é gravado ou enviado.
- **A conversa livre** (só ela) vai para o Gemini, do Google, **sem nome, telefone, documentos ou e-mail**: um filtro tira esses dados antes. No plano gratuito, o Google pode usar o que é enviado para melhorar os produtos dele, e por isso nada pessoal deve ser enviado. A chave da IA fica no servidor do Supabase, nunca no site.
- **A voz** é processada pelo navegador. No Chrome e no Edge, o reconhecimento de fala usa um serviço online do próprio navegador.
- **No banco ficam só:** contatos, rotina e sessões de exercício (nome do exercício, repetições e data).
- **As sessões não podem ser alteradas nem apagadas pelo site.** O banco bloqueia isso com permissões e RLS.
- **No site vai só a chave pública** do Supabase; quem protege os dados são as regras de RLS.

## Limitações conhecidas
- **Sem login:** quem tem o link do painel consegue editar contatos e rotina. Para a demonstração isso foi aceito; em produção seria preciso autenticação por família.
- **A câmera confere só 2 exercícios:** elevação dos braços e sentar e levantar. Nos outros, a pessoa conta tocando em "Fiz mais uma".
- **A detecção de queda é uma heurística** (o corpo desce rápido e fica deitado, ou fica parado no chão). Depende da posição da câmera e precisa de calibragem no aparelho real. Não é diagnóstico.
- **"Vou avisar a sua família" ainda é só fala e tela:** nenhum aviso é enviado.
- **A ligação para a família é uma tela de demonstração**, sem chamada real.
- **A conversa livre usa o plano gratuito do Gemini**, que tem limite de uso e pode usar os textos para treinar o modelo do Google. A função da IA só aceita a chave pública do projeto, mas, como essa chave é pública, alguém com o site aberto poderia gastar a cota.
- **"Dona Maria" é um perfil fixo de demonstração** (`src/lib/config.js`). O histórico da semana tem sessões de exemplo, criadas pelo `schema.sql`.
