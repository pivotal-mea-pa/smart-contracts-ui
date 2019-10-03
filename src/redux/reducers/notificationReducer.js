import { GET_NOTIFICATIONS } from '../actions/types';

const initialState = {
  notificationList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notificationList: action.payload
      };
    default:
      return state;
  }
}
