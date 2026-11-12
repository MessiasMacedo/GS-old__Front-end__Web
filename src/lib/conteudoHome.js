/**
 * Textos e imagens da Home num lugar só.
 * FOTOS: coloque os arquivos em /public/imagens e troque `src: null` pelo caminho,
 * ex.: src: "/imagens/conversa.jpg". Enquanto for null, aparece um espaço reservado.
 */
export const ROTEIRO_HERO = [
  { estado: "falando", autor: "lumi", texto: "Bom dia, Dona Maria! Dormiu bem?", ms: 3200 },
  { estado: "ouvindo", autor: "idosa", texto: "Dormi sim. Mas estou meio parada hoje.", ms: 2800 },
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
  foto: { src: null, alt: "Senhora sentada sozinha perto da janela", descricao: "Idosa sozinha em casa, perto da janela, luz natural" },
};

export const PILARES = [
  {
    titulo: "Companhia para conversar",
    texto: "A Lumi puxa conversa, pergunta como foi o dia, lembra dos assuntos favoritos e incentiva o contato com a família e os amigos.",
    foto: { src: null, alt: "Senhor conversando sorrindo", descricao: "Idoso conversando e sorrindo, em casa" },
  },
  {
    titulo: "Exercícios leves, no ritmo de cada um",
    texto: "Ela propõe movimentos simples, explica cada passo em voz alta e acompanha pela câmera, contando as repetições. Dá para parar a qualquer momento.",
    foto: { src: null, alt: "Idosa alongando os braços sentada numa cadeira", descricao: "Idosa fazendo alongamento sentada numa cadeira" },
  },
  {
    titulo: "A família por perto, mesmo longe",
    texto: "Filhos e netos acompanham as atividades num painel e recebem um aviso quando algo merece atenção, como vários dias sem exercício.",
    foto: { src: null, alt: "Avó e neta olhando um celular juntas", descricao: "Avó com neto ou neta, juntos, olhando um celular" },
  },
];

export const APARELHO = [
  { titulo: "Câmera no topo", texto: "Acompanha os movimentos só durante os exercícios e só com permissão." },
  { titulo: "Microfone e alto-falante", texto: "É só tocar na Lumi e falar. Ela responde em voz alta, devagar e com clareza." },
  { titulo: "Tela grande de toque", texto: "Letras grandes, poucos botões e nada de menus escondidos." },
];

export const PRIVACIDADE = {
  faz: [
    "Pede permissão antes de ligar a câmera",
    "Mostra na tela quando a câmera está ativa",
    "Envia à família apenas números: exercício, repetições, data",
    "Sugere procurar alguém de confiança quando algo merece atenção",
  ],
  naoFaz: [
    "Não grava vídeo nem guarda imagens",
    "Não faz diagnóstico nem substitui médico",
    "Não fica vigiando: a câmera só liga nos exercícios",
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
