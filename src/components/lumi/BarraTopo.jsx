import { Link } from "react-router";

/**
 * Topo da tela do tablet. O centro fica livre de propósito:
 * é onde está a câmera física do aparelho.
 */
export default function BarraTopo({ hora }) {
  return (
    <header className="flex items-center justify-between px-8 pt-5">
      <Link to="/" className="text-2xl font-bold tracking-wide text-old-azul">OLD</Link>
      <span className="text-2xl font-bold tabular-nums text-old-azul">{hora}</span>
    </header>
  );
}
