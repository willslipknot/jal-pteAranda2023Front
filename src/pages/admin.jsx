import React, { useState, useEffect } from 'react';
import { useCandidatos } from '../context/candidatoContext.jsx';
import * as XLSX from 'xlsx';
import '../assets/css/admin.css';
import { useNavigate } from 'react-router-dom';
import bogota from '../assets/images/logo_alcaldia.png';
import colombia from '../assets/images/Colombia.png';
import { useUser } from '../context/user.context.jsx';
import { Link } from 'react-router-dom';


function admin() {
    const { getCandidatoRes } = useCandidatos();
    const [datos, setDatos] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [registrosPartido, setRegistrosPartido] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const sessionTimeout = setTimeout(() => {
            logout();
            navigate('/Resultados');
        }, 10 * 60 * 1000);

        return () => clearTimeout(sessionTimeout);
    }, []);

    const obtenerRegistros = async () => {
        const response = await getCandidatoRes();
        const data = response;

        setTotalRegistros(data.length);

        setDatos(data.map(datos => ({
            Candidato: datos.candidato,
            Comentarios: datos.comentario,
            Estrellas: datos.estrellas,
            Partido: datos.partido,
        })))


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
            Candidato: candidato,
            Votos_Candidato: contador[candidato]
        })));

        setRegistrosPartido(registrosOrdenados1.map(partido => ({
            Partido: partido,
            Votos_Partido: contador1[partido]
        })));
    }

    useEffect(() => {
        obtenerRegistros();
    }, []);

    const descargarResultadosXLS = () => {

        const ws1 = XLSX.utils.json_to_sheet(datos);
        const ws2 = XLSX.utils.json_to_sheet(registros.concat(registrosPartido));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws1, 'Votos');
        XLSX.utils.book_append_sheet(wb, ws2, 'Total de votos');
        XLSX.writeFile(wb, 'resultados.xlsx');

    };

    const descargarResultadosPowerBI = () => {
        const datosPowerBI = {
            table1: datos,
            table2: registros,
            table3: registrosPartido
        };

        const datosPowerBIJSON = JSON.stringify(datosPowerBI);
        const blob = new Blob([datosPowerBIJSON], { type: 'application/json' });
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = 'resultados.pbix';
        a.click();
        URL.revokeObjectURL(blobURL);
    };

    const handleLogout = () => {
        logout();
        navigate('/Resultados');
    };


    return (
        <div className='todo1'>
            <br></br>
            <h1 className='nombre11'>Intencion de voto Puente Aranda Bogotá 2023</h1><br></br>
            <h1 className='nombre22'>Hola administrador, ¿Que desea hacer?</h1>
            <div className="form-container-Home2">
                <div className="encabezado-container1">
                    <img className='imagen_bogota' src={bogota} alt=" " />
                    <img className='imagen_colombia' src={colombia} alt=" " />
                </div>
                <form className="formulario-Home1">
                    <div className="form-group-Home1">
                        <button type="button" onClick={descargarResultadosXLS} >Descargar Resultados XLS</button>
                    </div>
                    <div className="form-group-Home1">
                        <button type="button" onClick={descargarResultadosPowerBI}>Descargar Resultados POWERBI</button>
                    </div>
                    <div className="form-group-Home1">
                        <button type="button" onClick={handleLogout}>Ver Resultados en Vivo</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default admin;
