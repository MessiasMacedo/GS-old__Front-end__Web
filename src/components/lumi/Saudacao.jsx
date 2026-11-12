export default function Saudacao({ saudacao, nome, data }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-old-azul text-balance">
        {saudacao}, {nome}
      </h1>
      <p className="mt-1 text-xl text-old-azul/80">{data}</p>
    </div>
  );
}
