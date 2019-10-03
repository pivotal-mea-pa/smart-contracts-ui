import { GET_AWARDS } from '../actions/types';

const initialState = {
  awardList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AWARDS:
      return {
        ...state,
        awardList: action.payload
      };
    default:
      return state;
  }
}
