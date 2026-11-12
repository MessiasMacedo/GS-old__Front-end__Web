// Saudação grande e a data por extenso: ajudam a pessoa a se situar no dia.
export default function Saudacao({ saudacao, nome, data }) {
  return (
    <div className="text-center lg:text-left">
      <h1 className="text-4xl font-extrabold leading-tight text-old-azul text-balance sm:text-5xl lg:text-6xl">
        {saudacao}, {nome}
      </h1>
      <p className="mt-2 text-2xl text-old-azul/80">{data}</p>
    </div>
  );
}
