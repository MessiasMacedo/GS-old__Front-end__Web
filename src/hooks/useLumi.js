import { useCallback, useRef, useState } from "react";
import { useConversa } from "./useConversa";
import { acharContato, detectarIntencao, juntarNomes, limparDadosPessoais } from "@/lib/intencoes";
import { respostaLocal, RESPOSTA_SEGURANCA } from "@/lib/respostaLocal";
import { tipoDeMovimento } from "@/lib/movimento";
import * as sessoesService from "@/services/sessoesService";
import * as iaService from "@/services/iaService";

// ponytail: "avisar a família" ainda é só fala e tela. O aviso de verdade precisa de um
// alertasService no contrato com a API (Supabase); combinar com a parte do banco.
const CHAMAR_AJUDA = "Não estou vendo você se mexer. Vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.";

const convite = (ex) =>
  `Que bom! Fico muito feliz de ouvir isso. Vamos começar com ${ex.nome.toLowerCase()}, ${ex.repeticoes} vezes. ` +
  (tipoDeMovimento(ex.nome)
    ? "Fique de frente para a câmera, com o corpo inteiro aparecendo, da cabeça aos pés."
    : "Esse eu ainda não sei conferir pela câmera, então toque em Fiz mais uma a cada vez.");

// Pergunta de sim ou não: devolve null para qualquer outra resposta (aí a fala segue o fluxo normal)
const simOuNao = ({ sim, nao }) => (intencao) => (intencao === "sim" ? sim() : intencao === "nao" ? nao() : null);

/**
 * useLumi — o cérebro da tela do tablet (camada 1, local).
 * Guarda em que modo a Lumi está e qual pergunta ela deixou no ar, e decide
 * o que fazer com cada fala. A tela só mostra e chama estas funções.
 *
 * modo: "conversa" | "exercicio" | "demonstracao" | "familia"
 */
