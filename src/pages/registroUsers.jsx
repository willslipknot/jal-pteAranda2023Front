import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/user.context';
import { useForm } from 'react-hook-form';
import '../assets/css/registroUsers.css';
import { useNavigate } from 'react-router-dom';
import bogota from '../assets/images/logo_alcaldia.png';
import colombia from '../assets/images/Colombia.png';
import { Link } from 'react-router-dom';

function RegistroUsers() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: userErrors} = useUser();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/Votar');

  }, [isAuthenticated, ]);


  const onSubmit = handleSubmit(async (data) => {
    console.log('Datos del formulario:', data);
    await signup(data);
    
    reset();
  });

  return (
    <div className='todo'>
      <br></br>
      <h1 className='nombre1'>Intencion de voto Puente Aranda Bogotá 2023</h1>
      <div className="form-container-Home">
        <div className="encabezado-container">
          <img className='imagen_bogota' src={bogota} alt=" " />
          <img className='imagen_colombia' src={colombia} alt=" " />
        </div>
        <form className="formulario-Home" onSubmit={onSubmit}>
          <div className="form-group-Home">
            <label htmlFor="nombre">Nombres</label>
            <input type="text" {...register('nombre', { required: true })} />
            {errors.nombre && <p className='mensajes'>Nombre es requerido</p>}
          </div>
          <div className="form-group-Home">
            <label htmlFor="correo">Correo</label>
            <input type="text" {...register('correo', { required: true })} />
            {errors.correo && <p className='mensajes'>Correo es requerido</p>}
            <input type='text' value={"Votante"} hidden {...register('tipo', { required: true })} />
          </div>
          <div className="form-group-Home">
            <button type="submit">Votar</button>
            <br></br>
            <br></br>
            <Link to="/Resultados"> <button type="button">Resultados</button> </Link>
            <Link to="/loginAdmin"> <button type="button">Admin</button> </Link>
          </div>
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

export default RegistroUsers;
