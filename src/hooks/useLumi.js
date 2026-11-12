import { useCallback, useRef, useState } from "react";
import { useConversa } from "./useConversa";
import { detectarIntencao } from "@/lib/intencoes";
import { respostaLocal, RESPOSTA_SEGURANCA } from "@/lib/respostaLocal";
import * as sessoesService from "@/services/sessoesService";

// ponytail: "avisar a família" ainda é só fala e tela. O aviso de verdade precisa de um
// alertasService no contrato com a API (Supabase); combinar com a parte do banco.
const CHAMAR_AJUDA = "Não estou vendo você se mexer. Vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.";

const convite = (ex) =>
  `Que bom! Fico muito feliz de ouvir isso. Vamos começar com ${ex.nome.toLowerCase()}, ${ex.repeticoes} vezes. Fique de frente para a câmera.`;

/**
 * useLumi — o cérebro da tela do tablet (camada 1, local).
 * Guarda em que modo a Lumi está e qual pergunta ela deixou no ar, e decide
 * o que fazer com cada fala. A tela só mostra e chama estas funções.
 *
 * modo: "conversa" | "exercicio" | "demonstracao"
 */
export function useLumi({ sugestao }) {
  const [modo, setModo] = useState("conversa");
  const [exercicio, setExercicio] = useState(null);
  const [alerta, setAlerta] = useState(false);
  // Pergunta no ar: { sim: () => resposta, nao: () => resposta }. Dá sentido ao "sim" e ao "não".
  const pendenteRef = useRef(null);

  const voltarParaConversa = useCallback(() => {
    setModo("conversa");
    setExercicio(null);
  }, []);

  const responder = useCallback(
    (texto) => {
      const intencao = detectarIntencao(texto);
      const pendente = pendenteRef.current;
      pendenteRef.current = null;

      if (intencao === "seguranca") {
        setAlerta(true);
        pendenteRef.current = {
          sim: () => "Certo, vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.",
          nao: () => "Tudo bem. Estou aqui do seu lado se precisar.",
        };
        return { texto: RESPOSTA_SEGURANCA, perguntar: true };
      }
      if (pendente && intencao === "sim") return pendente.sim();
      if (pendente && intencao === "nao") return pendente.nao();

      if (intencao === "exercicio") {
        if (!sugestao) return "Ainda não tem exercício na sua rotina. A sua família pode montar uma pelo painel.";
        setExercicio(sugestao);
        setModo("exercicio");
        return convite(sugestao);
      }
      if (intencao === "demonstracao") {
        setExercicio(null);
        setModo("demonstracao");
        return "Modo demonstração. Vou ligar a câmera só para mostrar como eu percebo uma queda.";
      }
      return respostaLocal(texto);
    },
    [sugestao]
  );

  const conversa = useConversa({ responder });
  const { dizer } = conversa;

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

  const aoCair = useCallback(() => {
    pendenteRef.current = {
      sim: () => {
        voltarParaConversa();
        return "Que alívio! Vamos parar por hoje. Levante devagar e descanse um pouco.";
      },
      nao: () => {
        setAlerta(true);
        return "Fique onde está. Vou avisar a sua família. Se for urgente, ligue para o SAMU, no 192.";
      },
    };
    dizer({ texto: "Parece que você caiu. Você está bem?", perguntar: true });
  }, [voltarParaConversa, dizer]);

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
    modo, exercicio, alerta,
    comecarExercicio, terminarExercicio, aoRepetir, aoCair, aoFicarParado, fecharAlerta,
  };
}
