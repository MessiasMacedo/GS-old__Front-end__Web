import { useCallback, useEffect, useRef, useState } from "react";
import { AJUSTES, amostraDoCorpo, contarRepeticao, estadoDoCorpo, faseDoExercicio } from "@/lib/movimento";

const MEMORIA_MS = AJUSTES.PARADO_MS + 1000;

/**
 * useExercicio — liga os pontos do corpo (a cada quadro da câmera) às regras de
 * lib/movimento.js. Só avisa a tela quando algo MUDA (uma repetição, uma queda),
 * para não re-renderizar 30 vezes por segundo.
 * exercicio = null é o modo demonstração: só o detector de queda.
 */
export function useExercicio({ exercicio, aoRepetir, aoCair, aoFicarParado }) {
  const [total, setTotal] = useState(0);
  const [corpo, setCorpo] = useState("ok");
  const estado = useRef({ fase: null, total: 0, corpo: "ok", amostras: [] });
  const avisos = useRef({});

  useEffect(() => {
    avisos.current = { aoRepetir, aoCair, aoFicarParado };
  });

  const aoDetectar = useCallback(
    (pontos, t) => {
      if (!pontos) return; // ninguém na frente da câmera neste quadro
      const s = estado.current;

      s.amostras.push(amostraDoCorpo(pontos, t));
      while (s.amostras[0].t < t - MEMORIA_MS) s.amostras.shift();

      const novoCorpo = estadoDoCorpo(s.corpo, s.amostras);
      if (novoCorpo !== s.corpo) {
        s.corpo = novoCorpo;
        setCorpo(novoCorpo);
        if (novoCorpo === "caiu") avisos.current.aoCair?.();
        if (novoCorpo === "parado") avisos.current.aoFicarParado?.();
      }

      // Conta só com o corpo bem e até a meta (evita salvar a sessão duas vezes)
      if (!exercicio || novoCorpo !== "ok" || s.total >= exercicio.repeticoes) return;
      const proximo = contarRepeticao(s, faseDoExercicio(exercicio.nome, pontos));
      s.fase = proximo.fase;
      if (proximo.total !== s.total) {
        s.total = proximo.total;
        setTotal(proximo.total);
        avisos.current.aoRepetir?.(proximo.total);
      }
    },
    [exercicio]
  );

  return { total, corpo, aoDetectar };
}
