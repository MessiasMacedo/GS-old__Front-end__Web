// Lógica pura (sem React): fácil de testar e reutilizar.
export function montarSaudacao(data) {
  const h = data.getHours();
  const saudacao = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";

  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const dia = data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return { saudacao, hora, data: dia.charAt(0).toUpperCase() + dia.slice(1) };
}
