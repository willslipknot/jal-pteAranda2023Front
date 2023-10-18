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
    const [datosUs, setDatosUs] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [registrosPartido, setRegistrosPartido] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const { logout, getUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const sessionTimeout = setTimeout(() => {
            logout();
            navigate('/Resultados');
        }, 10 * 60 * 1000);

        return () => clearTimeout(sessionTimeout);
    }, []);

    const obtenerUsers = async () => {
        const response = await getUser();
        const data = response;

        setDatosUs(data.map(datosUs => ({
            Nombre: datosUs.nombre,
            Correo: datosUs.correo,
            Ip: datosUs.ip,
            Tipo: datosUs.tipo,

        })))


    }

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
        obtenerUsers();
    }, []);

    const descargarResultadosXLS = () => {

        const ws1 = XLSX.utils.json_to_sheet(datos);
        const ws2 = XLSX.utils.json_to_sheet(registros.concat(registrosPartido));
        const ws3 = XLSX.utils.json_to_sheet(datosUs)
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws1, 'Votos');
        XLSX.utils.book_append_sheet(wb, ws2, 'Total de votos');
        XLSX.utils.book_append_sheet(wb, ws3, 'Usuarios');
        XLSX.writeFile(wb, 'resultados.xlsx');

    };

    const descargarResultadosPowerBI = () => {
        try {
            const datosPowerBI = {
                tables: [
                    {
                        name: "Votos",
                        columns: Object.keys(datos[0]),
                        rows: datos.map(dato => Object.values(dato))
                    },
                    {
                        name: "TotalVotos",
                        columns: Object.keys(registros[0]),
                        rows: registros.map(registro => Object.values(registro))
                    },
                    {
                        name: "VotosPorPartido",
                        columns: Object.keys(registrosPartido[0]),
                        rows: registrosPartido.map(registroPartido => Object.values(registroPartido))
                    },
                    {
                        name: "Usuarios",
                        columns: Object.keys(datosUs[0]),
                        rows: datosUs.map(datoUs => Object.values(datoUs))
                    }
                ]
            };
    
            const datosPowerBIJSON = JSON.stringify({ tables: datosPowerBI.tables });
    
            const blob = new Blob([datosPowerBIJSON], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resultados.pbix';
            link.click();
    
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert('Error descargando archivo');
        }
    }
    


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
