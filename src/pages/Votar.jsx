import React, { useState, useEffect } from 'react';
import { useCandidatos } from '../context/candidatoContext.jsx';
import '../assets/css/Votar.css';
import image1 from '../assets/images/tarjeton.jpg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/user.context.jsx';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


function Votar() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [partido, setPartido] = useState('');
    const [candidatoSel, setCandidatoSel] = useState('');
    const [candidato, setCandidato] = useState(null);
    const { getCandidato, getCand, createVoto } = useCandidatos();
    const { logout, updateUser } = useUser();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [showPage, setShowPage] = useState(true);
    const [countdown, setCountdown] = useState('');
    const [rating, setRating] = useState(0);
    const [candidatoInfo, setCandidatoInfo] = useState({ nombre: '', partido: '', posicion: '' });
    const navigate = useNavigate();
    const targetDate = new Date('2023-10-25T23:59:59').getTime();

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            if (now > targetDate) {
                setShowPage(false);
            } else {
                const distance = targetDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setCountdown(`${days}D ${hours}H ${minutes}M ${seconds}S`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!showPage) {
        return navigate('/Home')
    }

    const partidos = [
        { label: 'Alianza Verde', value: 'Alianza Verde' },
        { label: 'Centro Democratico', value: 'Centro Democratico' },
        { label: 'Liberal Colombiano', value: 'Liberal Colombiano' },
        { label: 'Cambio Radical - Mira', value: 'Cambio Radical - Mira' },
        { label: 'Bogotá Más Fuerte', value: 'Bogotá Más Fuerte' },
        { label: 'Dignidad & Compromiso', value: 'Dignidad & Compromiso' },
        { label: 'Nuevo Liberalismo', value: 'Nuevo Liberalismo' },
        { label: 'Pacto Historico', value: 'Pacto Historico' },
        { label: 'Conservador - Colombia Justa Libres', value: 'Conservador - Colombia Justa Libres' },
        { label: 'Voto en Blanco', value: 'Voto en Blanco' }
    ];


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenModal1 = () => {
        setModalOpen1(true);
    };

    const handleCloseModal1 = () => {
        setModalOpen1(false);
    };

    const Mvotar = () => {
        setModalOpen(false);
        setModalOpen1(true)
    };
    const handlePartidoChange = async (e) => {
        const selectedPartido = e.target.value;
        setPartido(selectedPartido);
        setCandidato(null);

        if (selectedPartido) {
            try {
                const candidatosData = await getCandidato(selectedPartido);
                const formattedCandidatos = candidatosData.map((candidatoData) => ({
                    label: candidatoData.candidato,
                    value: candidatoData.id,
                }));
                setCandidato(formattedCandidatos);
            } catch (error) {
                console.error('Error al obtener candidatos:', error);
            }
        }
    };

    const handleCandidatoChange = (e) => {
        setCandidatoSel(e.target.value);
        console.log(e.target.value);
    };

    const handlePartidoChange1 = async (e) => {
        const selectedPartido = e.target.value;
        setPartido(selectedPartido);
        setCandidato(null);

        if (selectedPartido) {
            try {
                const candidatosData = await getCandidato(selectedPartido);
                const formattedCandidatos = candidatosData.map((candidatoData) => ({
                    label: candidatoData.candidato,
                    value: candidatoData.id,
                }));
                setCandidato(formattedCandidatos);
            } catch (error) {
                console.error('Error al obtener candidatos:', error);
            }
        }
    };

    const handleCandidatoChange1 = (e) => {
        const selectedCandidato = e.target.value;
        setCandidatoSel(selectedCandidato);

        const selectedCandidatoObj = candidato.find(candidatoItem => candidatoItem.value === selectedCandidato);


        if (selectedCandidatoObj) {
            setValue("candidato", selectedCandidatoObj.label);
            setValue("id_candidato", selectedCandidatoObj.value);
        } else {
            setValue("candidato", "");
            setValue("id_candidato", "");
        }
    };


    const handleFiltrarClick = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    const handleVotarClick = async () => {
        setModalOpen1(true);
    };

    const handleBuscarClick = async () => {
        if (candidatoSel !== '') {
            const cand = await getCand(candidatoSel);
            if (cand) {
                setCandidatoInfo({ nombre: cand.candidato, partido: cand.partido, posicion: cand.posicion });
                setModalOpen(true);
            }
        }
    };

    const token = Cookies.get('token');
    console.log(token)
    const decodedToken = jwtDecode(token); 
    const userId = decodedToken.id;

    const handleStarClick = (value) => {
        setRating(value);
        setValue("estrellas", value);
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log("Datos del formulario:", data);
        updateUser(userId, data.candidato)
        createVoto(data);
        navigate('/Resultados');
        setModalOpen1(false);
        logout();

    });
    



    return (
        <div className='contenedor-centrado'>
            <h1 className='nombre'>Intencion de voto JAL Puente Aranda Bogota 2023</h1><br></br><br></br><br></br>
            <h1 className='reloj'>Cuenta regresiva: {countdown}</h1><br></br>
            <div className='botones'>
                <button className="btn-votar" onClick={handleVotarClick}>Votar</button>
                {modalOpen1 && (
                    <div className="modal-votar" onClick={handleCloseModal1}>
                        <div className="actividad-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit} className='votar'>
                                <div>
                                    <label className='titulos'>Partido</label>
                                    <select {...register("partido", { required: true })} className="dropdown-partido-votar" onChange={handlePartidoChange1} value={partido}>
                                        <option value="">Seleccione un partido</option>
                                        {partidos.map((partido, i) => (
                                            <option key={partido.label} value={partido.value}>
                                                {partido.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='titulos'>Candidato</label>
                                    <select className="dropdown-candidato-votar" onChange={handleCandidatoChange1} value={candidato ? candidato.value : ''}>
                                        <option value="">Seleccione un candidato</option>
                                        {candidato && candidato.map((candidatoItem, index) => (
                                            <option key={candidatoItem.value} value={candidatoItem.value}>
                                                {candidatoItem.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input type='text' value={candidato ? candidato.label : ''} hidden {...register("candidato", { required: true })}></input>
                                <input type='text' value={candidato ? candidato.value : ''} hidden {...register("id_candidato", { required: true })}></input>
                                <input type='text' value={"1"} hidden {...register("voto", { required: true })}></input>
                                <div className="form-group-votar">
                                    <label htmlFor="comentario" className='titulos'>Comentario sobre el candidato</label>
                                    <textarea className="area" rows="3" {...register("comentario", { required: true })} ></textarea>
                                </div>

                                <div className="estrellas">
                                    <label htmlFor="puntuacion" className='titulos'>Puntuacion</label>
                                    <p className="clasificacion">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <input
                                                    type="radio"
                                                    id={`radio${value}`}
                                                    className="estrella"
                                                    name="rating"
                                                    value={value}
                                                    onClick={() => handleStarClick(value)}
                                                />
                                                <label htmlFor={`radio${value}`}>★</label>
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>


                                <div className="form-group-votar">
                                    <button className='button-v' type='submit'>Votar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}
                <button className="btn-filtrar" onClick={handleFiltrarClick}>Filtrar</button>
                {mostrarFormulario && (

                    <div className="form-container-buscar">
                        <div>
                            <select className="dropdown-partido" onChange={handlePartidoChange} value={partido}>
                                <option value="">Seleccione un partido</option>
                                {partidos.map((partido, i) => (
                                    <option key={partido.label} value={partido.value}>
                                        {partido.label}
                                    </option>
                                ))}
                            </select>
                        </div><br></br><br></br><br></br><br></br><br></br>
                        {partido && (
                            <div>
                                <select className="dropdown-candidato" onChange={handleCandidatoChange} value={candidato ? candidato.value : ''}>
                                    <option value="">Seleccione un candidato</option>
                                    {candidato && candidato.map((candidatoItem, index) => (
                                        <option key={candidatoItem.value} value={candidatoItem.value}>
                                            {candidatoItem.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <br></br>&nbsp;
                        <button className="btn-buscar" type="button" onClick={handleBuscarClick}>Buscar</button>
                    </div>
                )}
                {modalOpen && (
                    <div className="modal-buscar" onClick={handleCloseModal}>
                        <div className="actividad-form" onClick={(e) => e.stopPropagation()}>
                            <div className='actividad'>
                                <div className="form-group">
                                    <label htmlFor="nombre" className='titulos'>Nombre</label>
                                    <input type="text" className='formulario' value={candidatoInfo.nombre} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partido" className='titulos'>Partido</label>
                                    <input type="text" className='formulario' value={candidatoInfo.partido} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="posicion" className='titulos'>Posicion</label>
                                    <input type="text" className='formulario' value={candidatoInfo.posicion} readOnly />
                                </div>
                                <div className="form-group">
                                    <button type="button" onClick={Mvotar}>Votar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='contenedor-imagen-votar'>
                <img className='imagen_p1' src={image1} alt=" " />
            </div>
        </div>
    );
}

export default Votar;
