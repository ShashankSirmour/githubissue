import { all, fork } from 'redux-saga/effects';

import { curriculumSaga } from './curriculum';

export default function* rootSaga() {
  yield all([curriculumSaga].map(fork));
}
