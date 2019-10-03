import { GET_ERRORS, GET_RFP, GET_RFPS } from './types';

import API from '../../utils/client';

export const getRFPs = () => dispatch => {
  API.get('/api/rfps')
    .then(res => {
      dispatch({
        type: GET_RFPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFPS,
        payload: []
      });
    });
};

export const getRFP = id => dispatch => {
  API.get(`/api/rfps/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFP,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFP,
        payload: {}
      });
    });
};

export const getRFPsByVendor = id => dispatch => {
  API.get(`/api/rfps/by-vendor/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFPS,
        payload: []
      });
    });
};

export const getRFPsByTender = id => dispatch => {
  API.get(`/api/rfps/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFPS,
        payload: []
      });
    });
};

export const addRFP = rfp => dispatch => {
  return API.post('/api/rfps/', rfp)
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

export const updateRFP = rfp => dispatch => {
  return API.post(`/api/rfps/${rfp._id}`, rfp)
    .then(res =>
      dispatch({
        type: GET_RFP,
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
