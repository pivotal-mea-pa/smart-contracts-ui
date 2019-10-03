import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import API from '../../utils/client';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_REGISTRATION_OBJECT,
  CLEAR_REGISTRATION_OBJECT
} from './types';

export const registerUser = user => dispatch => {
  return API.post('/api/users/register', user)
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

export const loginUser = user => dispatch => {
  return API.post('/api/users/login', user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : {}
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const constructRegistration = payload => dispatch => {
  dispatch({
    type: SET_REGISTRATION_OBJECT,
    payload
  });
};

export const clearRegistrationForm = () => dispatch => {
  dispatch({
    type: CLEAR_REGISTRATION_OBJECT
  });
};
