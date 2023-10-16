import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCandidatoRequest, getCandRequest, createVotoRequest, getCandidatoResRequest } from '../api/candidato';

const CandidatosContext = createContext();

export const useCandidatos = () => {
    const context = useContext(CandidatosContext);
    if (!context) {
        throw new Error('useCandidatos must be used within a CandidatosProvider');
    }
    return context;
};

export const CandidatosProvider = ({ children }) => {
    const [candidatos, setCandidatos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCandidato = async (partido) => {
        const res = await getCandidatoRequest(partido)
        return res.data
  
    }

    const getCand = async (id) => {
        const res = await getCandRequest(id)
        return res.data
    }

    const createVoto = async (voto) => {
        const res = await createVotoRequest(voto)
        console.log(res)
    }

    const getCandidatoRes= async() => {
        try {
            const res =await getCandidatoResRequest();
            return res.data

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CandidatosContext.Provider value={{ candidatos, loading, getCandidato, getCand, createVoto, getCandidatoRes }}>
            {children}
        </CandidatosContext.Provider>
    );

   
};