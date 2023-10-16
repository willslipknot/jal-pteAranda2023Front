import axios from './axios.js';

export const getCandidatoRequest = (partido) => axios.get(`/Candidatos/${partido}`)

export const getCandRequest = (id) => axios.get(`/Candidato/${id}`)

export const createVotoRequest = (voto) => axios.post('/Voto', voto)

export const getCandidatoResRequest = () => axios.get('/Resultados')

