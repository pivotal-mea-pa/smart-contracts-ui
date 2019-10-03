import { GET_ERRORS, GET_RFT, GET_RFTS } from './types';

import API from '../../utils/client';

export const getRFTs = () => dispatch => {
  API.get('/api/rfts')
    .then(res => {
      dispatch({
        type: GET_RFTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFTS,
        payload: []
      });
    });
};

export const getRFT = id => dispatch => {
  API.get(`/api/rfts/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFT,
        payload: {}
      });
    });
};

export const addRFT = rft => dispatch => {
  return API.post('/api/rfts/', rft)
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

export const updateRFT = rft => dispatch => {
  return API.post(`/api/rfts/${rft._id}`, rft)
    .then(res => {
      dispatch({
        type: GET_RFT,
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

export const getRFTsByVendor = id => dispatch => {
  API.get(`/api/rfts/by-vendor/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFTS,
        payload: []
      });
    });
};

export const getRFTsByTender = id => dispatch => {
  API.get(`/api/rfts/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_RFTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RFTS,
        payload: []
      });
    });
};
