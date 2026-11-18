/**
 * Textos e imagens da Home num lugar só.
 * FOTOS: coloque os arquivos em /public/imagens e troque `src: null` pelo caminho,
 * ex.: src: "/imagens/conversa.jpg". Enquanto for null, aparece um espaço reservado.
 */
import { PERFIL_DEMO } from "./config";

export const ROTEIRO_HERO = [
  { estado: "falando", autor: "lumi", texto: `Bom dia, ${PERFIL_DEMO.nome}! Dormiu bem?`, ms: 3200 },
  { estado: "ouvindo", autor: "idosa", texto: "Dormi sim. Mas hoje estou meio sem ânimo.", ms: 2800 },
  { estado: "pensando", autor: "lumi", texto: "…", ms: 1400 },
  { estado: "falando", autor: "lumi", texto: "Que tal alongar os braços comigo? São só cinco minutinhos.", ms: 3800 },
  { estado: "ouvindo", autor: "idosa", texto: "Vamos lá!", ms: 2000 },
  { estado: "falando", autor: "lumi", texto: "Depois, que tal ligar para a Ana? Faz uns dias que vocês não conversam.", ms: 4200 },
];

export const PROBLEMA = {
  titulo: "Muitos idosos passam boa parte do dia sozinhos",
  paragrafos: [
    "Os filhos trabalham, os netos moram longe, os amigos já não estão tão perto. O dia fica longo, a conversa fica curta e o corpo vai ficando parado.",
    "Do outro lado, a família se preocupa, mas nem sempre consegue acompanhar de perto. Muitas vezes só percebe que algo mudou quando a mudança já é grande.",
  ],
};

// Mosaico da seção do problema (a primeira foto é a maior).
export const FOTOS_SOZINHO = [
  { src: "/imagens/sozinha-janela.jpg", alt: "Senhora idosa sentada sozinha à mesa, perto da janela" },
  { src: "/imagens/sozinho-1.jpg", alt: "Senhor idoso sentado sozinho na poltrona, segurando uma xícara" },
  { src: "/imagens/sozinho-2.jpg", alt: "Senhor idoso de costas, sozinho num banco de praça" },
  { src: "/imagens/sozinho-3.jpg", alt: "Senhora almoçando sozinha, olhando pela janela" },
];

// Números grandes, todos do IBGE. Conferir nas publicações oficiais antes da apresentação.
export const DADOS = {
  titulo: "O Brasil está envelhecendo, e muita gente envelhece sozinha",
  numeros: [
    { valor: "32 mi", rotulo: "de brasileiros têm 60 anos ou mais", fonte: "IBGE, Censo 2022" },
    { valor: "+56%", rotulo: "de pessoas idosas em 12 anos, de 2010 a 2022", fonte: "IBGE, Censo 2022" },
    { valor: "15,6 mi", rotulo: "de pessoas moram sozinhas, e 41% delas são idosas", fonte: "IBGE, PNAD Contínua 2025" },
    { valor: "75 mi", rotulo: "de idosos previstos em 2070: quase 4 em cada 10 brasileiros", fonte: "IBGE, Projeções da População 2024" },
  ],
};

export const PILARES = [
  {
    titulo: "Companhia para conversar",
    texto: "A Lumi puxa conversa, pergunta como foi o dia, lembra dos assuntos favoritos e incentiva o contato com a família e os amigos.",
    foto: { src: "/imagens/conversa.jpg", alt: "Grupo de idosos conversando e rindo na sala de casa", descricao: "Idoso conversando e sorrindo, em casa" },
  },
  {
    titulo: "Exercícios leves, no ritmo de cada um",
    texto: "Ela propõe movimentos simples, explica cada passo em voz alta e acompanha pela câmera, contando as repetições. Dá para parar a qualquer momento.",
    foto: { src: "/imagens/alongamento.jpg", alt: "Casal de idosos alongando os braços acima da cabeça, na sala", descricao: "Idosa fazendo alongamento sentada numa cadeira" },
  },
  {
    titulo: "A família por perto, mesmo longe",
    texto: "Filhos e netos acompanham as atividades num painel e recebem um aviso quando algo merece atenção, como vários dias sem exercício.",
    foto: { src: "/imagens/familia.jpg", alt: "Avós e neta olhando juntos a tela de um celular", descricao: "Avó com neto ou neta, juntos, olhando um celular" },
  },
];

// Seção de exercícios. A câmera só liga durante o exercício (regra do projeto):
// ela percebe mudanças no desempenho, não faz diagnóstico nem vigia a casa.
export const EXERCICIOS = {
  titulo: "Exercícios leves, com a Lumi contando junto",
  texto: "A Lumi propõe movimentos simples, explica cada passo em voz alta e acompanha pela câmera. Com o tempo, ela percebe quando o corpo começa a responder diferente.",
  passos: [
    { titulo: "Câmera só com permissão", texto: "Ela pede antes de ligar, mostra na tela que a câmera está ativa e o botão de parar fica sempre à vista." },
    { titulo: "Conta as repetições", texto: "A câmera reconhece os pontos do corpo e conta cada movimento. Não grava vídeo: só os números ficam guardados." },
    { titulo: "Percebe quando algo muda", texto: "Cada sessão é comparada com os dias anteriores da própria pessoa. Se as repetições caem muito ou os exercícios param, a família recebe um aviso." },
  ],
  aviso: "Não é diagnóstico: é um sinal para a família ligar, conversar e, se for o caso, procurar um profissional.",
  // Conferir as fontes antes da apresentação.
  dados: [
    { valor: "60%", rotulo: "dos idosos brasileiros não fazem a atividade física recomendada", fonte: "IBGE, PNS 2019" },
    { valor: "28%", rotulo: "das pessoas idosas sofrem ao menos uma queda por ano", fonte: "OMS, citada pelo Ministério da Saúde" },
    { valor: "23%", rotulo: "menos quedas entre idosos que fazem exercícios regulares", fonte: "Revisão Cochrane, 2019" },
  ],
};

export const COMO_FUNCIONA = [
  { titulo: "Câmera só nos exercícios", texto: "Acompanha os movimentos só durante os exercícios e só com permissão." },
  { titulo: "É só falar", texto: "Tocou na Lumi, pode conversar. Ela responde em voz alta, devagar e com clareza." },
  { titulo: "Letras grandes, poucos botões", texto: "Nada de menus escondidos: o que importa fica sempre à vista." },
];

export const PRIVACIDADE = {
  faz: [
    "Pede permissão antes de ligar a câmera",
    "Mostra na tela quando a câmera está ativa",
    "Envia à família apenas números: exercício, repetições, data",
    "No papo livre, manda à IA só a frase, sem nome, telefone ou documentos",
    "Sugere procurar alguém de confiança quando algo merece atenção",
  ],
  naoFaz: [
    "Não grava vídeo nem guarda imagens",
    "Não faz diagnóstico nem substitui médico",
    "Não substitui o contato com pessoas reais",
  ],
};

export const EQUIPE = [
  "Fabrício Zanzarine de Oliveira Leme",
  "Messias Macedo de Souza",
  "Ryan Romagnoli Santos",
  "João Pedro da Cruz",
  "Kaue Herculano Guimaraes de Barros",
];
