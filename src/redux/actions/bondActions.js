import { GET_ERRORS, GET_BONDS } from './types';

import API from '../../utils/client';

export const getBonds = () => dispatch => {
  API.get('/api/bonds')
    .then(res => {
      dispatch({
        type: GET_BONDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BONDS,
        payload: []
      });
    });
};

export const getBondsByTender = id => dispatch => {
  API.get(`/api/bonds/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_BONDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BONDS,
        payload: []
      });
    });
};

export const getBondsByVendor = id => dispatch => {
  API.get(`/api/bonds/by-vendor/${id}`)
    .then(res => {
      dispatch({
        type: GET_BONDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BONDS,
        payload: []
      });
    });
};

export const addBond = bond => dispatch => {
  return API.post('/api/bonds/', bond)
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateBond = bond => dispatch => {
  return API.post(`/api/bonds/${bond._id}`, bond)
    .then(res =>
      dispatch({
        type: GET_BONDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
