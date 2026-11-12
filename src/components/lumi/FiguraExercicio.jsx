// Boneco com os pontos do corpo (como o MediaPipe enxerga) mostrando o movimento.
// movimento: "bracos" anima os braços; "sentar" sobe e desce o corpo; null fica parado.
export default function FiguraExercicio({ movimento = "bracos", className = "" }) {
  const braco = movimento === "bracos" ? "exercicio-braco " : "";
  return (
    <svg viewBox="0 0 200 230" className={className} aria-hidden="true">
      <g className={movimento === "sentar" ? "exercicio-sentar" : undefined}>
        <g stroke="#192b83" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M80 72 L120 72 M86 135 L114 135 M100 72 L100 135" />
          <path d="M86 135 L84 180 L82 222 M114 135 L116 180 L118 222" />
          <g className={`${braco}exercicio-braco-esq`}><path d="M80 72 L76 102 L74 132" /></g>
          <g className={`${braco}exercicio-braco-dir`}><path d="M120 72 L124 102 L126 132" /></g>
        </g>
        <circle cx="100" cy="42" r="16" fill="#192b83" />
        <g fill="#00c4cd" stroke="#192b83" strokeWidth="2">
          {[[80, 72], [120, 72], [86, 135], [114, 135], [84, 180], [116, 180], [82, 222], [118, 222]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />
          ))}
          <g className={`${braco}exercicio-braco-esq`}><circle cx="76" cy="102" r="6" /><circle cx="74" cy="132" r="6" /></g>
          <g className={`${braco}exercicio-braco-dir`}><circle cx="124" cy="102" r="6" /><circle cx="126" cy="132" r="6" /></g>
        </g>
      </g>
    </svg>
  );
}
