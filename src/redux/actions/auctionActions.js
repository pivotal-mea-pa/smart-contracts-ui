import { GET_ERRORS, GET_BIDS } from './types';

import API from '../../utils/client';

export const getBids = () => dispatch => {
  API.get('/api/bids')
    .then(res => {
      dispatch({
        type: GET_BIDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BIDS,
        payload: []
      });
    });
};

export const getBidsByTender = id => dispatch => {
  API.get(`/api/bids/by-tender/${id}`)
    .then(res => {
      dispatch({
        type: GET_BIDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BIDS,
        payload: []
      });
    });
};

export const getBidsByVendor = id => dispatch => {
  API.get(`/api/bids/by-vendor/${id}`)
    .then(res => {
      dispatch({
        type: GET_BIDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BIDS,
        payload: []
      });
    });
};

export const addBid = bid => dispatch => {
  return API.post('/api/bids/', bid)
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

export const updateBid = bid => dispatch => {
  return API.post(`/api/bids/${bid._id}`, bid)
    .then(res =>
      dispatch({
        type: GET_BIDS,
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
