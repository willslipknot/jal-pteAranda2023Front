import React, { useState, useEffect } from 'react';
import { useCandidatos } from '../context/candidatoContext.jsx';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/css/Resultados.css';
import { Link } from 'react-router-dom';

function Resultados() {
  const { getCandidatoRes } = useCandidatos();
  const [registros, setRegistros] = useState([]);
  const [registrosPartido, setRegistrosPartido] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const response = await getCandidatoRes();
        const data = response;
        console.log(data);
        setTotalRegistros(data.length);

        const contador = {};
        data.forEach(registro => {
          const candidato = registro.candidato;
          contador[candidato] = (contador[candidato] || 0) + 1;
        });

        const contador1 = {};
        data.forEach(registro1 => {
          const partido = registro1.partido;
          contador1[partido] = (contador1[partido] || 0) + 1;
        });


        const registrosOrdenados = Object.keys(contador).sort((a, b) => contador[b] - contador[a]);
        const registrosOrdenados1 = Object.keys(contador1).sort((a, b) => contador1[b] - contador1[a]);

        setRegistros(registrosOrdenados.map(candidato => ({
          candidato: candidato,
          repeticiones: contador[candidato]
        })));

        setRegistrosPartido(registrosOrdenados1.map(partido => ({
          partido: partido,
          repeticiones: contador1[partido]
        })));

      } catch (error) {
        console.error('Error al obtener registros:', error);
      }
    };

    obtenerRegistros();
  }, []);

  const dataForChart = {
    labels: registrosPartido.map(registro => registro.partido),
    datasets: [{
      data: registrosPartido.map(registro => ((registro.repeticiones / totalRegistros) * 100)),
      backgroundColor: [
        'green',
        'blue',
        'yellow',
        'red',
        'pink',
        'orange',
        'purple',
        'Salmon',
        'gray',

      ],
    }],
  };

  const colores = [
    'green',
    'blue',
    'yellow',
    'red',
    'pink',
    'orange',
    'purple',
    'salmon',
    'gray',

  ];


  function generarPaletaDeColores(registros) {
    const paleta = [];
    for (let i = 0; i < registros.length; i++) {

      paleta.push(colores[i % colores.length]);
    }
    return paleta;
  }

  const dataForChart1 = {
    datasets: [{
      data: registros.map(registro => ((registro.repeticiones / totalRegistros) * 100)),
      backgroundColor: generarPaletaDeColores(registros),
    }],
    labels: registros.map(registro => registro.candidato),
  };

  return (
    <div>
      <div className='titulosT'>
        <h1 className='titulo'>Resultados JAL Puente Aranda</h1>
        <h2 className='titulo2'>Total de Votos: {totalRegistros}</h2>
        <Link to="/"> <button type="button" className='boton'>Votar</button> </Link>
      </div>
      <div className="resultados-container">
        <div className="tabla-container">
          <h2 className='titulos2'>Resultados - Candidatos</h2>
          <table className="tabla">
            <thead>
              <tr>
                <td className="encabezado-amarillo">Candidato</td>
                <td className="encabezado-rojo">Votos</td>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index}>
                  <td>{registro.candidato}</td>
                  <td>{registro.repeticiones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grafico-container">
          <h2 className='titulos3'>Resultados - Candidato (%)</h2>
          <Doughnut data={dataForChart1} />
        </div>

        <div className="tabla-container">
          <h2 className='titulos2'>Resultados - Partidos</h2>
          <table className="tabla">
            <thead>
              <tr>
                <td className="encabezado-amarillo">Partido</td>
                <td className="encabezado-rojo">Votos Acumulados</td>
              </tr>
            </thead>
            <tbody>
              {registrosPartido.map((registro1, index) => (
                <tr key={index}>
                  <td>{registro1.partido}</td>
                  <td>{registro1.repeticiones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grafico-container">
          <h2 className='titulos3'>Resultados - Partidos (%)</h2>
          <Doughnut data={dataForChart} />
        </div>
      </div>
    </div>
  );
}


export default Resultados;
