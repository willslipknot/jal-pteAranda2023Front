import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/user.context';
import { useForm } from 'react-hook-form';
import '../assets/css/loginAdmin.css';
import { useNavigate } from 'react-router-dom';
import bogota from '../assets/images/logo_alcaldia.png';
import colombia from '../assets/images/Colombia.png';
import { Link } from 'react-router-dom';

function loginAdmin() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { isAuthenticated, signin, users, errors: userErrors } = useUser();
    const navigate = useNavigate();
    const modalRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated && users.tipo) {
            if (users.tipo === 'Admin') {
                navigate('/admin');
            }
        }
    }, [isAuthenticated, users]);


    const { register: loginRegister, handleSubmit: loginSubmit } = useForm();

    const handleLoginSubmit = async (values) => {
        try {
            await signin(values);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className='todo'>
            <br></br>
            <h1 className='nombre1'>Intencion de voto Puente Aranda Bogotá 2023</h1><br></br>
            <h1 className='nombre2'>Inicio Sesión Administrador</h1>
            <div className="form-container-Home1">
                <div className="encabezado-container">
                    <img className='imagen_bogota' src={bogota} alt=" " />
                    <img className='imagen_colombia' src={colombia} alt=" " />
                </div>
                <form className="formulario-Home" onSubmit={loginSubmit(handleLoginSubmit)}>
                    <div className="form-group-Home">
                        <label htmlFor="correoLogin" >Correo:</label>
                        <input type="email" {...loginRegister('email', { required: true })} />
                        {errors.email && <p className='mensajes'>Correo es requerido</p>}
                    </div>
                    <div className="form-group-Home">
                        <label htmlFor="contraseña" >Contraseña:</label>
                        <input type="password" {...loginRegister('contraseña', { required: true })} />
                        {errors.contraseña && <p className='mensajes'>Contraseña es requerida</p>}
                    </div>
                    <div className='bots'>
                        <button type="submit" >Entrar</button>
                        <Link to="/"> <button type="button">Volver</button> </Link>
                    </div>
                    <br></br>
                    {userErrors.map((error, i) => (
                        <div className='mensajes' key={i}>
                            {error}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default loginAdmin;
