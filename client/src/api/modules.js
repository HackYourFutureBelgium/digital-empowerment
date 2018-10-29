const API_URL = 'http://localhost:4000'

export const getModules = () => {
  return fetch(`${API_URL}/module`).then(response => response.json());
};
