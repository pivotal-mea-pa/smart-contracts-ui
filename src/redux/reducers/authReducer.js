import isEmpty from '../../utils/isEmpty';
import {
  SET_CURRENT_USER,
  SET_REGISTRATION_OBJECT,
  CLEAR_REGISTRATION_OBJECT
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  newVendorFields: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_REGISTRATION_OBJECT:
      const { payload } = action;
      return {
        ...state,
        newVendorFields: {
          ...state.newVendorFields,
          payload
        }
      };
    case CLEAR_REGISTRATION_OBJECT:
      return {
        ...state,
        newVendorFields: {}
      };
    default:
      return state;
  }
}
