import { useCallback, useEffect, useRef, useState } from "react";
import { useVoz } from "./useVoz";
import { respostaLocal } from "@/lib/respostaLocal";

const BOAS_VINDAS = "Olá! Que bom ter você aqui. Como posso ajudar hoje?";

/**
 * useConversa — regra de negócio da conversa: ouvir, decidir a resposta, falar.
 * A tela só chama ouvir/dizer e mostra os textos.
 * Na etapa 2, `responder` passa a chamar a IA; a tela não muda.
 */
export function useConversa({ responder = respostaLocal } = {}) {
  const [falaUsuario, setFalaUsuario] = useState("");
  const [falaLumi, setFalaLumi] = useState(BOAS_VINDAS);
  const falarRef = useRef(null);

  const aoOuvir = useCallback(
    async (texto) => {
      setFalaUsuario(texto);
      const resposta = await responder(texto);
      setFalaLumi(resposta);
      falarRef.current?.(resposta);
    },
    [responder]
  );

  const voz = useVoz({ aoOuvir });

  useEffect(() => {
    falarRef.current = voz.falar;
  }, [voz.falar]);

  // A Lumi fala por iniciativa própria (ex.: ao tocar num botão)
  const dizer = useCallback(
    (texto) => {
      setFalaUsuario("");
      setFalaLumi(texto);
      voz.falar(texto);
    },
    [voz.falar]
  );

  return { ...voz, falaUsuario, falaLumi, dizer };
}
