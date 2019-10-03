import { GET_RFT, GET_RFTS } from '../actions/types';

const initialState = {
  rft: {},
  rftList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RFT:
      return {
        ...state,
        rft: action.payload
      };
    case GET_RFTS:
      return {
        ...state,
        rftList: action.payload
      };
    default:
      return state;
  }
}
