import { SET_HIGH_SCORE } from '@store/actionTypes';

export const setHighScore = (data) => ({
  type: SET_HIGH_SCORE,
  payload: data,
});
