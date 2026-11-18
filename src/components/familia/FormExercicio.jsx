import { useRef, useState } from "react";
import Campo from "@/components/ui/Campo";
import Botao from "@/components/ui/Botao";
import { REPETICOES_MAX, validarExercicio } from "@/lib/validacao";

const VAZIO = { nome: "", repeticoes: 10, ativo: true };
const ID_DO_CAMPO = { nome: "exercicio", repeticoes: "repeticoes" };

// `outros`: exercícios que já estão na rotina, para não repetir o mesmo nome
export default function FormExercicio({ inicial = VAZIO, outros = [], onSalvar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const formRef = useRef(null);

  const mudar = (campo) => (e) => {
    setDados({ ...dados, [campo]: e.target.value });
    if (erros[campo]) setErros({ ...erros, [campo]: undefined });
  };

  const enviar = async (e) => {
    e.preventDefault();
    const { erros: novos, dados: limpos } = validarExercicio(dados, outros);
    setErros(novos);
    const primeiro = Object.keys(novos)[0];
    if (primeiro) return formRef.current.querySelector(`#${ID_DO_CAMPO[primeiro]}`)?.focus();
    setSalvando(true);
    await onSalvar(limpos);
    setSalvando(false);
  };

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="grid items-start gap-3 rounded-2xl bg-old-ciano-claro p-4 sm:grid-cols-[2fr_1fr]">
      <Campo id="exercicio" rotulo="Exercício" value={dados.nome} list="exercicios-da-camera"
        onChange={mudar("nome")} erro={erros.nome} required />
      {/* Sugestões nativas do navegador: os nomes que a câmera da Lumi sabe conferir */}
      <datalist id="exercicios-da-camera">
        <option value="Elevação dos braços" />
        <option value="Sentar e levantar da cadeira" />
      </datalist>
      <Campo id="repeticoes" rotulo="Repetições" type="number" inputMode="numeric" min={1} max={REPETICOES_MAX}
        value={dados.repeticoes} onChange={mudar("repeticoes")} erro={erros.repeticoes} required />
      <p className="text-old-azul/80 sm:col-span-2">
        A câmera confere sozinha <strong>elevação dos braços</strong> e <strong>sentar e levantar</strong>.
        Em outros exercícios, a pessoa conta tocando na tela.
      </p>
      <div className="flex gap-2 sm:col-span-2">
        <Botao type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Salvar exercício"}</Botao>
        <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
      </div>
    </form>
  );
}
