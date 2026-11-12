import { Link } from "react-router";
import Logo from "@/components/ui/Logo";

/**
 * Topo da tela do tablet. O centro fica livre de propósito:
 * é onde está a câmera física do aparelho.
 */
export default function BarraTopo({ hora }) {
  return (
    <header className="relative flex items-center justify-between px-8 pt-5">
      <Link to="/" aria-label="OLD, página inicial" className="text-3xl text-old-azul"><Logo /></Link>
      <span className="rounded-full bg-white px-5 py-1.5 text-2xl font-bold tabular-nums text-old-azul shadow-sm ring-1 ring-old-azul/10">{hora}</span>
    </header>
  );
}
