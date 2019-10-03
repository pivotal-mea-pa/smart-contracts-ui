import { GET_TENDER, GET_TENDERS } from '../actions/types';

const initialState = {
  tender: {},
  tenderList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TENDER:
      return {
        ...state,
        tender: action.payload
      };
    case GET_TENDERS:
      return {
        ...state,
        tenderList: action.payload
      };
    default:
      return state;
  }
}
