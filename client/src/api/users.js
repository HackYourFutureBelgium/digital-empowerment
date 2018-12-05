import { API_URL, cookies } from '../constants';

const BASE_URL = `${API_URL}/user`;

const headers = new Headers({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${cookies.get('auth')}`
});

export const getUsers = () => fetch(BASE_URL, { headers }).then(response => response.json());

export const login = (email, password) => (
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  }).then(response => response.json())
);
