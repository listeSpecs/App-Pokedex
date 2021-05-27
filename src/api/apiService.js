import { apiFactory, getDefaultHeaders } from './apiFactory';

const apiService = async (path, settings = {}) => {
  const { headers, body } = settings;
  const defaultHeaders = await getDefaultHeaders();
  const options = {
    ...settings,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  };
  return apiFactory(path, options);
};

export const apiPost = (path, body) => apiService(path, {
  method: 'post',
  body,
});

export default apiService;
