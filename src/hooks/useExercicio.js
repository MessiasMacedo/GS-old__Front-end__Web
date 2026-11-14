import { useCallback, useEffect, useRef, useState } from "react";
import {
  AJUSTES, amostraDoCorpo, confianca, contarRepeticao, corpoInteiro, estadoDoCorpo,
  faseDoExercicio, fracaoDeitado, pessoaValida, sumiuDescendo, ultimos,
} from "@/lib/movimento";

const MEMORIA_MS = AJUSTES.PARADO_MS + 1000;
const DIAGNOSTICO_MS = 250; // atualiza os números da tela 4x por segundo, não 30

/**
 * useExercicio — liga os pontos do corpo (a cada quadro da câmera) às regras de
 * lib/movimento.js. Só avisa a tela quando algo MUDA (uma repetição, uma queda),
 * para não re-renderizar 30 vezes por segundo.
 * exercicio = null é o modo demonstração: só o detector de queda.
 *
 * corpo: "fora" (não vejo ninguém) | "ok" | "deitado" | "caiu" | "sumiu" (saiu por baixo) | "parado"
 * enquadrado: já viu a pessoa da cabeça aos pés (só então conta repetições)
 */
export function useExercicio({ exercicio, aoRepetir, aoCair, aoSumir, aoFicarParado, aoEnquadrar }) {
  const [total, setTotal] = useState(0);
  const [corpo, setCorpo] = useState("fora");
  const [enquadrado, setEnquadrado] = useState(false);
  const [diagnostico, setDiagnostico] = useState(null);
  const estado = useRef({
    fase: null, total: 0, corpo: "fora", amostras: [], ultimoVisto: 0,
    enquadrado: false, inteiroDesde: null, sumiuEm: 0, diagnosticoEm: 0,
  });
  const avisos = useRef({});

  useEffect(() => {
    avisos.current = { aoRepetir, aoCair, aoSumir, aoFicarParado, aoEnquadrar };
  });

  const mudarCorpo = useCallback((s, novoCorpo, t) => {
    if (novoCorpo === s.corpo) return;
    s.corpo = novoCorpo;
    setCorpo(novoCorpo);
    if (novoCorpo === "caiu") avisos.current.aoCair?.();
    if (novoCorpo === "parado") avisos.current.aoFicarParado?.();
    if (novoCorpo === "sumiu") {
      s.sumiuEm = t;
      avisos.current.aoSumir?.();
    }
  }, []);

  // Ninguém (ou só "pessoa fantasma") na imagem neste quadro
  const semPessoa = useCallback(
    (s, t) => {
      const sumidoHa = t - s.ultimoVisto;
      if ((s.corpo === "ok" || s.corpo === "deitado") && sumidoHa > AJUSTES.SUMIU_MS) {
        // Saiu por baixo = possível queda (a Lumi pergunta). Pelo lado = foi a algum lugar.
        mudarCorpo(s, sumiuDescendo(s.amostras) ? "sumiu" : "fora", t);
      } else if (s.corpo === "caiu" && sumidoHa > AJUSTES.PARADO_MS) {
        mudarCorpo(s, "parado", t); // caiu e rolou para fora da imagem
      } else if (s.corpo === "sumiu" && t - s.sumiuEm > AJUSTES.SUMIU_ALERTA_MS) {
        mudarCorpo(s, "parado", t); // sumiu por baixo, não voltou nem respondeu
      }
    },
    [mudarCorpo]
  );

  const aoDetectar = useCallback(
    (pontos, t) => {
      const s = estado.current;
      const valida = pontos && pessoaValida(pontos);

      if (t - s.diagnosticoEm > DIAGNOSTICO_MS) {
        s.diagnosticoEm = t;
        const janela = s.amostras.length ? ultimos(s.amostras, AJUSTES.PARADO_MS) : [];
        const ys = janela.map((a) => a.y);
        setDiagnostico({
          pessoa: Boolean(valida),
          confianca: pontos ? confianca(pontos) : 0,
          inteiro: Boolean(valida && corpoInteiro(pontos)),
          quadril: s.amostras.at(-1)?.y ?? null,
          deitado: s.amostras.length ? fracaoDeitado(ultimos(s.amostras, 1000)) : 0,
          movimento: ys.length ? Math.max(...ys) - Math.min(...ys) : null,
        });
      }

      if (!valida) return semPessoa(s, t);
      s.ultimoVisto = t;

      // Enquadramento: da cabeça aos pés por um instante, uma vez por sessão
      if (!s.enquadrado) {
        s.inteiroDesde = corpoInteiro(pontos) ? (s.inteiroDesde ?? t) : null;
        if (s.inteiroDesde !== null && t - s.inteiroDesde >= AJUSTES.ENQUADRAR_MS) {
          s.enquadrado = true;
          setEnquadrado(true);
          avisos.current.aoEnquadrar?.();
        }
      }

      s.amostras.push(amostraDoCorpo(pontos, t));
      while (s.amostras[0].t < t - MEMORIA_MS) s.amostras.shift();

      const novoCorpo = estadoDoCorpo(s.corpo, s.amostras);
      mudarCorpo(s, novoCorpo, t);

      // Conta só enquadrado, com o corpo bem e até a meta (evita salvar a sessão duas vezes)
      if (!exercicio || !s.enquadrado || novoCorpo !== "ok" || s.total >= exercicio.repeticoes) return;
      const proximo = contarRepeticao(s, faseDoExercicio(exercicio.nome, pontos));
      s.fase = proximo.fase;
      if (proximo.total !== s.total) {
        s.total = proximo.total;
        setTotal(proximo.total);
        avisos.current.aoRepetir?.(proximo.total);
      }
    },
    [exercicio, mudarCorpo, semPessoa]
  );

  // Para exercício que a câmera ainda não sabe conferir: a pessoa conta tocando na tela
  const contarNaMao = useCallback(() => {
    const s = estado.current;
    if (!exercicio || s.total >= exercicio.repeticoes) return;
    s.total += 1;
    setTotal(s.total);
    avisos.current.aoRepetir?.(s.total);
  }, [exercicio]);

  return { total, corpo, enquadrado, diagnostico, aoDetectar, contarNaMao };
}
