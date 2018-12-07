import { API_URL, cookies } from '../constants';

const BASE_URL = `${API_URL}/user`;

const getHeaders = () => new Headers({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${cookies.get('auth')}`
});

export const getUsers = () => fetch(BASE_URL, { headers: getHeaders() })
  .then(response => response.json());

export const login = (email, password) => (
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  }).then(response => response.json())
);

export const requestPasswordReset = email => (
  fetch(`${BASE_URL}/password`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ email })
  })
);

export const confirmPasswordReset = (token, password) => (
  fetch(`${BASE_URL}/password`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ token, password })
  })
);

export const createUser = body => (
  fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }).then(response => response.json())
);

export const updateUser = (id, user) => (
  fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(user)
  }).then(response => response.json())
);

export const deleteUser = id => fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers: getHeaders() });
