import { GET_ERRORS, GET_CLARIFICATIONS } from './types';

import API from '../../utils/client';

export const getClarifications = () => dispatch => {
  API.get('/api/clarifications')
    .then(res => {
      dispatch({
        type: GET_CLARIFICATIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLARIFICATIONS,
        payload: []
      });
    });
};

export const getClarificationsByTender = id => dispatch => {
  API.get(`/api/clarifications/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_CLARIFICATIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLARIFICATIONS,
        payload: []
      });
    });
};

export const addClarification = clarification => dispatch => {
  return API.post('/api/clarifications/', clarification)
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

export const updateClarification = clarification => dispatch => {
  return API.post(`/api/clarifications/${clarification._id}`, clarification)
    .then(res =>
      dispatch({
        type: GET_CLARIFICATIONS,
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
