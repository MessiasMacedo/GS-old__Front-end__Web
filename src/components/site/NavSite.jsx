import { Link, useLocation } from "react-router";

const LINKS = [
  { href: "/", rotulo: "Início" },
  { href: "/lumi", rotulo: "Conheça a Lumi" },
  { href: "/familia", rotulo: "Painel da família" },
];

export default function NavSite() {
  const atual = useLocation().pathname;
  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-old-azul/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide text-old-azul">OLD</Link>
        <ul className="flex gap-1 sm:gap-2">
          {LINKS.map(({ href, rotulo }) => {
            const ativo = atual === href;
            return (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={ativo ? "page" : undefined}
                  className={`rounded-full px-3 sm:px-4 py-2 font-bold text-old-azul transition-colors
                    ${ativo ? "bg-old-verde" : "hover:bg-old-azul-claro"}`}
                >
                  {rotulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
