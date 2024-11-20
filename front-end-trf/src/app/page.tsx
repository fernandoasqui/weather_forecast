'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import { ForecastData } from '../types/ForecastData';

export default function Home() {
  const [city, setCity] = useState('');
  const [dateSelected, setDateSelected] = useState('');
  const [forecastData, setForecastData] = useState<ForecastData>();
  const [forecastDataFull, setForecastDataFull] = useState<ForecastData>();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    requestDatabase();
    requestDataFull();
  }, []);

  async function requestDatabase() {
    try {
      const response = await fetch(
        `http://localhost:3002/api/prevfromdate/${dateSelected}`
      );
      const data = await response.json();
      setForecastData(data[0]);
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }

  async function requestDataFull() {
    try {
      const response = await fetch(`http://localhost:3002/api/datafull`);
      const data = await response.json();
      setForecastDataFull(data);
      console.log(data);
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }

  async function postLatitude() {
    try {
      let dataLatitude = {
        latitude: lat,
        longitude: long,
      };
      const response = await fetch(`http://localhost:3002/api/latitude`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLatitude),
      });
      const data = await response.json();
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }

  async function postCity() {
    try {
      let cityName = {
        city: city,
      };
      const response = await fetch(`http://localhost:3002/api/city`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityName),
      });
      const data = await response.json();
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      if (lat || long != '') {
        await postLatitude();
      }

      if (city != '') {
        await postCity();
      }

      await sleep(2000);

      await requestDatabase();
      await requestDataFull();
    } catch (error) {
      console.error('Erro durante a execução:', error);
    }
  };

  return (
    <div className="m-auto mt-3 container">
      <div className=" flex flex-col justify-center">
        <h1 className="text-center text-2xl font-bold">Previsão do Tempo</h1>

        <div className="flex flex-col my-3">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="border border-black rounded-md mb-2 pl-2"
          />

          <p className="text-center mb-2 text-gray-400">ou</p>

          <input
            type="text"
            placeholder="Latitude"
            onChange={(e) => {
              setLat(e.target.value);
            }}
            className="border border-black rounded-md mb-2 pl-2"
          />
          <input
            type="text"
            placeholder="Longitude"
            onChange={(e) => {
              setLong(e.target.value);
            }}
            className="border border-black rounded-md mb-2 pl-2"
          />

          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={dateSelected}
            onChange={(e) => {
              setDateSelected(e.target.value);
            }}
            className="border border-black rounded-md pl-2 text-gray-400"
          />
        </div>

        <button
          className="bg-sky-500 p-1 rounded-md font-bold mb-2 "
          onClick={handleSubmit}
        >
          Buscar
        </button>

        {forecastData && forecastData.date_prev ? (
          <ul>
            <li>Data: {forecastData.date_prev}</li>
            <li>Temperatura Maxima: {forecastData.temp_max}°C</li>
            <li>Temperatura Miníma: {forecastData.temp_min}°C</li>
            <li>Condição Climática: {forecastData.climatic_condition} %</li>
            <li>Velocidade do Vento: {forecastData.wind_speed}m/s</li>
            <li>Direção do Vento: {forecastData.wind_direction}°</li>
            <li>
              Probabilidade de Pricipitação:{' '}
              {forecastData.precipitation_probability}%
            </li>
          </ul>
        ) : (
          <p>A data para consulta é de até 7 dias a partir da data atual.</p>
        )}
      </div>
      <div>
        {Array.isArray(forecastDataFull) && forecastDataFull.length > 0 ? (
          <div>
            <h2 className="text-center text-2xl font-bold my-3">
              Acompanhamento Semanal
            </h2>

            <table className="w-full text-sm text-left rtl:text-right text-black">
              <thead className="bg-gray-100 rounded-md">
                <tr>
                  <th className="p-4">Data</th>
                  <th className="p-4">Temperatura Máxima</th>
                  <th className="p-4">Temperatura Mínima</th>
                  <th className="p-4">Condição Climática %</th>
                  <th className="p-4">Velocidade do Vento</th>
                  <th className="p-4">Direção do Vento</th>
                  <th className="p-4">Probabilidade de Precipitação</th>
                </tr>
              </thead>
              <tbody>
                {forecastDataFull.map((day: any, index: number) => (
                  <tr
                    key={day.id || index}
                    className="even:bg-gray-100 rounded-md"
                  >
                    <td className="text-center p-1">{day.date_prev}</td>
                    <td className="text-center p-1 ">{day.temp_max}°C</td>
                    <td className="text-center p-1">{day.temp_min}°C</td>
                    <td className="text-center p-1">
                      {day.climatic_condition}%
                    </td>
                    <td className="text-center p-1">{day.wind_speed} m/s</td>
                    <td className="text-center p-1">{day.wind_direction}°</td>
                    <td className="text-center p-1">
                      {day.precipitation_probability}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {forecastDataFull
              ? 'Nenhum dado disponível.'
              : 'Aguardando busca de dados.'}
          </div>
        )}
      </div>
    </div>
  );
}
