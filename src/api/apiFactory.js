export const apiRoot = 'https://api-pokemon-fatec.herokuapp.com';

export const getAuthToken = () => localStorage.getItem('@app-pokedex/authorization-token');

export const setAuthToken = (token) => localStorage.setItem('@app-pokedex/authorization-token', token || '');

export const getDefaultHeaders = async () => ({
  'Content-Type': 'application/json;charset=UTF-8',
  Authorization: `${await localStorage.getItem('@app-pokedex/authorization-token')}`,
});

export const apiFactory = (path, { plaintext, ...settings }) => fetch(`${apiRoot}${path}`, settings)
  .then((resp) => (plaintext ? resp.text() : resp.json()));

export const verificarLogin = async () => {
  const cookie = await getAuthToken();

  if (!cookie) {
    return false;
  }

  return true;
};
