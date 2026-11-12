/**
 * Logo OLD. O "O" é o halo da Lumi (anel + núcleo de luz verde):
 * a mesma forma aparece na personagem e no logo, e isso amarra a identidade.
 * Usa currentColor: azul sobre fundo claro, branco sobre azul.
 */
export default function Logo({ className = "" }) {
  return (
    <span role="img" aria-label="OLD" className={`inline-flex items-center font-extrabold leading-none tracking-wide ${className}`}>
      <svg viewBox="0 0 40 40" className="mr-[0.04em] h-[0.78em] w-[0.78em]" aria-hidden="true">
        <circle cx="20" cy="20" r="15.5" fill="none" stroke="currentColor" strokeWidth="7" />
        <circle cx="20" cy="20" r="6" fill="#76e67e" />
      </svg>
      <span aria-hidden="true">LD</span>
    </span>
  );
}
