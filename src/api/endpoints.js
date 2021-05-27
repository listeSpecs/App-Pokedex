import apiService, { apiPost } from './apiService';

export const fetchElementos = () => apiService('/elementos');

export const fetchPokemons = () => apiService('/pokemons');

export const fetchTreinadores = () => apiService('/treinadores');

export const postTreinador = async (body) => apiPost('/treinadores', body);
