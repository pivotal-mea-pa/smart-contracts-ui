import API from '../../utils/client';
import { GET_NOTIFICATIONS, GET_ERRORS } from './types';

export const getNotifications = () => dispatch => {
  API.get('/api/notifications/')
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: []
      })
    );
};

export const addNotification = notification => dispatch => {
  return API.post('/api/notifications/', notification)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
