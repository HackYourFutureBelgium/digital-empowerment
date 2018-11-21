import { API_URL } from './constants';

const BASE_URL = `${API_URL}/module`;
const headers = new Headers({
  'Content-Type': 'application/json'
});

export const getModules = () => fetch(BASE_URL).then(response => response.json());

export const createModule = body => (
  fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(response => response.json())
);

export const updateModule = (id, module) => (
  fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(module)
  }).then(response => response.json())
);

export const deleteModule = id => fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers });
