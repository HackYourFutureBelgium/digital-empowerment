import { API_URL } from '../constants';

const BASE_URL = `${API_URL}/user`;

const headers = new Headers({
  'Content-Type': 'application/json'
});

export const login = (email, password) => (
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  }).then(response => response.json())
);
