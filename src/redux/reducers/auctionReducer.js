import { GET_BIDS } from '../actions/types';

const initialState = {
  bidList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BIDS:
      return {
        ...state,
        bidList: action.payload
      };
    default:
      return state;
  }
}
