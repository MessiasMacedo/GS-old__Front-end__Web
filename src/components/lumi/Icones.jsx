// Ícones em traço grosso (2.5): continuam legíveis para quem enxerga pouco.
const base = {
  width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IconeConversar = () => (
  <svg {...base}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></svg>
);

export const IconeExercicios = () => (
  <svg {...base}>
    <circle cx="12" cy="4.5" r="2" />
    <path d="M5 9l7 1.5L19 9M12 10.5V15M12 15l-3.5 6M12 15l3.5 6" />
  </svg>
);

export const IconeFamilia = () => (
  <svg {...base}>
    <circle cx="8" cy="7" r="2.5" /><circle cx="16.5" cy="8.5" r="2" />
    <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13a4.5 4.5 0 0 1 4.5 4.5V20M13.5 20v-2a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconeMicrofone = () => (
  <svg {...base}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
);

export const IconeCheck = () => (
  <svg {...base}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const IconeX = () => (
  <svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const IconeParar = () => (
  <svg {...base}><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
);
