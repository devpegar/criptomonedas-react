import Formulario from "./Formulario";

const Criptomonedas = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen p-10 md:p-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <img
              src="/img/cryptomonedas.png"
              alt="Criptomonedas"
              className="w-full md:w-3/4"
            />
          </div>
          <div>
            <Formulario />
          </div>
        </div>
      </div>
    </>
  );
};

export default Criptomonedas;
