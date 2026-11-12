import { useState } from "react";
import Campo from "@/components/ui/Campo";
import Botao from "@/components/ui/Botao";

const VAZIO = { nome: "", repeticoes: 10, ativo: true };

export default function FormExercicio({ inicial = VAZIO, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [salvando, setSalvando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    await onSalvar({ ...dados, repeticoes: Number(dados.repeticoes) });
    setSalvando(false);
  };

  return (
    <form onSubmit={enviar} className="grid gap-3 rounded-2xl bg-old-ciano-claro p-4 sm:grid-cols-[2fr_1fr]">
      <Campo id="exercicio" rotulo="Exercício" value={dados.nome}
        onChange={(e) => setDados({ ...dados, nome: e.target.value })} required />
      <Campo id="repeticoes" rotulo="Repetições" type="number" min={1} max={50} value={dados.repeticoes}
        onChange={(e) => setDados({ ...dados, repeticoes: e.target.value })} required />
      <div className="flex gap-2 sm:col-span-2">
        <Botao type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Salvar exercício"}</Botao>
        <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
      </div>
    </form>
  );
}
