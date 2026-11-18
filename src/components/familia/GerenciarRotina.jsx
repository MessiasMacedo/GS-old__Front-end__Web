import { useState } from "react";
import PainelSecao from "./PainelSecao";
import EstadoLista from "./EstadoLista";
import FormExercicio from "./FormExercicio";
import Botao from "@/components/ui/Botao";

export default function GerenciarRotina({ colecao }) {
  const { itens, carregando, erro, criar, atualizar, excluir } = colecao;
  const [editando, setEditando] = useState(null);

  const salvar = async (dados) => {
    const ok = editando === "novo" ? await criar(dados) : await atualizar(editando, dados);
    if (ok) setEditando(null);
  };

  return (
    <PainelSecao
      titulo="Rotina de exercícios"
      descricao="O que a Lumi vai propor. Exercícios pausados não aparecem para o idoso."
      acao={editando === null && <Botao onClick={() => setEditando("novo")}>Adicionar exercício</Botao>}
    >
      {editando === "novo" && (
        <div className="mb-4"><FormExercicio outros={itens} onSalvar={salvar} onCancelar={() => setEditando(null)} /></div>
      )}
      <EstadoLista carregando={carregando} erro={erro} vazio={itens.length === 0}
        mensagemVazio="Nenhum exercício na rotina. Adicione o primeiro.">
        <ul className="flex flex-col gap-3">
          {itens.map((r) =>
            editando === r.id ? (
              <li key={r.id}><FormExercicio outros={itens.filter((x) => x.id !== editando)} inicial={r} onSalvar={salvar} onCancelar={() => setEditando(null)} /></li>
            ) : (
              <li key={r.id} className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-old-azul-claro/50 px-4 py-3 text-old-azul ${r.ativo ? "" : "opacity-60"}`}>
                <span>
                  <span className="block text-lg font-bold">{r.nome}</span>
                  <span className="text-old-azul/75">{r.repeticoes} repetições · {r.ativo ? "ativo" : "pausado"}</span>
                </span>
                <span className="flex flex-wrap gap-2">
                  <Botao variante="secundario" onClick={() => atualizar(r.id, { ativo: !r.ativo })}>
                    {r.ativo ? "Pausar" : "Ativar"}
                  </Botao>
                  <Botao variante="secundario" onClick={() => setEditando(r.id)}>Editar</Botao>
                  <Botao variante="perigo" onClick={() => window.confirm(`Excluir "${r.nome}"?`) && excluir(r.id)}>Excluir</Botao>
                </span>
              </li>
            )
          )}
        </ul>
      </EstadoLista>
    </PainelSecao>
  );
}
