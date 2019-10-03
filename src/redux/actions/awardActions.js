import { GET_ERRORS, GET_AWARDS } from './types';

import API from '../../utils/client';

export const getAwards = () => dispatch => {
  API.get('/api/awards')
    .then(res => {
      dispatch({
        type: GET_AWARDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_AWARDS,
        payload: []
      });
    });
};

export const getAwardsByTender = id => dispatch => {
  API.get(`/api/awards/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_AWARDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_AWARDS,
        payload: []
      });
    });
};

export const getAwardsByVendor = id => dispatch => {
  API.get(`/api/awards/by-vendor/${id}`)
    .then(res => {
      dispatch({
        type: GET_AWARDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_AWARDS,
        payload: []
      });
    });
};

export const addAward = award => dispatch => {
  return API.post('/api/awards/', award)
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

export const updateAward = award => dispatch => {
  return API.post(`/api/awards/${award._id}`, award)
    .then(res =>
      dispatch({
        type: GET_AWARDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : {}
      })
    );
};
