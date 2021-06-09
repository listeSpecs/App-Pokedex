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

const apiServiceUpload = async (path, settings = {}) => {
  const { headers, body } = settings;
  const options = {
    ...settings,
    headers: {
      ...headers,
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  };
  return apiFactory(path, options);
};

export const upload = async (arquivo) => {
  const data = new FormData();
  data.append('file', arquivo);

  await apiServiceUpload('/upload', {
    method: 'post',
    body: data,
  });
};

export default apiService;
