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
  const estado = useRef({ fase: null, total: 0, corpo: "ok", amostras: [], ultimoVisto: 0 });
  const avisos = useRef({});

  useEffect(() => {
    avisos.current = { aoRepetir, aoCair, aoFicarParado };
  });

  const mudarCorpo = useCallback((s, novoCorpo) => {
    if (novoCorpo === s.corpo) return;
    s.corpo = novoCorpo;
    setCorpo(novoCorpo);
    if (novoCorpo === "caiu") avisos.current.aoCair?.();
    if (novoCorpo === "parado") avisos.current.aoFicarParado?.();
  }, []);

  const aoDetectar = useCallback(
    (pontos, t) => {
      const s = estado.current;
      if (!pontos) {
        // Ninguém na câmera. Se a pessoa caiu e sumiu da imagem (rolou para fora,
        // ficou atrás de um móvel), não dá para esperar ela aparecer: chama ajuda igual.
        if (s.corpo === "caiu" && t - s.ultimoVisto > AJUSTES.PARADO_MS) mudarCorpo(s, "parado");
        return;
      }
      s.ultimoVisto = t;

      s.amostras.push(amostraDoCorpo(pontos, t));
      while (s.amostras[0].t < t - MEMORIA_MS) s.amostras.shift();

      const novoCorpo = estadoDoCorpo(s.corpo, s.amostras);
      mudarCorpo(s, novoCorpo);

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
    [exercicio, mudarCorpo]
  );

  // Para exercício que a câmera ainda não sabe conferir: a pessoa conta tocando na tela
  const contarNaMao = useCallback(() => {
    const s = estado.current;
    if (!exercicio || s.total >= exercicio.repeticoes) return;
    s.total += 1;
    setTotal(s.total);
    avisos.current.aoRepetir?.(s.total);
  }, [exercicio]);

  return { total, corpo, aoDetectar, contarNaMao };
}
