import { useCallback, useEffect, useRef, useState } from "react";
import { useVoz } from "./useVoz";
import { respostaLocal } from "@/lib/respostaLocal";

const BOAS_VINDAS = "Olá! Que bom ter você aqui. Como posso ajudar hoje?";

/**
 * useConversa — regra de negócio da conversa: ouvir, decidir a resposta, falar.
 * `responder` devolve um texto ou { texto, perguntar }. Com `perguntar`, a Lumi
 * abre o microfone sozinha quando termina de falar: a pessoa só responde.
 */
export function useConversa({ responder = respostaLocal } = {}) {
  const [falaUsuario, setFalaUsuario] = useState("");
  const [falaLumi, setFalaLumi] = useState(BOAS_VINDAS);
  const vozRef = useRef(null);

  // A Lumi fala: em resposta a alguém ou por iniciativa própria (botão, exercício)
  const dizer = useCallback((resposta, usuario = "") => {
    const { texto, perguntar } = typeof resposta === "string" ? { texto: resposta } : resposta;
    setFalaUsuario(usuario);
    setFalaLumi(texto);
    vozRef.current?.falar(texto, perguntar ? vozRef.current.ouvir : undefined);
  }, []);

  const aoOuvir = useCallback(
    async (texto) => {
      setFalaUsuario(texto);
      dizer(await responder(texto), texto);
    },
    [responder, dizer]
  );

  const voz = useVoz({ aoOuvir });

  useEffect(() => {
    vozRef.current = voz;
  });

  return { ...voz, falaUsuario, falaLumi, dizer };
}
