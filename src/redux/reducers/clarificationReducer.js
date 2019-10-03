import { GET_CLARIFICATIONS } from '../actions/types';

const initialState = {
  clarificationList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLARIFICATIONS:
      return {
        ...state,
        clarificationList: action.payload
      };
    default:
      return state;
  }
}
