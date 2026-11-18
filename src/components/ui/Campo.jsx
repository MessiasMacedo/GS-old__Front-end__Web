// Campo com rótulo e, se houver, a mensagem de erro logo abaixo.
// aria-invalid + aria-describedby: o leitor de tela lê o erro junto com o campo.
export default function Campo({ rotulo, id, erro, ...props }) {
  const idErro = `${id}-erro`;
  return (
    <div className="flex flex-col gap-1 text-old-azul">
      <label htmlFor={id} className="font-bold">{rotulo}</label>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idErro : undefined}
        className={`rounded-xl border-2 bg-white px-3 py-2 text-lg focus:outline-none
          ${erro ? "border-red-700 focus:border-red-700" : "border-old-azul/30 focus:border-old-azul"}`}
        {...props}
      />
      {erro && <p id={idErro} className="font-bold text-red-700">{erro}</p>}
    </div>
  );
}
