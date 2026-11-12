import { useState } from "react";
import Campo from "@/components/ui/Campo";
import Botao from "@/components/ui/Botao";

const VAZIO = { nome: "", parentesco: "", telefone: "" };

export default function FormContato({ inicial = VAZIO, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [salvando, setSalvando] = useState(false);
  const mudar = (campo) => (e) => setDados({ ...dados, [campo]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    await onSalvar(dados);
    setSalvando(false);
  };

  return (
    <form onSubmit={enviar} className="grid gap-3 rounded-2xl bg-old-azul-claro p-4 sm:grid-cols-3">
      <Campo id="nome" rotulo="Nome" value={dados.nome} onChange={mudar("nome")} required />
      <Campo id="parentesco" rotulo="Parentesco" value={dados.parentesco} onChange={mudar("parentesco")} placeholder="Filha, neto…" required />
      <Campo id="telefone" rotulo="Telefone" type="tel" value={dados.telefone} onChange={mudar("telefone")} required />
      <div className="flex gap-2 sm:col-span-3">
        <Botao type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Salvar contato"}</Botao>
        <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
      </div>
    </form>
  );
}
