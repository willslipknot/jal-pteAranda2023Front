import React, { useEffect, useState } from 'react';
import { useUser } from '../context/user.context';
import { useForm } from 'react-hook-form';
import '../assets/css/registroUsers.css';
import { useNavigate } from 'react-router-dom';
import bogota from '../assets/images/logo_alcaldia.png'
import colombia from '../assets/images/Colombia.png'
import { Link } from 'react-router-dom';

function RegistroUsers() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: userErrors } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/Votar');
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    console.log('Datos del formulario:', data);
    signup(data);
    reset();
  })

  return (
    <div>
      <h1 className='nombre'>Intencion de voto Puente Aranda Bogota 2023</h1>
    <div className="form-container-Home">
      <div className="encabezado-container" >
        <img className='imagen_bogota' src={bogota} alt=" " />
        <img className='imagen_colombia' src={colombia} alt=" " />
      </div>
      <form className="formulario-Home" onSubmit={onSubmit}>

        <div className="form-group-Home">
          <label htmlFor="nombre">Nombres</label>
          <input type="text" {...register('nombre', { required: true })} />
          {
            errors.nombre && (
              <p className='text-red-500'>
                Nombre es requerido
              </p>
            )
          }
        </div>
        <div className="form-group-Home">
          <label htmlFor="correo">Correo</label>
          <input type="text" {...register('correo', { required: true })} />
          {
            errors.correo && (
              <p className='text-red-500'>
                Correo es requerido
              </p>
            )
          }
        </div>
        <div className="form-group-Home">
          <button type="submit">Votar</button>
          <br></br>
          <br></br>
          <Link to="/Resultados"> <button type="button">Resultados</button> </Link>
        </div>
        {
          userErrors.map((error, i) => (
            <div className='bg-red-500 p-0 text-white' key={i}>
              {error}
            </div>
          ))
        }
      </form>
    </div>
    </div>
  );
}

export default RegistroUsers;
