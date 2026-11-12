import { Outlet } from "react-router";
import NavSite from "@/components/site/NavSite";

// Início e Painel da família compartilham a navegação.
// A tela /lumi fica fora deste layout: no tablet ela ocupa a tela inteira.
export default function LayoutSite() {
  return (
    <>
      <NavSite />
      <Outlet />
    </>
  );
}
