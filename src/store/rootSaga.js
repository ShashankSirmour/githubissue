import { all, fork } from 'redux-saga/effects';

import { issueSaga } from './issue';

export default function* rootSaga() {
  yield all([issueSaga].map(fork));
}
