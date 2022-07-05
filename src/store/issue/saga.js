import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getIssues } from '@services/Issues';
import { INIT_ISSUES_DATA_REQUEST } from '@store/actionTypes';

import {
  setIssuesDataInitiated,
  setIssuesDataSuccess,
  setIssuesDataError,
  setEnd,
} from './actions';

export const getCurrentPage = (state) => state.issue.currentPage;
// worker saga: makes the api call when watcher saga sees the action
function* issuesDataRequestWorker() {
  try {
    yield put(setIssuesDataInitiated());
    const currentPage = yield select(getCurrentPage);
    const response = yield call(getIssues, currentPage + 1);
    // dispatch a success action to the store with logged in response
    const { data } = response;
    if (data?.length > 0 && currentPage < 3)
      yield put(setIssuesDataSuccess({ data, currentPage: currentPage + 1 }));
    else yield put(setEnd());
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(setIssuesDataError(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* authWatcherSaga() {
  yield takeLatest(INIT_ISSUES_DATA_REQUEST, issuesDataRequestWorker);
}
