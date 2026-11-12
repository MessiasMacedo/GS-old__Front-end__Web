import { useEffect, useState } from "react";
import { montarSaudacao } from "@/lib/saudacao";

/**
 * useSaudacao — devolve "Bom dia / Boa tarde / Boa noite", a hora e a data,
 * atualizando sozinho a cada 30 segundos.
 */
export function useSaudacao() {
  const [agora, setAgora] = useState(null);

  useEffect(() => {
    setAgora(new Date());
    const id = setInterval(() => setAgora(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!agora) return { saudacao: "Olá", hora: "", data: "" };
  return montarSaudacao(agora);
}
