import { API_URL, cookies } from '../constants';

const BASE_URL = `${API_URL}/path`;

const getHeaders = () => new Headers({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${cookies.get('auth')}`
});

export const getPaths = () => fetch(BASE_URL).then(response => response.json());
export const getPath = id => fetch(`${BASE_URL}/${id}`).then(response => response.json());

export const createPath = body => (
  fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }).then(response => response.json())
);

export const updatePath = (id, path) => (
  fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(path)
  }).then(response => response.json())
);

export const deletePath = id => fetch(`${BASE_URL}/${id}`, { method: 'DELETE', getHeaders });
