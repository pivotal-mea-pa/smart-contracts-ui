import { GET_ERRORS, GET_TENDER, GET_TENDERS } from './types';

import API from '../../utils/client';

export const getTenders = () => dispatch => {
  API.get('/api/tenders')
    .then(res => {
      dispatch({
        type: GET_TENDERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TENDERS,
        payload: []
      });
    });
};

export const getTender = id => dispatch => {
  API.get(`/api/tenders/${id}`)
    .then(res => {
      dispatch({
        type: GET_TENDER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TENDER,
        payload: {}
      });
    });
};

export const addTender = tender => dispatch => {
  return API.post('/api/tenders/', tender)
    .then(res => {
      return res;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateTender = tender => dispatch => {
  return API.post(`/api/tenders/${tender._id}`, tender)
    .then(res => {
      getTenders();
      dispatch({
        type: GET_TENDER,
        payload: res.data
      });
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
