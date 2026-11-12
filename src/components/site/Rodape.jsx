import { EQUIPE } from "@/lib/conteudoHome";
import Logo from "@/components/ui/Logo";

export default function Rodape() {
  return (
    <footer className="bg-old-azul text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
        <div>
          <Logo className="text-4xl" />
          <p className="mt-2 text-lg text-white/85">Envelhecer acompanhado, viver com autonomia.</p>
          <p className="mt-6 text-white/70">Projeto acadêmico · Global Solution 2026 · FIAP</p>
        </div>
        <div>
          <p className="font-bold">Equipe OLD</p>
          <ul className="mt-2 space-y-1 text-white/85">
            {EQUIPE.map((nome) => <li key={nome}>{nome}</li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
