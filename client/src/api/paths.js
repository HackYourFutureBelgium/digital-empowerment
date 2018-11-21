import { API_URL } from './constants';

const headers = new Headers({
  'Content-Type': 'application/json'
});

export const getPaths = () => fetch(`${API_URL}/path`).then(response => response.json());
export const getPath = id => fetch(`${API_URL}/path/${id}`).then(response => response.json());

export const createPath = body => (
  fetch(`${API_URL}/path`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(response => response.json())
);
