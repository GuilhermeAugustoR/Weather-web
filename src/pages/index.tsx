/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import weatherService from "@/services/weatherService";
import initial from "../../public/initial.jpg";
import clouds from "../../public/clouds.gif";
import rain from "../../public/rain.gif";
import clear from "../../public/sol.gif";

interface IHashMapWeather {
  [key: string]: React.ReactNode;
}

export default function Home() {
  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("");
  const [weather, setWeather] = React.useState<string>("");
  const [hash, setHash] = React.useState<string>("");

  const showToastMessage = () => {
    toast.error("Cidade não encontrada", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const eventButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      getWeather();
    }
  };

  const getWeather = async () => {
    setLoading(true);
    try {
      const result = await weatherService.getWeather({
        location,
      });

      if (result === "city not found") {
        showToastMessage();
        setLoading(false);
        return;
      }

      setData(result);
      setWeather(result.weather[0].main);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  const WeatherHashMap: IHashMapWeather = {
    Initial: (
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${initial.src})` }}
      >
        <div className={styles.search}>
          <input
            className={styles.input}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(e) => eventButton(e)}
            placeholder="Digite a cidade desejada"
            type="text"
          />
          <button onClick={getWeather} disabled={!loading}>
            {loading ? "Carregando..." : "Pesquisar"}
          </button>
        </div>

        <div className={styles.containerClear}>
          <h1>Coloque a cidade que você quer para ver o clima desejado</h1>
        </div>
      </div>
    ),
    Rain: (
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${rain.src})` }}
      >
        <div className={styles.search}>
          <input
            className={styles.input}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(e) => eventButton(e)}
            placeholder="Digite a cidade desejada"
            type="text"
          />
          <button onClick={getWeather} disabled={!loading}>
            {loading ? "Carregando..." : "Pesquisar"}
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.location}>
              <p>{data.name}</p>
            </div>
            <div className={styles.temp}>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className={styles.description}>
              {data.weather ? <p>{weather}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className={styles.bottom}>
              <div className={styles.feels}>
                {data.main ? (
                  <p className={styles.bold}>
                    {data.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Sensação</p>
              </div>
              <div className={styles.humidity}>
                {data.main ? (
                  <p className={styles.bold}>{data.main.humidity}%</p>
                ) : null}
                <p>UMIDADE</p>
              </div>
              <div className={styles.wind}>
                {data.wind ? (
                  <p className={styles.bold}>{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Vento</p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    Clouds: (
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${clouds.src})` }}
      >
        <div className={styles.search}>
          <input
            className={styles.input}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(e) => eventButton(e)}
            placeholder="Digite a cidade desejada"
            type="text"
          />
          <button onClick={getWeather} disabled={!loading}>
            {loading ? "Carregando..." : "Pesquisar"}
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.location}>
              <p>{data.name}</p>
            </div>
            <div className={styles.temp}>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className={styles.description}>
              {data.weather ? <p>{weather}</p> : null}
            </div>
          </div>
          {data.name !== undefined && (
            <div className={styles.bottom}>
              <div className={styles.feels}>
                {data.main ? (
                  <p className={styles.bold}>
                    {data.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Sensação</p>
              </div>
              <div className={styles.humidity}>
                {data.main ? (
                  <p className={styles.bold}>{data.main.humidity}%</p>
                ) : null}
                <p>UMIDADE</p>
              </div>
              <div className={styles.wind}>
                {data.wind ? (
                  <p className={styles.bold}>{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Vento</p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    Clear: (
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${clear.src})` }}
      >
        <div className={styles.search}>
          <input
            className={styles.input}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(e) => eventButton(e)}
            placeholder="Digite a cidade desejada"
            type="text"
          />
          <button onClick={getWeather} disabled={!loading}>
            {loading ? "Carregando..." : "Pesquisar"}
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.location}>
              <p>{data.name}</p>
            </div>
            <div className={styles.temp}>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className={styles.description}>
              {data.weather ? <p>{weather}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className={styles.bottom}>
              <div className={styles.feels}>
                {data.main ? (
                  <p className={styles.bold}>
                    {data.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Sensação</p>
              </div>
              <div className={styles.humidity}>
                {data.main ? (
                  <p className={styles.bold}>{data.main.humidity}%</p>
                ) : null}
                <p>UMIDADE</p>
              </div>
              <div className={styles.wind}>
                {data.wind ? (
                  <p className={styles.bold}>{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Vento</p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  };

  React.useEffect(() => {
    if (!weather) {
      setHash("Initial");
    }
    if (weather === "Rain") {
      setHash("Rain");
    }
    if (weather === "Drizzle") {
      setHash("Rain");
    }
    if (weather === "Clouds") {
      setHash("Clouds");
    }
    if (weather === "Clear") {
      setHash("Clear");
    }
  }, [hash, weather]);

  return (
    <div>
      <Head>
        <title>Weather Web</title>
        <meta name="description" content="Weather Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {WeatherHashMap[hash]}
      <ToastContainer />
    </div>
  );
}