export function useLumi({ sugestao, contatos = [] }) {
  const [modo, setModo] = useState("conversa");
  const [exercicio, setExercicio] = useState(null);
  const [ligandoPara, setLigandoPara] = useState(null);
  const [alerta, setAlerta] = useState(false);
  // Pergunta no ar: (intencao, texto) => resposta | null. Dá sentido a "sim", "não" e "a Ana".
  const pendenteRef = useRef(null);
  // Camada 2: últimas trocas com a IA (contexto) e se foi ela quem falou por último
  const historicoIaRef = useRef([]);
  const iaFalouPorUltimoRef = useRef(false);

  const voltarParaConversa = useCallback(() => {
    setModo("conversa");
    setExercicio(null);
    setLigandoPara(null);
  }, []);

  // ---------- Família: os contatos vêm do CRUD do painel ----------
  const ligar = useCallback((contato) => {
    setModo("familia");
    setLigandoPara(contato);
    return `Ligando para ${contato.nome}${contato.parentesco ? `, ${contato.parentesco.toLowerCase()}` : ""}.`;
  }, []);

  const perguntarQuem = useCallback(() => {
    if (contatos.length === 0)
      return "Ainda não tem ninguém na sua lista. A sua família pode cadastrar os contatos pelo painel.";
    setModo("familia");
    setLigandoPara(null);
    const escolher = (intencao, texto) => {
      if (intencao === "nao") {
        voltarParaConversa();
        return "Tudo bem! Quando quiser falar com alguém, é só me chamar.";
      }
      const contato = acharContato(texto, contatos);
      if (contato) return ligar(contato);
      pendenteRef.current = escolher; // não entendeu o nome: pergunta de novo
      return { texto: `Não achei esse nome. Quer ligar para ${juntarNomes(contatos)}?`, perguntar: true };
    };
    pendenteRef.current = escolher;
    return { texto: `Para quem você quer ligar? ${juntarNomes(contatos)}?`, perguntar: true };
  }, [contatos, ligar, voltarParaConversa]);

  // ---------- O que fazer com cada fala ----------
  // Camada 2: só para o que a camada 1 não sabe responder. Sem internet, sem cota ou
  // demorando mais de 6 s, a Lumi usa a frase local: ela nunca fica muda.
  const conversarComIa = useCallback(async (texto) => {
    try {
      const { texto: resposta } = await iaService.responder({
        texto: limparDadosPessoais(texto),
        historico: historicoIaRef.current,
      });
      historicoIaRef.current = [
        ...historicoIaRef.current,
        { papel: "pessoa", texto: limparDadosPessoais(texto) },
        { papel: "lumi", texto: resposta },
      ].slice(-6); // ponytail: 3 trocas de contexto bastam para papo curto
      iaFalouPorUltimoRef.current = true;
      return resposta;
    } catch (e) {
      console.warn("IA indisponível, usando a resposta local:", e.message);
      return respostaLocal(texto);
    }
  }, []);

  const responder = useCallback(
    async (texto) => {
      const intencao = detectarIntencao(texto);
      const pendente = pendenteRef.current;
      pendenteRef.current = null;
      const continuaPapoComIa = iaFalouPorUltimoRef.current;
      iaFalouPorUltimoRef.current = false;

      if (intencao === "seguranca") {
        setAlerta(true);
        pendenteRef.current = simOuNao({
          sim: () => "Certo, vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.",
          nao: () => "Tudo bem. Estou aqui do seu lado se precisar.",
        });
        return { texto: RESPOSTA_SEGURANCA, perguntar: true };
      }

      const resposta = pendente?.(intencao, texto);
      if (resposta) return resposta;

      if (intencao === "familia") {
        // "liga pra Ana" já diz quem; "quero falar com a família" ainda não
        const contato = acharContato(texto, contatos);
        return contato ? ligar(contato) : perguntarQuem();
      }
      if (intencao === "exercicio") {
        if (!sugestao) return "Ainda não tem exercício na sua rotina. A sua família pode montar uma pelo painel.";
        setExercicio(sugestao);
        setModo("exercicio");
        return convite(sugestao);
      }
      if (intencao === "demonstracao") {
        setExercicio(null);
        setModo("demonstracao");
        return "Modo demonstração. Vou ligar a câmera só para mostrar como eu percebo uma queda. Fique com o corpo inteiro aparecendo, da cabeça aos pés.";
      }
      // "conversa" = nada reconhecido. "sim"/"não" logo depois de uma pergunta da IA também vão para ela.
      if (intencao === "conversa" || (continuaPapoComIa && (intencao === "sim" || intencao === "nao")))
        return conversarComIa(texto);
      return respostaLocal(texto);
    },
    [sugestao, contatos, ligar, perguntarQuem, conversarComIa]
  );

  const conversa = useConversa({ responder });
  const { dizer } = conversa;

  const abrirFamilia = useCallback(() => dizer(perguntarQuem()), [dizer, perguntarQuem]);

  const ligarPara = useCallback((contato) => dizer(ligar(contato)), [dizer, ligar]);

  const desligar = useCallback(() => {
    pendenteRef.current = null;
    voltarParaConversa();
    dizer("Que bom que vocês se falaram! Quando quiser, é só me chamar.");
  }, [voltarParaConversa, dizer]);

  const sairDaFamilia = useCallback(() => {
    pendenteRef.current = null;
    voltarParaConversa();
    dizer("Tudo bem! Quando quiser falar com alguém, é só me chamar.");
  }, [voltarParaConversa, dizer]);

  // ---------- Exercício ----------
  const comecarExercicio = useCallback(
    (ex) => {
      setExercicio(ex);
      setModo("exercicio");
      dizer(convite(ex));
    },
    [dizer]
  );

  const terminarExercicio = useCallback(
    async (feitas) => {
      const ex = exercicio;
      voltarParaConversa();
      if (!ex) return dizer("Pronto, desliguei a câmera.");

      let texto =
        feitas >= ex.repeticoes ? `Muito bem! Você fez as ${feitas}. Fiquei orgulhosa!`
        : feitas > 0 ? `Tudo bem, paramos por aqui. Você fez ${feitas}, e isso já conta!`
        : "Tudo bem, fica para outra hora.";
      if (feitas > 0) {
        try {
          await sessoesService.criar({ exercicio: ex.nome, repeticoes: feitas });
          texto += " Sua família vai ver no painel.";
        } catch {
          texto += " Só não consegui guardar agora.";
        }
      }
      dizer(texto);
    },
    [exercicio, voltarParaConversa, dizer]
  );

  // Eventos que vêm da câmera (useExercicio)
  const aoRepetir = useCallback(
    (n) => (n >= exercicio.repeticoes ? terminarExercicio(n) : dizer(String(n))),
    [exercicio, terminarExercicio, dizer]
  );

  // Queda vista OU pessoa que sumiu por baixo da imagem: a câmera não tem certeza, então a
  // Lumi PERGUNTA e abre o microfone. Sem resposta, o detector chama ajuda sozinho
  // (sem movimento por 8 s, ou 15 s sumida).
  const perguntarSeEstaBem = useCallback((pergunta) => {
    pendenteRef.current = simOuNao({
      sim: () => {
        voltarParaConversa();
        return "Que alívio! Vamos parar por hoje. Levante devagar e descanse um pouco.";
      },
      nao: () => {
        setAlerta(true);
        return "Fique onde está. Vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.";
      },
    });
    dizer({ texto: pergunta, perguntar: true });
  }, [voltarParaConversa, dizer]);

  const aoCair = useCallback(() => perguntarSeEstaBem("Parece que você caiu. Você está bem?"), [perguntarSeEstaBem]);
  const aoSumir = useCallback(() => perguntarSeEstaBem("Não estou mais te vendo. Você está bem?"), [perguntarSeEstaBem]);
  const aoEnquadrar = useCallback(
    () => dizer(exercicio ? "Pronto, já vejo você da cabeça aos pés. Pode começar!" : "Pronto, já vejo você da cabeça aos pés."),
    [exercicio, dizer]
  );

  const aoFicarParado = useCallback(() => {
    pendenteRef.current = null;
    setAlerta(true);
    dizer(CHAMAR_AJUDA);
  }, [dizer]);

  const fecharAlerta = useCallback(() => {
    setAlerta(false);
    voltarParaConversa();
    dizer("Que bom que você está bem! Se precisar, é só me chamar.");
  }, [voltarParaConversa, dizer]);

  return {
    ...conversa,
    modo, exercicio, ligandoPara, alerta,
    abrirFamilia, ligarPara, desligar, sairDaFamilia,
    comecarExercicio, terminarExercicio, aoRepetir, aoCair, aoSumir, aoEnquadrar, aoFicarParado, fecharAlerta,
  };
}
