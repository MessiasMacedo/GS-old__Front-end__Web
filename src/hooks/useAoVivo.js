import { useEffect, useRef, useState } from "react";
import { ouvirInsercoes } from "@/lib/supabase";

/**
 * useAoVivo — fica escutando linhas novas numa tabela do banco.
 * Ex.: a Lumi grava uma sessão no tablet e o painel da família atualiza sozinho.
 * Devolve `true` enquanto a escuta estiver ligada (para mostrar "Ao vivo").
 */
export function useAoVivo(tabela, aoInserir) {
  const [aoVivo, setAoVivo] = useState(false);
  const aoInserirRef = useRef(aoInserir);

  useEffect(() => {
    aoInserirRef.current = aoInserir;
  });

  useEffect(() => ouvirInsercoes(tabela, (nova) => aoInserirRef.current?.(nova), setAoVivo), [tabela]);

  return aoVivo;
}
