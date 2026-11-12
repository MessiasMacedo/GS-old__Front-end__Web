export default function ListaAlertas({ alertas }) {
  if (alertas.length === 0)
    return <p className="rounded-2xl bg-old-verde-claro px-4 py-3 text-old-azul">Tudo tranquilo por aqui.</p>;
  return (
    <ul className="flex flex-col gap-3">
      {alertas.map((a) => (
        <li key={a.id} className="rounded-2xl border-l-8 border-old-azul bg-old-azul-claro px-4 py-3 text-old-azul">
          <p className="font-bold">{a.titulo}</p>
          <p>{a.detalhe}</p>
        </li>
      ))}
    </ul>
  );
}
