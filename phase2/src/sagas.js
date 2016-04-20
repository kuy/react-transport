import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from './actions';

function fetchUserPresence(email) {
  // NOTE: Fake API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { email, presence: 'active' } });
    }, 750);
  });
}

function* handleRequestUserPresence() {
  while (true) {
    const { payload: { email } } = yield take(actions.REQUEST_FETCH_USER_PRESENCE);
    const { data, error } = yield call(fetchUserPresence, email);
    if (data && !error) {
      yield put(actions.successFetchUserPresence(data));
    } else {
      yield put(actions.failureFetchUserPresence(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUserPresence);
};
