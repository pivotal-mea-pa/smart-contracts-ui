import API from '../../utils/client';
import { GET_ERRORS } from './types';

export const uploadFiles = formData => dispatch => {
  return API.post('api/file-upload', formData)
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response ? err.response : {} })
    );
};
