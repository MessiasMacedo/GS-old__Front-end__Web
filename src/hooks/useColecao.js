import { useCallback, useEffect, useState } from "react";

/**
 * useColecao — liga um service (listar/criar/atualizar/excluir) ao estado da tela.
 * Cuida de carregando, erro e de manter a lista atualizada após cada operação.
 * Funciona com qualquer service que siga o contrato, fictício ou Supabase.
 */
export function useColecao(service) {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const executar = useCallback(async (operacao) => {
    setErro(null);
    try {
      return await operacao();
    } catch (e) {
      setErro(e.message || "Não foi possível concluir. Tente de novo.");
      return null;
    }
  }, []);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    const lista = await executar(() => service.listar());
    if (lista) setItens(lista);
    setCarregando(false);
  }, [service, executar]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const criar = useCallback(
    async (dados) => {
      const novo = await executar(() => service.criar(dados));
      if (novo) setItens((atual) => [...atual, novo]);
      return novo;
    },
    [service, executar]
  );

  const atualizar = useCallback(
    async (id, dados) => {
      const salvo = await executar(() => service.atualizar(id, dados));
      if (salvo) setItens((atual) => atual.map((i) => (i.id === id ? salvo : i)));
      return salvo;
    },
    [service, executar]
  );

  const excluir = useCallback(
    async (id) => {
      const ok = await executar(async () => {
        await service.excluir(id);
        return true;
      });
      if (ok) setItens((atual) => atual.filter((i) => i.id !== id));
      return ok;
    },
    [service, executar]
  );

  return { itens, carregando, erro, recarregar, criar, atualizar, excluir };
}
