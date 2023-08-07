import Formulario from "./Formulario";

const Criptomonedas = () => {
  return (
    <>
      <div className="container flex justify-center w-full h-screen md:w-3/4 md:m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <img src="/img/cryptomonedas.png" alt="" />
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
