import { SET_HIGH_SCORE } from '@store/actionTypes';

const initialState = {
  highScore: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HIGH_SCORE:
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
};
