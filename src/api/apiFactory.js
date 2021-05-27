export const apiRoot = 'https://api-pokemon-fatec.herokuapp.com';

export const getDefaultHeaders = async () => ({
  'Content-Type': 'application/json;charset=UTF-8',
});

export const apiFactory = (path, { plaintext, ...settings }) => fetch(`${apiRoot}${path}`, settings)
  .then((resp) => (plaintext ? resp.text() : resp.json()));
