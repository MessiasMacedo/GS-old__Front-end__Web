import { useState } from "react";
import PainelSecao from "./PainelSecao";
import EstadoLista from "./EstadoLista";
import FormContato from "./FormContato";
import Botao from "@/components/ui/Botao";

/**
 * CRUD de contatos. Recebe tudo do hook pela prop `colecao`:
 * este componente não sabe se os dados são fictícios ou do Supabase.
 */
export default function GerenciarContatos({ colecao }) {
  const { itens, carregando, erro, criar, atualizar, excluir } = colecao;
  const [editando, setEditando] = useState(null); // null | "novo" | id

  const salvar = async (dados) => {
    const ok = editando === "novo" ? await criar(dados) : await atualizar(editando, dados);
    if (ok) setEditando(null);
  };

  const remover = async (contato) => {
    if (window.confirm(`Remover ${contato.nome} dos contatos da Lumi?`)) await excluir(contato.id);
  };

  return (
    <PainelSecao
      titulo="Contatos da família"
      descricao="A Lumi usa esta lista para sugerir ligações."
      acao={editando === null && <Botao onClick={() => setEditando("novo")}>Adicionar contato</Botao>}
    >
      {editando === "novo" && (
        <div className="mb-4"><FormContato onSalvar={salvar} onCancelar={() => setEditando(null)} /></div>
      )}
      <EstadoLista carregando={carregando} erro={erro} vazio={itens.length === 0}
        mensagemVazio="Nenhum contato ainda. Adicione alguém que a Lumi possa sugerir para uma ligação.">
        <ul className="flex flex-col gap-3">
          {itens.map((c) =>
            editando === c.id ? (
              <li key={c.id}>
                <FormContato inicial={c} onSalvar={salvar} onCancelar={() => setEditando(null)} />
              </li>
            ) : (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl ring-1 ring-old-azul/10 px-4 py-3 text-old-azul">
                <span>
                  <span className="block text-lg font-bold">{c.nome} <span className="font-normal">· {c.parentesco}</span></span>
                  <span className="text-old-azul/75">{c.telefone}</span>
                </span>
                <span className="flex gap-2">
                  <Botao variante="secundario" onClick={() => setEditando(c.id)}>Editar</Botao>
                  <Botao variante="perigo" onClick={() => remover(c)}>Excluir</Botao>
                </span>
              </li>
            )
          )}
        </ul>
      </EstadoLista>
    </PainelSecao>
  );
}
