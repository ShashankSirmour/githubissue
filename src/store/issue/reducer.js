/* eslint-disable no-case-declarations */
import {
  SET_ISSUES_DATA_INITIATED,
  SET_ISSUES_DATA_ERROR,
  SET_ISSUES_DATA_SUCCESS,
} from '@store/actionTypes';

const initialState = {
  loading: false,
  currentPage: 0,
  data: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ISSUES_DATA_INITIATED:
      return { ...state, loading: true };
    case SET_ISSUES_DATA_SUCCESS:
      return {
        data: [...state.data, ...action.payload.data],
        currentPage: action.payload.currentPage,
        loading: false,
      };
    case SET_ISSUES_DATA_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
