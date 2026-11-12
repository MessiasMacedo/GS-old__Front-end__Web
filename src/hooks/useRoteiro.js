import { useEffect, useState } from "react";

/**
 * useRoteiro — percorre uma lista de passos em loop, respeitando o tempo de cada um.
 * Usado na Home para a Lumi "se apresentar" sozinha.
 */
export function useRoteiro(passos) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const id = setTimeout(
      () => setIndice((i) => (i + 1) % passos.length),
      passos[indice].ms
    );
    return () => clearTimeout(id);
  }, [indice, passos]);

  return passos[indice];
}
