import { useCallback, useEffect, useRef, useState } from "react";

// Vozes femininas em pt-BR, da mais natural para a menos. Cada navegador traz as suas:
// Edge (vozes neurais da Microsoft), Chrome (Google), iPad/Mac (Apple), Windows antigo.
const VOZES_PREFERIDAS = [/Francisca/i, /Thalita/i, /Google português/i, /Luciana/i, /Maria/i];

/**
 * useVoz —encapsula reconhecimento de fala e voz sintetizada (Web Speech API).
 * Os componentes só recebem estado e funções; não sabem nada da API do navegador.
 *
 * estado: "parada" | "ouvindo" | "pensando" | "falando"
 */
export function useVoz({ idioma = "pt-BR", aoOuvir } = {}) {
  const [estado, setEstado] = useState("parada");
  const [suportaOuvir, setSuportaOuvir] = useState(true);
  const [suportaFalar, setSuportaFalar] = useState(true);
  const [erro, setErro] = useState(null);

  const reconhecimentoRef = useRef(null);
  const vozRef = useRef(null);
  const aoOuvirRef = useRef(aoOuvir);

  // Mantém o callback mais recente sem recriar o reconhecimento
  useEffect(() => {
    aoOuvirRef.current = aoOuvir;
  }, [aoOuvir]);

  // Detecta suporte e prepara o reconhecimento uma única vez
  useEffect(() => {
    const Reconhecimento =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    setSuportaFalar("speechSynthesis" in window);

    if (!Reconhecimento) {
      setSuportaOuvir(false);
      return;
    }

    const rec = new Reconhecimento();
    rec.lang = idioma;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (evento) => {
      const texto = evento.results[0][0].transcript.trim();
      setEstado("pensando");
      aoOuvirRef.current?.(texto);
    };

    rec.onerror = (evento) => {
      const mensagens = {
        "not-allowed": "Preciso da sua permissão para usar o microfone.",
        "no-speech": "Não ouvi nada. Toque na Lumi e fale de novo.",
        "audio-capture": "Não encontrei um microfone neste aparelho.",
        network: "Estou sem internet agora. Tente de novo daqui a pouco.",
      };
      setErro(mensagens[evento.error] ?? "Algo deu errado ao ouvir. Tente de novo.");
      setEstado("parada");
    };

    rec.onend = () => {
      // Se terminou sem resultado, volta ao repouso
      setEstado((atual) => (atual === "ouvindo" ? "parada" : atual));
    };

    reconhecimentoRef.current = rec;

    // Escolhe a voz quando a lista carregar. A primeira em português costuma ser
    // uma voz antiga e robótica, então procuramos as femininas e naturais por nome.
    const escolherVoz = () => {
      const vozes = window.speechSynthesis?.getVoices() ?? [];
      const doIdioma = vozes.filter((v) => v.lang?.replace("_", "-") === idioma);
      vozRef.current =
        VOZES_PREFERIDAS.map((nome) => doIdioma.find((v) => nome.test(v.name))).find(Boolean) ??
        doIdioma[0] ??
        vozes.find((v) => v.lang?.startsWith("pt")) ??
        null;
    };
    escolherVoz();
    window.speechSynthesis?.addEventListener?.("voiceschanged", escolherVoz);

    return () => {
      rec.abort();
      window.speechSynthesis?.removeEventListener?.("voiceschanged", escolherVoz);
      window.speechSynthesis?.cancel();
    };
  }, [idioma]);

  const ouvir = useCallback(() => {
    if (!reconhecimentoRef.current) return;
    setErro(null);
    window.speechSynthesis?.cancel();
    try {
      reconhecimentoRef.current.start();
      setEstado("ouvindo");
    } catch {
      // start() lança erro se já estiver ouvindo; ignoramos
    }
  }, []);

  // aoTerminar: chamado quando a fala acaba (ex.: abrir o microfone depois de uma pergunta)
  const falar = useCallback(
    (texto, aoTerminar) => {
      if (!suportaFalar || !texto) {
        setEstado("parada");
        return;
      }
      window.speechSynthesis.cancel();
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = idioma;
      fala.rate = 0.92; // um pouco mais devagar: melhor compreensão
      if (vozRef.current) fala.voice = vozRef.current;
      fala.onstart = () => setEstado("falando");
      fala.onend = () => {
        setEstado("parada");
        aoTerminar?.();
      };
      fala.onerror = () => setEstado("parada");
      window.speechSynthesis.speak(fala);
    },
    [idioma, suportaFalar]
  );

  const parar = useCallback(() => {
    reconhecimentoRef.current?.abort();
    window.speechSynthesis?.cancel();
    setEstado("parada");
  }, []);

  return { estado, ouvir, falar, parar, erro, suportaOuvir, suportaFalar };
}
