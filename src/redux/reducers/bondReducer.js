import { GET_BONDS } from '../actions/types';

const initialState = {
  bondList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BONDS:
      return {
        ...state,
        bondList: action.payload
      };
    default:
      return state;
  }
}
