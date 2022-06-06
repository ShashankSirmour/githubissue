import { all, fork } from 'redux-saga/effects';

import { gameSaga } from './game';

export default function* rootSaga() {
  yield all([gameSaga].map(fork));
}
