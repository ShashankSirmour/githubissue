import {
  INIT_ISSUES_DATA_REQUEST,
  SET_ISSUES_DATA_ERROR,
  SET_ISSUES_DATA_SUCCESS,
  SET_ISSUES_DATA_INITIATED,
} from '../actionTypes';

export const initIssuesDataRequest = () => ({
  type: INIT_ISSUES_DATA_REQUEST,
});

export const setIssuesDataInitiated = () => ({
  type: SET_ISSUES_DATA_INITIATED,
});

export const setIssuesDataSuccess = (user) => ({
  type: SET_ISSUES_DATA_SUCCESS,
  payload: user,
});

export const setIssuesDataError = (error) => ({
  type: SET_ISSUES_DATA_ERROR,
  payload: error,
});
