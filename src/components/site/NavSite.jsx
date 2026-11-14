import { Link, useLocation } from "react-router";
import Logo from "@/components/ui/Logo";

// No celular não cabem os 3 nomes inteiros: "Início" some (o logo já leva para lá)
// e os outros usam o nome curto. Nada quebra em duas linhas.
const LINKS = [
  { href: "/", rotulo: "Início", soNoComputador: true },
  { href: "/lumi", rotulo: "Conheça a Lumi", curto: "A Lumi" },
  { href: "/familia", rotulo: "Painel da família", curto: "Família" },
];

export default function NavSite() {
  const atual = useLocation().pathname;
  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-old-azul/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" aria-label="OLD, página inicial" className="text-3xl text-old-azul"><Logo /></Link>
        <ul className="flex gap-1 sm:gap-2">
          {LINKS.map(({ href, rotulo, curto = rotulo, soNoComputador }) => {
            const ativo = atual === href;
            return (
              <li key={href} className={soNoComputador ? "hidden sm:block" : undefined}>
                <Link
                  to={href}
                  aria-current={ativo ? "page" : undefined}
                  className={`block whitespace-nowrap rounded-full px-3 py-2 font-bold text-old-azul transition-colors sm:px-4
                    ${ativo ? "bg-old-verde" : "hover:bg-old-azul-claro"}`}
                >
                  <span className="sm:hidden">{curto}</span>
                  <span className="hidden sm:inline">{rotulo}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
