import { useState, useEffect } from "react";
import { getApiResponse } from "../services/getApiResponse";
import Spinner from "./Spinner";

const Form = () => {
  const [resultado, setResultado] = useState([]);
  const [busqueda, SetBusqueda] = useState({
    moneda: "",
    cripto: "",
  });
  const [display, setDisplay] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const optionsRequest = {};

  const currency = [
    {
      name: "ARS",
      value: "Peso Argentino",
      simbol: "$",
    },
    {
      name: "USD",
      value: "Dolar Estadounidense",
      simbol: "U$D",
    },
    {
      name: "EUR",
      value: "Euros",
      simbol: "€",
    },
    {
      name: "GBP",
      value: "Libra Esterlina",
      simbol: "£",
    },
    {
      name: "CNY",
      value: "Yuans",
      simbol: "¥",
    },
    {
      name: "JPY",
      value: "Yen Japones",
      simbol: "¥",
    },
  ];

  useEffect(() => {
    optionsRequest.method = "GET";
    optionsRequest.url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    (async () => {
      const data = await getApiResponse(optionsRequest);
      setResultado(data.Data);
    })();
  });

  const handleChange = (e) => {
    e.preventDefault();
    setShow(false);
    setLoading(true);
    const { id, value } = e.target;
    if (id === "moneda") {
      SetBusqueda({ ...busqueda, moneda: value });
    } else {
      SetBusqueda({ ...busqueda, cripto: value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { moneda, cripto } = busqueda;

    if (moneda === "" || cripto === "") {
      alert("Ambos campos son obligatorios");
      return;
    }

    const getApiResult = async () => {
      optionsRequest.method = "GET";
      optionsRequest.url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const data = await getApiResponse(optionsRequest);
      const { DISPLAY } = data;
      setDisplay(DISPLAY[cripto][moneda]);
    };
    getApiResult();

    setShow(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const { PRICE, HIGHDAY, LOWDAY } = display;
  return (
    <>
      <form className="flex flex-col gap-2 text-blanco">
        <label htmlFor="moneda">Moneda</label>
        <select
          name="moneda"
          id="moneda"
          onChange={handleChange}
          className="p-2 text-negro"
        >
          <option value="" disabled selected>
            Elige tu moneda
          </option>
          {currency.map((curr, index) => {
            const { name, value } = curr;
            return (
              <option key={index} value={name}>
                {value}
              </option>
            );
          })}
        </select>
        <label htmlFor="cripto">Criptomoneda</label>
        <select
          name="cripto"
          id="cripto"
          onChange={handleChange}
          className="p-2 text-negro"
        >
          <option value="" disabled selected>
            Selecciona tu criptomoneda
          </option>
          {resultado.map((c, index) => {
            const { Name, FullName } = c.CoinInfo;
            return (
              <option key={index} value={Name}>
                {FullName}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          value="Cotizar"
          onClick={submitForm}
          className="transition ease-in-out delay-150 bg-boton text-blanco text-3xl cursor-pointer p-3 my-3 rounded-xl hover:bg-hover duration-300"
        />
      </form>
      <div className="mt-3 text-blanco">
        {show ? (
          <div>
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-2">
                <p className="text-xl">El precio actual es :{PRICE}</p>
                <p className="text-sm">El precio más alto del día :{HIGHDAY}</p>
                <p className="text-sm">El precio más bajo del día :{LOWDAY}</p>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Form;
