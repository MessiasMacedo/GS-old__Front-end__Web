/**
 * Foto com espaço reservado: enquanto não houver arquivo,
 * mostra a descrição da foto que deve entrar ali.
 */
export default function Foto({ src, alt, descricao, className = "" }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full items-end bg-gradient-to-br from-old-verde-claro via-old-ciano-claro to-old-azul-claro p-5 ${className}`}
    >
      <span className="rounded-lg bg-white/80 px-3 py-1.5 text-sm text-old-azul">Foto: {descricao}</span>
    </div>
  );
}
