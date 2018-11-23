import { API_URL } from './constants';

const BASE_URL = `${API_URL}/path`;

const headers = new Headers({
  'Content-Type': 'application/json'
});

export const getPaths = () => fetch(BASE_URL).then(response => response.json());
export const getPath = id => fetch(`${BASE_URL}/${id}`).then(response => response.json());

export const createPath = body => (
  fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(response => response.json())
);

export const deletePath = id => fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers });
