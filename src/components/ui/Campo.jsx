export default function Campo({ rotulo, id, ...props }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-old-azul">
      <span className="font-bold">{rotulo}</span>
      <input
        id={id}
        className="rounded-xl border-2 border-old-azul/30 px-3 py-2 text-lg focus:border-old-azul focus:outline-none"
        {...props}
      />
    </label>
  );
}
