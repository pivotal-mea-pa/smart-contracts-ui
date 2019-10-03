import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from './types';

import API from '../../utils/client';

//get current profile

export const getCurrentProfile = () => dispatch => {
  return API.get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfiles = () => dispatch => {
  return API.get('/api/profiles/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: []
      })
    );
};

export const getProfileById = id => dispatch => {
  return API.get(`/api/profiles/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//create profile

export const createProfile = profile => dispatch => {
  API.post('/api/profiles', profile)
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

//loader
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
