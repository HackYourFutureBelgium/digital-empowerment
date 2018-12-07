import Cookies from 'universal-cookie';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const STATUSES = {
  INACTIVE: 0,
  HAS_ERRORED: 1,
  IS_LOADING: 2
};

export const { IS_LOADING, INACTIVE, HAS_ERRORED } = STATUSES;

export const CONTENT_TYPES = {
  EXPLANATION: 'explanation',
  EXERCISE: 'exercise',
  EVALUATION: 'evaluation'
};

export const cookies = new Cookies();

export const checkJWTExpiry = (jwt) => {
  const currentTime = Date.now().valueOf() / 1000;
  try {
    const decoded = JSON.parse(atob(jwt.split('.')[1]));
    if (decoded.exp < currentTime) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};
