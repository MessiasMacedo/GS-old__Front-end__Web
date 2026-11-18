import { useRef, useState } from "react";
import Campo from "@/components/ui/Campo";
import Botao from "@/components/ui/Botao";
import { validarContato } from "@/lib/validacao";

const VAZIO = { nome: "", parentesco: "", telefone: "" };

// `outros`: contatos que já existem, para não cadastrar o mesmo telefone duas vezes
export default function FormContato({ inicial = VAZIO, outros = [], onSalvar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const formRef = useRef(null);

  const mudar = (campo) => (e) => {
    setDados({ ...dados, [campo]: e.target.value });
    if (erros[campo]) setErros({ ...erros, [campo]: undefined }); // some quando a pessoa corrige
  };

  const enviar = async (e) => {
    e.preventDefault();
    const { erros: novos, dados: limpos } = validarContato(dados, outros);
    setErros(novos);
    const primeiro = Object.keys(novos)[0];
    if (primeiro) return formRef.current.querySelector(`#${primeiro}`)?.focus();
    setSalvando(true);
    await onSalvar(limpos);
    setSalvando(false);
  };

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="grid items-start gap-3 rounded-2xl bg-old-azul-claro p-4 sm:grid-cols-3">
      <Campo id="nome" rotulo="Nome" value={dados.nome} onChange={mudar("nome")} erro={erros.nome}
        autoComplete="name" required />
      <Campo id="parentesco" rotulo="Parentesco" value={dados.parentesco} onChange={mudar("parentesco")} erro={erros.parentesco}
        placeholder="Filha, neto…" required />
      <Campo id="telefone" rotulo="Telefone com DDD" type="tel" inputMode="tel" autoComplete="tel" value={dados.telefone}
        onChange={mudar("telefone")} erro={erros.telefone} placeholder="(11) 98765-4321" required />
      <div className="flex gap-2 sm:col-span-3">
        <Botao type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Salvar contato"}</Botao>
        <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
      </div>
    </form>
  );
}
