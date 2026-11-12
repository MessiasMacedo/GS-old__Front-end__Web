import { BrowserRouter, Routes, Route } from "react-router";
import LayoutSite from "@/layouts/LayoutSite";
import Inicio from "@/pages/Inicio";
import Familia from "@/pages/Familia";
import Lumi from "@/pages/Lumi";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutSite />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/familia" element={<Familia />} />
        </Route>
        <Route path="/lumi" element={<Lumi />} />
      </Routes>
    </BrowserRouter>
  );
}
