import apiService, { apiPost, upload } from './apiService';

export const fetchElementos = () => apiService('/elementos');

export const fetchPokemons = () => apiService('/pokemons');

export const postPokemons = async (body) => apiPost('/pokemons', body);

export const postImagem = async (body) => upload('/upload', body);

export const postUsuario = async (body) => apiPost('/usuarios', body);

export const fetchTreinadores = () => apiService('/treinadores');

export const fetchRegioes = () => apiService('/regioes');

export const fetchLogin = (body) => apiPost('/login', body);
