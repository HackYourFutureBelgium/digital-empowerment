export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const STATUSES = {
  INCACTIVE: 0,
  HAS_ERRORED: 1,
  IS_LOADING: 2
};

export const { IS_LOADING, INACTIVE, HAS_ERRORED } = STATUSES;
