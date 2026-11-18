// Perfil de demonstração. Na versão com login, vem do cadastro do idoso.
// Trocar pela URL: /lumi?perfil=francisco (o navegador lembra). ?perfil=maria volta ao padrão.
const PERFIS = {
  maria: { nome: "Dona Maria" },
  francisco: { nome: "Francisco" },
};

function escolherPerfil() {
  try {
    const pedido = new URLSearchParams(window.location.search).get("perfil");
    if (pedido && PERFIS[pedido]) localStorage.setItem("perfil", pedido);
    return PERFIS[localStorage.getItem("perfil")] ?? PERFIS.maria;
  } catch {
    return PERFIS.maria; // sem localStorage (aba anônima, bloqueado): fica o padrão
  }
}

export const PERFIL_DEMO = escolherPerfil();
