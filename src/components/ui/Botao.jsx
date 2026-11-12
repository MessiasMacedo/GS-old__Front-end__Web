const VARIANTES = {
  primario: "bg-old-azul text-white hover:bg-old-azul/90",
  secundario: "bg-white text-old-azul ring-2 ring-inset ring-old-azul hover:bg-old-azul-claro",
  perigo: "bg-white text-red-700 ring-2 ring-inset ring-red-700 hover:bg-red-50",
};

export default function Botao({ variante = "primario", className = "", ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl px-4 py-2.5 font-bold transition-colors disabled:opacity-50 ${VARIANTES[variante]} ${className}`}
      {...props}
    />
  );
}
