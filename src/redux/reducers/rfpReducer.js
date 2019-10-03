import { GET_RFP, GET_RFPS } from '../actions/types';

const initialState = {
  rfp: {},
  rfpList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RFP:
      return {
        ...state,
        rfp: action.payload
      };
    case GET_RFPS:
      return {
        ...state,
        rfpList: action.payload
      };
    default:
      return state;
  }
}
